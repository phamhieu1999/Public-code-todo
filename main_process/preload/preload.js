const { ipcRenderer } = require('electron')
process.on('loaded', () => {
  window.ipcRenderer = ipcRenderer;
})