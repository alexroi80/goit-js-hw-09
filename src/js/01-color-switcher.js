const bodyEl = document.querySelector('body');
const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
let intervalId = '';
stopBtn.disabled = true;

startBtn.addEventListener('click', onStart);
stopBtn.addEventListener('click', onStop);

function onStart() {
  if (startBtn.disabled) {
    return;
  }
  if (stopBtn.disabled) {
    startBtn.disabled = true;
    stopBtn.disabled = false;

    intervalId = setInterval(() => {
      const color = getRandomHexColor();
      bodyEl.style.backgroundColor = color;
    }, 1000);
  }
}
function onStop() {
  startBtn.disabled = false;
  stopBtn.disabled = true;
  clearInterval(intervalId);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
