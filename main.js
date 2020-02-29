const { app, ipcMain } = require('electron');
app.allowRendererProcessReuse = true;
require('electron-reload')(__dirname);

const mainWindowBuilder = require('./src/js/mainWindow.js');
const alarmWindow = require('./src/js/alarmWindow.js');
const buildTray = require('./src/js/tray.js');

if (process.platform === 'darwin') {
  app.dock.hide();
}

app.on('ready', () => {
  const mainWindow = mainWindowBuilder.build();
  buildTray(mainWindow, app.quit);
});

ipcMain.on('show-timer-done', function(event, data) {
  alarmWindow.build();
});

ipcMain.on('close-timer-window', function(event, data) {
  alarmWindow.close();
});
