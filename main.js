const setupEvents = require('./installers/setupEvents');
if (setupEvents.handleSquirrelEvent()) {
  // squirrel event handled and app will exit in 1000ms, so don't do anything else
  return;
}

const { app, ipcMain } = require('electron');
app.allowRendererProcessReuse = true;
require('electron-reload')(__dirname);

const timerWindow = require('./src/js/timerMain.js');
const breakWindow = require('./src/js/breakMain.js');
const buildTray = require('./src/js/trayMain.js');
let timerWindowInstance = null;
if (process.platform === 'darwin') {
  app.dock.hide();
}

app.on('ready', () => {
  timerWindowInstance = timerWindow.build();
  buildTray(timerWindowInstance, app.quit);
  //   alarmWindow.build();
});

ipcMain.on('show-break-window', function(event, data) {
  breakWindow.build();
});

ipcMain.on('close-break-window', function(event, data) {
  breakWindow.close();
});

ipcMain.on('restart-timer', function(event, data) {
  timerWindowInstance.webContents.send('restart-timer');
});
