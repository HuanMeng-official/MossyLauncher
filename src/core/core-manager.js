import { spawn, spawnSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { EventEmitter } from 'node:events';
import { createWriteStream, promises as fs } from 'node:fs';
import path from 'node:path';
import { createInterface } from 'node:readline';
import { Readable, Transform } from 'node:stream';
import { pipeline } from 'node:stream/promises';

const RELEASE_API = 'https://api.github.com/repos/HuanMeng-official/LauncherCore/releases/latest';
const READY_TIMEOUT_MS = 30_000;
const USER_AGENT = 'MossyLauncher/1.0 (+https://github.com/HuanMeng-official/LauncherCore)';

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function isFile(file) {
  try {
    return (await fs.stat(file)).isFile();
  } catch {
    return false;
  }
}

function binaryName() {
  return process.platform === 'win32' ? 'mclc.exe' : 'mclc';
}

function pickAsset(assets) {
  const usable = (assets || []).filter((asset) => asset && asset.name && asset.browser_download_url);
  if (process.platform === 'win32') {
    return usable.find((asset) => /\.exe$/i.test(asset.name))
      || usable.find((asset) => /win/i.test(asset.name));
  }
  if (process.platform === 'darwin') {
    return usable.find((asset) => /(darwin|macos|osx|mac)/i.test(asset.name));
  }
  return usable.find((asset) => /(linux|musl|gnu)/i.test(asset.name))
    || usable.find((asset) => !/\.(exe|zip|tgz|tar\.gz)$/i.test(asset.name) && !/(darwin|macos|win)/i.test(asset.name));
}

async function downloadFile(url, destination, { digest, onProgress } = {}) {
  const response = await fetch(url, {
    headers: { 'User-Agent': USER_AGENT },
    redirect: 'follow',
  });
  if (!response.ok || !response.body) {
    throw new Error(`下载失败：HTTP ${response.status}`);
  }

  const total = Number(response.headers.get('content-length') || 0);
  const temporary = `${destination}.part`;
  const hash = createHash('sha256');
  let received = 0;

  const meter = new Transform({
    transform(chunk, _encoding, callback) {
      received += chunk.length;
      hash.update(chunk);
      onProgress?.({ received, total });
      callback(null, chunk);
    },
  });

  try {
    await pipeline(Readable.fromWeb(response.body), meter, createWriteStream(temporary));
    if (digest?.startsWith('sha256:')) {
      const actual = hash.digest('hex');
      const expected = digest.slice('sha256:'.length).toLowerCase();
      if (actual !== expected) {
        throw new Error('核心文件校验失败（SHA-256 不匹配）');
      }
    }
    await fs.rm(destination, { force: true });
    await fs.rename(temporary, destination);
    if (process.platform !== 'win32') {
      await fs.chmod(destination, 0o755);
    }
  } catch (err) {
    await fs.rm(temporary, { force: true }).catch(() => {});
    throw err;
  }
}

/**
 * Owns the `mclc json` sidecar: binary resolution/download, the NDJSON pipe,
 * the serial request queue and the ready handshake.
 */
export class CoreManager extends EventEmitter {
  constructor({ appPath, userDataPath, resourcesPath }) {
    super();
    this.appPath = appPath;
    this.userDataPath = userDataPath;
    this.resourcesPath = resourcesPath;

    this.proc = null;
    this.pending = new Map();
    this.nextId = 1;
    this.chain = Promise.resolve();
    this.state = 'idle';
    this.readyInfo = null;
    this.binaryPath = null;
    this.effectiveGameDir = null;
    this.gameDirMode = null;
    this.lastError = null;
    this.stderrTail = [];
    this.stopping = false;
    this.readyWaiter = null;
    this.capabilities = new Map();
  }

  getStatus() {
    return {
      state: this.state,
      protocol: this.readyInfo?.protocol ?? null,
      version: this.readyInfo?.version ?? null,
      binaryPath: this.binaryPath,
      gameDir: this.effectiveGameDir,
      gameDirMode: this.gameDirMode,
      pid: this.proc?.pid ?? null,
      error: this.lastError,
    };
  }

  isRunning() {
    return Boolean(this.proc);
  }

  setState(state, extra = {}) {
    this.state = state;
    if (Object.prototype.hasOwnProperty.call(extra, 'error')) {
      this.lastError = extra.error;
    }
    this.emit('status', { ...this.getStatus(), ...extra, state });
  }

  async start(settings) {
    await this.stop();
    this.lastError = null;
    this.readyInfo = null;
    this.stderrTail = [];
    this.setState('starting');

    let proc = null;
    try {
      const binary = await this.resolveBinary(settings);
      this.binaryPath = binary;

      const supportsGameDir = this.supportsGameDir(binary);
      const gameDir = String(settings.gameDir || '').trim();
      let cwd = this.userDataPath;

      if (gameDir) {
        await fs.mkdir(gameDir, { recursive: true });
        cwd = gameDir;
      }

      const args = ['json'];
      if (supportsGameDir && gameDir) {
        args.push('--game-dir', gameDir);
        this.effectiveGameDir = gameDir;
        this.gameDirMode = 'game-dir';
      } else {
        // 旧版核心没有 --game-dir：以 cwd 为根，游戏目录是 <cwd>/.minecraft。
        this.effectiveGameDir = path.join(cwd, '.minecraft');
        this.gameDirMode = 'cwd';
      }
      if (settings.downloadSource) {
        args.push('--download-source', settings.downloadSource);
      }
      if (settings.runtime) {
        args.push('--runtime', settings.runtime);
      }

      proc = spawn(binary, args, {
        cwd,
        windowsHide: true,
        stdio: ['pipe', 'pipe', 'pipe'],
      });
      this.proc = proc;
      this.stopping = false;

      const ready = new Promise((resolve, reject) => {
        this.readyWaiter = { resolve, reject };
      });

      if (proc.stdout) {
        createInterface({ input: proc.stdout, crlfDelay: Infinity })
          .on('line', (line) => this.handleLine(line));
      }

      if (proc.stderr) {
        createInterface({ input: proc.stderr, crlfDelay: Infinity })
          .on('line', (line) => {
            if (!line.trim()) return;
            this.stderrTail.push(line);
            if (this.stderrTail.length > 20) this.stderrTail.shift();
            this.emit('diagnostic', line);
          });
      }

      proc.on('error', (err) => {
        const message = `无法启动启动器核心：${err.message}`;
        this.rejectReady(new Error(message));
        this.failPending(message);
        this.setState('error', { error: message });
      });

      proc.on('exit', (code, signal) => {
        if (this.proc === proc) this.proc = null;
        const reason = [
          `核心进程已退出（code ${code ?? 'null'}${signal ? `, signal ${signal}` : ''}）`,
          this.stderrTail.length ? `stderr: ${this.stderrTail.slice(-3).join(' | ')}` : '',
        ].filter(Boolean).join('，');
        this.rejectReady(new Error(reason));
        this.failPending(reason);
        this.readyInfo = null;
        this.setState(this.stopping ? 'stopped' : 'exited', {
          error: this.stopping ? null : (this.stderrTail.at(-1) || reason),
        });
      });

      const timeout = setTimeout(() => {
        this.rejectReady(new Error('等待核心就绪超时（30 秒）'));
      }, READY_TIMEOUT_MS);

      try {
        await ready;
      } finally {
        clearTimeout(timeout);
        this.readyWaiter = null;
      }

      return this.getStatus();
    } catch (err) {
      this.lastError = err.message;
      this.setState('error', { error: err.message });
      if (proc) {
        try {
          proc.kill();
        } catch {
          // ignore
        }
      }
      throw err;
    }
  }

  async stop() {
    const proc = this.proc;
    if (!proc) {
      this.readyInfo = null;
      return;
    }

    this.stopping = true;
    try {
      if (this.state === 'ready' || this.state === 'busy') {
        await Promise.race([
          this.request('shutdown').catch(() => {}),
          delay(2000),
        ]);
      }
    } catch {
      // ignore
    }

    try {
      proc.stdin.end();
    } catch {
      // ignore
    }

    const exited = new Promise((resolve) => proc.once('exit', resolve));
    const killTimer = setTimeout(() => {
      try {
        proc.kill();
      } catch {
        // ignore
      }
    }, 1500);
    await Promise.race([exited, delay(4000)]);
    clearTimeout(killTimer);

    try {
      proc.kill();
    } catch {
      // ignore
    }

    if (this.proc === proc) this.proc = null;
    this.readyInfo = null;
    this.failPending('核心已停止');
    this.setState('stopped');
    this.stopping = false;
  }

  /**
   * Requests are serialized: the protocol allows only one in flight request.
   */
  request(command, params) {
    const run = () => new Promise((resolve, reject) => {
      if (!this.proc || !this.proc.stdin?.writable) {
        reject(new Error('启动器核心未运行'));
        return;
      }
      const id = this.nextId++;
      this.pending.set(id, { resolve, reject });
      this.setState('busy');

      const payload = { id, command };
      if (params !== undefined) payload.params = params;

      this.proc.stdin.write(`${JSON.stringify(payload)}\n`, (err) => {
        if (!err) return;
        this.pending.delete(id);
        reject(new Error(`写入核心失败：${err.message}`));
        if (this.pending.size === 0 && this.state === 'busy') this.setState('ready');
      });
    });

    const result = this.chain.then(run, run);
    this.chain = result.then(() => {}, () => {});
    return result;
  }

  async clearCoreCache() {
    const directory = path.join(this.userDataPath, 'bin');
    await fs.rm(directory, { recursive: true, force: true });
    this.binaryPath = null;
    this.capabilities.clear();
  }

  supportsGameDir(binary) {
    if (this.capabilities.has(binary)) return this.capabilities.get(binary);

    let supported = false;
    try {
      const result = spawnSync(binary, ['json', '--help'], {
        encoding: 'utf8',
        windowsHide: true,
        timeout: 8000,
      });
      supported = /--game-dir/.test(`${result.stdout || ''}\n${result.stderr || ''}`);
    } catch {
      supported = false;
    }

    this.capabilities.set(binary, supported);
    return supported;
  }

  handleLine(line) {
    const trimmed = line.trim();
    if (!trimmed) return;

    let message;
    try {
      message = JSON.parse(trimmed);
    } catch {
      this.emit('diagnostic', `无法解析核心输出：${trimmed.slice(0, 300)}`);
      return;
    }

    if (message.type === 'ready') {
      this.readyInfo = {
        protocol: message.protocol,
        version: message.version,
      };
      this.setState('ready');
      this.emit('event', message);
      this.readyWaiter?.resolve(message);
      this.readyWaiter = null;
      return;
    }

    if (message.type === 'result' || message.type === 'error') {
      const entry = this.pending.get(message.id);
      if (!entry) {
        this.emit('diagnostic', `收到无法匹配的响应（id=${String(message.id)}）`);
        return;
      }
      this.pending.delete(message.id);
      if (message.type === 'result') {
        entry.resolve(message.data);
      } else {
        entry.reject(new Error(message.error || '未知错误'));
      }
      if (this.pending.size === 0 && this.state === 'busy') {
        this.setState('ready');
      }
      return;
    }

    // log / progress / device_code / profiles / future events
    this.emit('event', message);
  }

  rejectReady(error) {
    this.readyWaiter?.reject(error);
    this.readyWaiter = null;
  }

  failPending(message) {
    for (const entry of this.pending.values()) {
      entry.reject(new Error(message));
    }
    this.pending.clear();
  }

  async resolveBinary(settings) {
    const configured = String(settings.binaryPath || '').trim();
    if (configured) {
      if (!(await isFile(configured))) {
        throw new Error(`找不到 mclc 可执行文件：${configured}`);
      }
      return configured;
    }

    const name = binaryName();
    const candidates = [
      this.resourcesPath ? path.join(this.resourcesPath, 'bin', name) : null,
      path.join(this.appPath, 'bin', name),
      path.join(this.userDataPath, 'bin', name),
    ].filter(Boolean);

    for (const candidate of candidates) {
      if (await isFile(candidate)) return candidate;
    }

    if (!settings.autoDownloadCore) {
      throw new Error('未找到启动器核心。请在设置中指定 mclc 可执行文件，或启用自动下载。');
    }

    return this.downloadLatest(name);
  }

  async downloadLatest(name) {
    this.setState('downloading', { message: '正在获取最新核心版本…' });

    const response = await fetch(RELEASE_API, {
      headers: {
        'User-Agent': USER_AGENT,
        Accept: 'application/vnd.github+json',
      },
    });
    if (!response.ok) {
      throw new Error(`获取核心版本失败：HTTP ${response.status}`);
    }
    const release = await response.json();
    const asset = pickAsset(release.assets);
    if (!asset) {
      throw new Error(`版本 ${release.tag_name || 'latest'} 没有适用于当前平台的二进制文件`);
    }

    const directory = path.join(this.userDataPath, 'bin');
    await fs.mkdir(directory, { recursive: true });
    const destination = path.join(directory, name);

    this.emit('status', {
      ...this.getStatus(),
      state: 'downloading',
      message: `正在下载核心 ${release.tag_name || ''}`,
    });

    await downloadFile(asset.browser_download_url, destination, {
      digest: asset.digest,
      onProgress: ({ received, total }) => {
        this.emit('download-progress', {
          received,
          total,
          version: release.tag_name || '',
        });
      },
    });

    this.emit('download-progress', { received: 1, total: 1, done: true });
    return destination;
  }
}
