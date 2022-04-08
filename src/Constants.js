const isDev = require("electron-is-dev");

const isDarwin = process.platform === "darwin";

module.exports = {
  isDev,
  isDarwin,
};
