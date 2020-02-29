const { ipcRenderer } = require('electron');
const toggle = document.getElementsByClassName('toggle')[0];
const minutesField = document.getElementsByClassName('minutes-field')[0];
const secondsField = document.getElementsByClassName('seconds-field')[0];
const stopIcon = document.getElementById('stop-icon');
const playIcon = document.getElementById('play-icon');

let edited = false;

let minutes = 25;
let seconds = 00;

let minutesLeft = minutes;
let secondsLeft = seconds;
let larmTime;
let ticker;

renderTime();

toggle.addEventListener('click', function() {
  if (!larmTime) {
    startTimer();
  } else {
    stopTimer();
  }
});

minutesField.addEventListener('input', formatInput);
secondsField.addEventListener('input', formatInput);

minutesField.addEventListener('click', clearInput);
secondsField.addEventListener('click', clearInput);

minutesField.addEventListener('blur', fillInput);
secondsField.addEventListener('blur', fillInput);

function formatInput() {
  edited = true;
  if (this.value > 59) this.value = 59;
  if (this.value.length > 2) this.value = this.value.slice(0, 2);
  if (this.value < 0) this.value = 0;
}

function clearInput() {
  this.value = '';
}

function fillInput() {
  if (!this.value) this.value = '00';
  if (this.value.length < 2) this.value = '0' + this.value;
}

function stopTimer() {
  minutesField.readOnly = '';
  secondsField.readOnly = '';
  stopIcon.className = 'invis';
  playIcon.className = '';
  clearTimeout(ticker);
  larmTime = null;
  minutesLeft = minutes;
  secondsLeft = seconds;
  renderTime();
}

function startTimer() {
  minutesField.readOnly = 'readOnly';
  secondsField.readOnly = 'readOnly';
  stopIcon.className = '';
  playIcon.className = 'invis';
  minutesLeft = parseInt(
    minutesField.value > 0 || edited ? minutesField.value : minutes,
    10
  );
  secondsLeft = parseInt(
    secondsField.value > 0 || edited ? secondsField.value : seconds,
    10
  );
  larmTime = Date.now() + (minutesLeft * 60 + secondsLeft) * 1000 + 200;
  updateClock();
  edited = false;
}

function updateClock() {
  let timeLeft = larmTime - Date.now();
  minutesLeft = Math.floor(timeLeft / (60 * 1000));
  secondsLeft = Math.floor((timeLeft % (60 * 1000)) / 1000);
  renderTime();
  if (timeLeft > 0) {
    ticker = setTimeout(() => {
      updateClock();
    }, 1000);
  } else {
    stopTimer();
    showTimerDone();
  }
}

function renderTime() {
  if (minutesLeft + secondsLeft <= 0) {
    minutesField.value = '00';
    secondsField.value = '00';
    return;
  }

  let minuteString = minutesLeft.toString();
  if (minuteString.length === 1) minuteString = '0' + minuteString;

  let secondString = secondsLeft.toString();
  if (secondString.length === 1) secondString = '0' + secondString;
  minutesField.value = minuteString;
  secondsField.value = secondString;
}

function showTimerDone() {
  ipcRenderer.send('show-timer-done');
}
