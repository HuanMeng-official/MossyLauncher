import { promises as fs } from 'node:fs';
import path from 'node:path';

const DOWNLOAD_SOURCES = new Set(['auto', 'official', 'bmclapi']);
const SETTING_KEYS = ['gameDir', 'binaryPath', 'autoDownloadCore', 'downloadSource', 'runtime', 'jvmArgs'];

export function defaultSettings(userDataPath) {
  return {
    gameDir: path.join(userDataPath, 'game'),
    binaryPath: '',
    autoDownloadCore: true,
    downloadSource: 'auto',
    runtime: '',
    jvmArgs: '-Xmx4G -XX:+UseG1GC',
  };
}

function sanitize(defaults, raw) {
  const out = { ...defaults };
  if (!raw || typeof raw !== 'object') return out;
  if (typeof raw.gameDir === 'string') out.gameDir = raw.gameDir.trim() || defaults.gameDir;
  if (typeof raw.binaryPath === 'string') out.binaryPath = raw.binaryPath.trim();
  if (typeof raw.autoDownloadCore === 'boolean') out.autoDownloadCore = raw.autoDownloadCore;
  if (DOWNLOAD_SOURCES.has(raw.downloadSource)) out.downloadSource = raw.downloadSource;
  if (typeof raw.runtime === 'string') out.runtime = raw.runtime.trim();
  if (typeof raw.jvmArgs === 'string') out.jvmArgs = raw.jvmArgs.trim();
  return out;
}

export class SettingsStore {
  constructor(userDataPath) {
    this.userDataPath = userDataPath;
    this.file = path.join(userDataPath, 'settings.json');
  }

  defaults() {
    return defaultSettings(this.userDataPath);
  }

  async read() {
    try {
      const raw = JSON.parse(await fs.readFile(this.file, 'utf8'));
      return sanitize(this.defaults(), raw);
    } catch (err) {
      if (err.code !== 'ENOENT') {
        console.warn('[settings] 读取失败，使用默认值:', err.message);
      }
      return this.defaults();
    }
  }

  async write(patch) {
    const current = await this.read();
    const next = { ...current };
    for (const key of SETTING_KEYS) {
      if (patch && Object.prototype.hasOwnProperty.call(patch, key)) next[key] = patch[key];
    }
    const clean = sanitize(this.defaults(), next);
    await fs.mkdir(this.userDataPath, { recursive: true });
    const tmp = `${this.file}.tmp`;
    await fs.writeFile(tmp, JSON.stringify(clean, null, 2), 'utf8');
    await fs.rename(tmp, this.file);
    return clean;
  }
}
