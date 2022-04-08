const { contextBridge } = require("electron");

contextBridge.exposeInMainWorld("require", require);
