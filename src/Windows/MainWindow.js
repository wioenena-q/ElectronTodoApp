const { BrowserWindow, Menu, app, MenuItem } = require("electron");
const { join } = require("path");
const { isDarwin, isDev } = require("../Constants");
const { createDevToolMenu } = require("./Util");
const NewTodoWindow = require("./NewTodo/NewTodoWindow");

module.exports = function MainWindow() {
  const win = new BrowserWindow({
    width: 1080,
    height: 720,
    title: "TODO APP",
    resizable: true,
    minimizable: process.platform !== "linux",
    maximizable: !isDev,
    webPreferences: {
      preload: join(__dirname, "preload.js"),
    },
  });

  if (isDev) {
    createDevToolMenu(menuTemplate, win);
  } else {
    win.maximize();
  }

  win.setMenu(Menu.buildFromTemplate(menuTemplate));
  win.loadFile(join(__dirname, "MainWindow.html"));
};

const menuTemplate = [
  new MenuItem({
    label: "Todo",
    submenu: [
      {
        label: "New",
        accelerator: isDarwin ? "Command+N" : "Ctrl+N",
        click: () => {
          if (isDev) {
            console.log("New todo");
          }
          NewTodoWindow();
        },
      },
      {
        label: "Exit",
        accelerator: isDarwin ? "Command+Q" : "Ctrl+Q",
        role: "quit",
      },
    ],
  }),
];
