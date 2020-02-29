const { BrowserWindow } = require('electron');

let window = null;

function build(x) {
  if (window) {
    window.hide();
    return;
  }
  let width = 200;
  window = new BrowserWindow({
    width,
    height: 80,
    x: x - width / 2,
    y: 40,
    opacity: 0.9,
    webPreferences: {
      nodeIntegration: true
    },
    skipTaskbar: true,
    frame: false,
    show: false,
    alwaysOnTop: true
  });
  window.setVisibleOnAllWorkspaces(true);
  //   window.webContents.openDevTools();
  window.on('blur', function() {
    window.hide();
  });

  window.loadFile('src/index.html');
  window.once('ready-to-show', () => {
    // window.show(true);
  });
  return window;
}

module.exports = { build };
