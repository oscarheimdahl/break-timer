const { BrowserWindow } = require('electron');
const path = require('path');

let window = null;

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
    // titleBarStyle: 'customButtonsOnHover',
    transparent: true,
    resizable: false,
    show: false,
    alwaysOnTop: true
  });

  window.setVisibleOnAllWorkspaces(true);
  //   window.webContents.openDevTools();

  //   window.on('blur', function() {
  //     window.hide();
  //     window.webContents.send('hide');
  //   });

  window.loadFile(path.join(__dirname, '../render/break.html'));
  //   window.on('ready-to-show', () => {
  // window.show();
  //   });
  return window;
}

module.exports = { build };
