const { BrowserWindow, Menu, MenuItem, ipcMain, dialog } = require("electron");
const { join } = require("path");
const { isDev, isDarwin } = require("../../Constants");
const { createDevToolMenu } = require("../Util");

module.exports = function NewTodoWindow() {
  menuTemplate.splice(0, menuTemplate.length);

  let win = new BrowserWindow({
    width: 900,
    height: 400,
    title: "New Todo",
    resizable: false,
    minimizable: false,
    maximizable: false,
    fullscreenable: false,
    webPreferences: {
      preload: join(__dirname, "preload.js"),
      nodeIntegration: true,
    },
  });

  win.loadFile(join(__dirname, "NewTodoWindow.html"));

  menuTemplate.push(
    new MenuItem({
      label: "Settings",
      submenu: [
        {
          label: "Save",
          accelerator: isDarwin ? "Command+S" : "Ctrl+S",
          click: () => {
            win.webContents.send("save");
          },
        },
        {
          label: "Cancel",
          accelerator: isDarwin ? "Command+Q" : "Ctrl+Q",
          click: () => {
            win.close();
          },
        },
      ],
    })
  );

  if (isDev) {
    createDevToolMenu(menuTemplate, win);
  }

  win.setMenu(Menu.buildFromTemplate(menuTemplate));

  win.on("closed", () => {
    win = null;
  });

  ipcMain.on("send-alert", () => {
    dialog.showMessageBox(win, {
      type: "error",
      buttons: ["OK"],
      title: "Error",
      message: "Please fill in all fields.",
    });
  });

  ipcMain.on("accept-input", (e, todo) => {
    win && win.destroy();
  });
};

const menuTemplate = [];
