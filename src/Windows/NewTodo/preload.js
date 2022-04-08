const { ipcRenderer, contextBridge } = require("electron");

contextBridge.exposeInMainWorld("api", {
  missingInput: (channel, message) => {
    let validChannels = ["send-alert"];
    if (validChannels.includes(channel)) {
      ipcRenderer.send(channel, message);
    }
  },

  acceptInput: (channel, message) => {
    let validChannels = ["accept-input"];
    if (validChannels.includes(channel)) {
      ipcRenderer.send(channel, message);
    }
  },
});
