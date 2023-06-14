import flatpickr from 'flatpickr';
import Notiflix from 'notiflix';
import 'flatpickr/dist/flatpickr.min.css';

const inputEl = document.querySelector('#datetime-picker');
const btnEl = document.querySelector('[data-start]');
const daysSpanEl = document.querySelector('[data-days]');
const hoursSpanEl = document.querySelector('[data-hours]');
const minutesSpanEl = document.querySelector('[data-minutes]');
const secondsSpanEl = document.querySelector('[data-seconds]');
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    difference = selectedDates[0] - options.defaultDate;

    if (difference > 0) {
      btnEl.disabled = false;

      return;
    }
    Notiflix.Notify.failure('Please choose a date in the future', {
      timeout: 1500,
    });
    btnEl.disabled = true;
  },
};
let difference = null;
let interval = null;

flatpickr(inputEl, options);

const onBtnClick = () => {
  btnEl.disabled = true;
  inputEl.disabled = true;
  changeUIElems(convertMs(difference));
  activateTimeInterval();
};

const activateTimeInterval = () => {
  interval = setInterval(() => {
    difference -= 1000;

    if (difference < 0) {
      clearInterval(interval);
      inputEl.disabled = false;

      return;
    }

    const timerValues = convertMs(difference);

    changeUIElems(timerValues);
  }, 1000);
};

const addLeadingZero = value => value.toString().padStart('2', 0);

const convertMs = ms => {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
};

const changeUIElems = ({ days, hours, minutes, seconds }) => {
  daysSpanEl.textContent = days;
  hoursSpanEl.textContent = hours;
  minutesSpanEl.textContent = minutes;
  secondsSpanEl.textContent = seconds;
};

btnEl.addEventListener('click', onBtnClick);
