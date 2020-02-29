const { Tray, Menu, nativeImage } = require('electron');
const path = require('path');
const iconPath = path.join(__dirname, '../../resources/25.png');

let tray = null;

function buildTray(window) {
  tray = new Tray(nativeImage.createFromPath(iconPath));
  tray.setToolTip('Timer');
  tray.on('click', function(event, bounds, pos) {
    setWindowPos(bounds, window);
    toggleWindow(window);
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
  window.setPosition(iconCenter - windowWidth / 2, 30);
}

module.exports = buildTray;
