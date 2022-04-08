const { MenuItem } = require("electron");

/**
 * @param {import("electron").Menu[]} template
 */
function createDevToolMenu(template, win) {
  template.push(
    new MenuItem({
      label: "DevTools",
      submenu: [
        {
          label: "Toggle DevTools",
          accelerator: "F12",
          click: () => {
            if (win.webContents.devToolsWebContents) {
              win.webContents.closeDevTools();
            } else {
              win.webContents.openDevTools();
            }
          },
        },
        {
          label: "Reload",
          accelerator: "F5",
          role: "reload",
        },
      ],
    })
  );
}

module.exports = {
  createDevToolMenu,
};
