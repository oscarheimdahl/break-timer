const { BrowserWindow } = require('electron');
const path = require('path');

let window = null;

function build() {
  window = new BrowserWindow({
    width: 500,
    height: 300,
    opacity: 0.9,
    webPreferences: {
      nodeIntegration: true
    },
    skipTaskbar: true,
    frame: false,
    resizable: false,
    // show: false,
    alwaysOnTop: true
  });

  window.setVisibleOnAllWorkspaces(true);
  //   window.webContents.openDevTools();

  window.on('blur', function() {
    window.close();
    window = null;
  });

  window.loadFile(path.join(__dirname, '../render/break.html'));
  window.once('ready-to-show', () => {
    window.show(true);
  });
  return window;
}

function close() {
  window.close();
  window = null;
}

module.exports = { build, close };
