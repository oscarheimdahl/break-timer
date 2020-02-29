const { app, ipcMain } = require('electron');
app.allowRendererProcessReuse = true;
require('electron-reload')(__dirname);

const buildWindow = require('./src/js/window.js');
const buildAlarmWindow = require('./src/js/alarmWindow.js');
const buildTray = require('./src/js/tray.js');

app.on('ready', () => {
  const window = buildWindow();
  buildTray(window);
});

ipcMain.on('show-timer-done', function(event, data) {
  buildAlarmWindow();
});

ipcMain.s;
