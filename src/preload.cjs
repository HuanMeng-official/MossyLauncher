const { contextBridge, ipcRenderer } = require('electron');

function subscribe(channel) {
  return (callback) => {
    if (typeof callback !== 'function') return () => {};
    const listener = (_event, payload) => callback(payload);
    ipcRenderer.on(channel, listener);
    return () => ipcRenderer.removeListener(channel, listener);
  };
}

contextBridge.exposeInMainWorld('mossy', {
  getSettings: () => ipcRenderer.invoke('settings:get'),
  setSettings: (patch) => ipcRenderer.invoke('settings:set', patch),

  getStatus: () => ipcRenderer.invoke('core:status'),
  startCore: () => ipcRenderer.invoke('core:start'),
  stopCore: () => ipcRenderer.invoke('core:stop'),
  restartCore: () => ipcRenderer.invoke('core:restart'),
  clearCoreCache: () => ipcRenderer.invoke('core:clear-cache'),
  request: (command, params) => ipcRenderer.invoke('core:request', { command, params }),
  getSkin: (payload) => ipcRenderer.invoke('skin:get', payload),

  chooseDirectory: () => ipcRenderer.invoke('dialog:directory'),
  chooseFile: (options) => ipcRenderer.invoke('dialog:file', options),
  openExternal: (url) => ipcRenderer.invoke('shell:external', url),
  openPath: (target) => ipcRenderer.invoke('shell:open-path', target),

  onStatus: subscribe('core:status'),
  onEvent: subscribe('core:event'),
  onDiagnostic: subscribe('core:diagnostic'),
  onDownloadProgress: subscribe('core:download-progress'),
});
