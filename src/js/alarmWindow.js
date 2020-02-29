const { BrowserWindow } = require('electron');

let window = null;

function buildAlarmWindow(x) {
  window = new BrowserWindow({
    width: 500,
    height: 300,
    opacity: 0.9,
    webPreferences: {
      nodeIntegration: true
    },
    skipTaskbar: true,
    frame: false,
    alwaysOnTop: true
  });
  //   window.webContents.openDevTools();
  window.on('blur', function() {
    window.close();
    window = null;
  });

  window.loadFile('src/alarm.html');
  window.once('ready-to-show', () => {
    window.show(true);
  });
  return window;
}

module.exports = buildAlarmWindow;
