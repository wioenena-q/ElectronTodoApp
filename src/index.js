const { app } = require("electron");
const { isDev } = require("./Constants");
const MainWindow = require("./Windows/MainWindow");

app.on("ready", () => {
  if (isDev) {
    console.log("App is ready");
  }

  MainWindow();
});
