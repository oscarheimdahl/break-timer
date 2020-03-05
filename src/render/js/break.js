const { ipcRenderer } = require('electron');
const messages = [
  "You'll work better if you take a break.",
  'Scientist say that breaks are good.',
  'Do some jumping jacks or something',
  'Some stretching would be nice, no?',
  'Good work, time for a break.',
  "Isn't around lunch time?",
  'How about some squats?',
  'Grumpy? Eat something!',
  '5 push ups coming up?!',
  "Hey! Don't slouch!",
  'BREEEEAAAK TIMEEEE',
  'Work them calves!',
  'Drink some water!',
  'COOOOOFFEEEEEE',
  'DOOOOOO IIIIT!',
  'Take 5'
];

document.getElementById('restart-timer').addEventListener('click', function() {
  ipcRenderer.send('restart-timer');
});

document.getElementById('break-window').addEventListener('click', function() {
  ipcRenderer.send('hide-break-window');
});

ipcRenderer.on('play-sound', function() {
  document.getElementById('notification').play();
});

ipcRenderer.on('show', function() {
  document.getElementById('message').innerHTML =
    messages[Math.floor(Math.random() * messages.length)];
  ipcRenderer.send('sound-query');
});

// ipcRenderer.on('hide', function() {});
