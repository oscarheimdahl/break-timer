const { BrowserWindow } = require('electron');
const path = require('path');

let window = null;
let on = null;

function build(playSound) {
  window = new BrowserWindow({
    width: 400,
    height: 250,
    opacity: 0.9,
    webPreferences: {
      nodeIntegration: true
    },
    skipTaskbar: true,
    frame: false,
    resizable: false,
    show: false,
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
    window.show();
  });
  return window;
}

function close() {
  window.close();
  window = null;
}

function getWindow() {
  return window;
}

module.exports = { build, close, getWindow };
