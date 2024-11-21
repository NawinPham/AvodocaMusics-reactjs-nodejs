const { contextBridge } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  // Define methods to communicate between renderer and main process
});
