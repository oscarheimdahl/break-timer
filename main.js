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
let breakWindowInstance = null;

let sound = true;

if (process.platform === 'darwin') {
  app.dock.hide();
}

app.on('ready', () => {
  timerWindowInstance = timerWindow.build();
  breakWindowInstance = breakWindow.build(sound);

  buildTray(timerWindowInstance, app.quit);
  //   alarmWindow.build();
});

ipcMain.on('show-break-window', function(event, data) {
  breakWindowInstance.webContents.send('show');
  breakWindowInstance.show();
});

ipcMain.on('hide-break-window', function(event, data) {
  breakWindowInstance.hide();
  //   breakWindowInstance.webContents.send('hide');
});

ipcMain.on('restart-timer', function(event, data) {
  timerWindowInstance.webContents.send('restart-timer');
});

ipcMain.on('toggle-sound', function(event, data) {
  sound = data.sound;
});

ipcMain.on('sound-query', function(event, data) {
  if (sound) breakWindowInstance.webContents.send('play-sound');
});

ipcMain.on('clg', function(event, data) {
  console.log(data.data);
});
