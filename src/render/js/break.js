const { ipcRenderer } = require('electron');
const path = require('path');
const messages = [
  "You'll work better if you take a break.",
  'Do some jumping jacks or something',
  'Some stretching would be nice, no?',
  'Good work, time for a break.',
  "Isn't around lunch time?",
  'How about some squats?',
  '5 push ups coming up?!',
  "Hey! Don't slouch!",
  'BREEEEAAAK TIMEEEE',
  'Work them calves!',
  'Drink some water!',
  'COOOOOFFEEEEEE',
  'DOOOOOO IIIIT!',
  'Take 5'
];

document.getElementById('message').innerHTML =
  messages[Math.floor(Math.random() * messages.length)];

document.getElementById('restart-timer').addEventListener('click', function() {
  ipcRenderer.send('restart-timer');
});

document.getElementById('break-window').addEventListener('click', function() {
  // ipcRenderer.send('restart-timer');
  ipcRenderer.send('close-break-window');
});

ipcRenderer.send('sound-query');
ipcRenderer.on('play-sound', function() {
  document.getElementById('notification').play();
});
