const { Tray, Menu, nativeImage, MenuItem, screen } = require('electron');
const path = require('path');
const iconPath = path.join(__dirname, '../../resources/25.png');

let tray = null;

function buildTray(window, quit) {
  tray = new Tray(nativeImage.createFromPath(iconPath));
  //   buildMenu(quit);
  tray.setToolTip('Right click to quit program');
  tray.on('click', function(event, bounds, pos) {
    setWindowPos(bounds, window);
    toggleWindow(window);
  });
  tray.on('right-click', function() {
    quit();
  });
}

function buildMenu(quit) {
  let quitButton = new MenuItem({ label: 'quit' });
  quitButton.click = function() {
    quit();
  };
  let contextMenu = new Menu();
  contextMenu.append(quitButton);
  tray.setContextMenu(contextMenu);
}

function toggleWindow(window) {
  if (window.isVisible()) {
    window.hide();
  } else {
    window.show();
  }
}

function setWindowPos(iconBounds, window) {
  const screenWidth = screen.getPrimaryDisplay().workAreaSize.width;
  const iconCenter = iconBounds.x + iconBounds.width / 2;
  const windowWidth = window.getBounds().width;
  let windowX = Math.floor(iconCenter - windowWidth / 2);
  if (windowX + windowWidth > screenWidth) {
    windowX = screenWidth - windowWidth - 30;
  }
  window.setPosition(windowX, 30);
}

module.exports = buildTray;
