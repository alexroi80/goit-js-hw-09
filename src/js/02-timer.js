import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const inputDate = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('button[data-start]');
const daysLeft = document.querySelector('span[data-days]');
const hoursLeft = document.querySelector('span[data-hours]');
const minutesLeft = document.querySelector('span[data-minutes]');
const secondsLeft = document.querySelector('span[data-seconds]');
let selectedDate = null;
let currentDate = null;
let countDownId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedDate = selectedDates[0].getTime();
    currentDate = Date.now();

    if (selectedDate < currentDate) {
      startBtn.disabled = true;
      Notiflix.Notify.failure('Please choose a date in the future', {
        timeout: 6000,
      });
    } else {
      startBtn.disabled = false;
    }
  },
};

flatpickr(inputDate, options);

startBtn.addEventListener('click', countDown);

function countDown() {
  startBtn.disabled = true;

  countDownId = setInterval(() => {
    currentDate = Date.now();

    const deltaTime = selectedDate - currentDate;
    if (deltaTime < 1000) {
      clearInterval(countDownId);
      startBtn.disabled = false;
    }

    const time = convertMs(deltaTime);

    daysLeft.textContent = time.days;
    hoursLeft.textContent = time.hours;
    minutesLeft.textContent = time.minutes;
    secondsLeft.textContent = time.seconds;
  }, 1000);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
