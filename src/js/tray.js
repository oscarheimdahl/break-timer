const { Tray, Menu, nativeImage, screen } = require('electron');
const path = require('path');
const iconPath = path.join(__dirname, '../../resources/25.png');

let tray = null;

function buildTray(window, quit) {
  tray = new Tray(nativeImage.createFromPath(iconPath));
  tray.setToolTip('Right click to quit');
  tray.on('click', function(event, bounds, pos) {
    setWindowPos(bounds, window);
    toggleWindow(window);

    // const screenPos = screen.getCursorScreenPoint();
    // console.log(screen.getDisplayNearestPoint(screenPos).workArea);
  });
  tray.on('right-click', function(event, bounds, pos) {
    quit();
  });
}

function toggleWindow(window) {
  if (window.isVisible()) {
    window.hide();
  } else {
    window.show();
  }
}

function setWindowPos(iconBounds, window) {
  const iconCenter = iconBounds.x + iconBounds.width / 2;
  const windowWidth = window.getBounds().width;
  window.setPosition(Math.floor(iconCenter - windowWidth / 2), 30);
}

module.exports = buildTray;
