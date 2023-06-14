const startBtnEl = document.querySelector('[data-start]');
const stopBtnEl = document.querySelector('[data-stop]');
const bodyEl = document.body;
let interval = null;

const onStartBtnClick = () => {
  startBtnEl.disabled = true;
  stopBtnEl.disabled = false;

  changeColor();
  activeInterval();
};

const onStopBtnClick = () => {
  clearInterval(interval);

  stopBtnEl.disabled = true;
  startBtnEl.disabled = false;
};

const activeInterval = () => {
  interval = setInterval(() => {
    changeColor();
  }, 1000);
};

const changeColor = () => {
  bodyEl.style.backgroundColor = getRandomHexColor();
};

const getRandomHexColor = () =>
  `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;

startBtnEl.addEventListener('click', onStartBtnClick);
stopBtnEl.addEventListener('click', onStopBtnClick);
