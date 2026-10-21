import electron from 'electron';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { CoreManager } from './core/core-manager.js';
import { SettingsStore } from './core/settings.js';
import { SkinService } from './core/skins.js';

// Electron 的 ESM 包装在不同版本上对具名导出支持不一致，统一从默认导出解构。
const { app, BrowserWindow, dialog, ipcMain, shell } = electron;

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const APP_ICON = path.join(__dirname, '..', 'assets', 'icon.ico');

const ALLOWED_COMMANDS = new Set([
  'ping',
  'shutdown',
  'java.list',
  'versions.list',
  'installed.list',
  'install',
  'launch',
  'login',
  'external_login',
  'accounts.list',
]);

const RESTART_KEYS = ['gameDir', 'binaryPath', 'autoDownloadCore', 'downloadSource', 'runtime'];

let mainWindow = null;
let core = null;
let settingsStore = null;
let skins = null;
let coreStopped = false;

function send(channel, payload) {
  if (mainWindow && !mainWindow.isDestroyed()) {
    mainWindow.webContents.send(channel, payload);
  }
}

function createCore() {
  core = new CoreManager({
    appPath: app.getAppPath(),
    userDataPath: app.getPath('userData'),
    resourcesPath: process.resourcesPath,
  });

  core.on('status', (status) => send('core:status', status));
  core.on('event', (event) => send('core:event', event));
  core.on('diagnostic', (line) => send('core:diagnostic', line));
  core.on('download-progress', (progress) => send('core:download-progress', progress));
}

function registerIpc() {
  ipcMain.handle('settings:get', async () => ({
    settings: await settingsStore.read(),
    paths: {
      userData: app.getPath('userData'),
      appPath: app.getAppPath(),
      platform: process.platform,
    },
  }));

  ipcMain.handle('settings:set', async (_event, patch) => {
    const before = await settingsStore.read();
    const after = await settingsStore.write(patch);
    const needsRestart = RESTART_KEYS.some((key) => before[key] !== after[key]);

    let restartError = null;
    if (needsRestart) {
      try {
        await core.start(after);
      } catch (err) {
        restartError = err.message;
      }
    }
    return { settings: after, restarted: needsRestart, restartError };
  });

  ipcMain.handle('core:status', () => core.getStatus());

  ipcMain.handle('core:start', async () => core.start(await settingsStore.read()));

  ipcMain.handle('core:stop', async () => {
    await core.stop();
    return core.getStatus();
  });

  ipcMain.handle('core:restart', async () => core.start(await settingsStore.read()));

  ipcMain.handle('core:clear-cache', async () => {
    await core.stop();
    await core.clearCoreCache();
    return core.start(await settingsStore.read());
  });

  ipcMain.handle('core:request', async (_event, payload) => {
    const command = payload?.command;
    const params = payload?.params;

    if (typeof command !== 'string' || !ALLOWED_COMMANDS.has(command)) {
      return { ok: false, error: `不允许的命令：${String(command)}` };
    }
    if (params !== undefined && (params === null || typeof params !== 'object' || Array.isArray(params))) {
      return { ok: false, error: '请求参数必须是对象' };
    }

    try {
      return { ok: true, data: await core.request(command, params) };
    } catch (err) {
      return { ok: false, error: err.message };
    }
  });

  ipcMain.handle('skin:get', async (_event, payload) => {
    const uuid = payload?.uuid;
    const apiUrl = payload?.apiUrl;

    if (typeof uuid !== 'string') {
      return { ok: false, error: '缺少账号 UUID' };
    }
    if (apiUrl != null && typeof apiUrl !== 'string') {
      return { ok: false, error: '无效的 API 地址' };
    }

    try {
      return await skins.get({
        uuid,
        apiUrl: apiUrl || null,
        force: Boolean(payload?.force),
      });
    } catch (err) {
      return { ok: false, error: err.message };
    }
  });

  ipcMain.handle('dialog:directory', async () => {
    const result = await dialog.showOpenDialog(mainWindow, {
      properties: ['openDirectory', 'createDirectory'],
    });
    return result.canceled ? null : result.filePaths[0];
  });

  ipcMain.handle('dialog:file', async (_event, options = {}) => {
    const filters = Array.isArray(options.filters) ? options.filters : [];
    const result = await dialog.showOpenDialog(mainWindow, {
      properties: ['openFile'],
      filters,
    });
    return result.canceled ? null : result.filePaths[0];
  });

  ipcMain.handle('shell:external', async (_event, url) => {
    const target = String(url || '');
    if (!/^https?:\/\//i.test(target)) {
      throw new Error('仅允许打开 http(s) 链接');
    }
    await shell.openExternal(target);
  });

  ipcMain.handle('shell:open-path', async (_event, target) => {
    if (typeof target !== 'string' || !target.trim()) {
      throw new Error('路径无效');
    }
    const error = await shell.openPath(target);
    if (error) throw new Error(error);
  });
}

async function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1220,
    height: 800,
    minWidth: 980,
    minHeight: 640,
    show: false,
    backgroundColor: '#0b100c',
    title: 'MossyLauncher',
    icon: APP_ICON,
    titleBarStyle: process.platform === 'linux' ? 'default' : 'hidden',
    titleBarOverlay: process.platform === 'win32'
      ? { color: '#0b100c', symbolColor: '#dce9d5', height: 36 }
      : undefined,
    webPreferences: {
      preload: path.join(__dirname, 'preload.cjs'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
    },
  });

  mainWindow.once('ready-to-show', () => mainWindow.show());

  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    if (/^https?:\/\//i.test(url)) {
      shell.openExternal(url);
    }
    return { action: 'deny' };
  });

  mainWindow.webContents.on('will-navigate', (event, url) => {
    if (url !== mainWindow.webContents.getURL()) {
      event.preventDefault();
    }
  });

  await mainWindow.loadFile(path.join(__dirname, 'renderer', 'index.html'));

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

const gotLock = app.requestSingleInstanceLock();
if (!gotLock) {
  console.warn('[MossyLauncher] 已有实例在运行，退出当前实例');
  app.quit();
} else {
  app.on('second-instance', () => {
    if (!mainWindow) return;
    if (mainWindow.isMinimized()) mainWindow.restore();
    mainWindow.focus();
  });

  app.whenReady().then(async () => {
    console.log('[MossyLauncher] app ready');
    settingsStore = new SettingsStore(app.getPath('userData'));
    skins = new SkinService();
    createCore();
    registerIpc();
    await createWindow();
    console.log('[MossyLauncher] window created');
  }).catch((err) => {
    console.error('[MossyLauncher] 启动失败:', err);
    app.quit();
  });

  app.on('activate', async () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      await createWindow();
    }
  });

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('before-quit', (event) => {
    if (core?.isRunning() && !coreStopped) {
      event.preventDefault();
      core.stop().finally(() => {
        coreStopped = true;
        app.quit();
      });
    }
  });
}
