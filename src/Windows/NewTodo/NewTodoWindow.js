const { BrowserWindow, Menu } = require("electron");
const { join } = require("path");
const { isDev } = require("../../Constants");
const { createDevToolMenu } = require("../Util");

module.exports = function NewTodoWindow() {
  const win = new BrowserWindow({
    width: 900,
    height: 400,
    title: "New Todo",
    resizable: false,
    minimizable: false,
    maximizable: false,
    fullscreenable: false,
    webPreferences: {
      preload: join(__dirname, "preload.js"),
    },
  });

  if (isDev) {
    createDevToolMenu(menuTemplate, win);
  }

  win.loadFile(join(__dirname, "NewTodoWindow.html"));

  win.setMenu(Menu.buildFromTemplate(menuTemplate));
};

const menuTemplate = [];
