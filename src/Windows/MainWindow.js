const { BrowserWindow, Menu, app, MenuItem, ipcMain } = require("electron");
const { join } = require("path");
const { isDarwin, isDev } = require("../Constants");
const { createDevToolMenu } = require("./Util");
const NewTodoWindow = require("./NewTodo/NewTodoWindow");

module.exports = function MainWindow() {
  menuTemplate.splice(1, menuTemplate.length);

  let win = new BrowserWindow({
    width: 1080,
    height: 720,
    title: "TODO APP",
    resizable: true,
    minimizable: process.platform !== "linux",
    maximizable: !isDev,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  if (isDev) {
    createDevToolMenu(menuTemplate, win);
  } else {
    win.maximize();
  }

  win.setMenu(Menu.buildFromTemplate(menuTemplate));
  win.loadFile(join(__dirname, "MainWindow.html"));

  win.on("closed", () => {
    win = null;
    app.quit();
  });

  ipcMain.on("accept-input", (event, todo) => {
    win.webContents.send("submitted-todo", todo);
  });
};

app.on("window-all-closed", () => {
  if (isDarwin) app.quit();
});

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
