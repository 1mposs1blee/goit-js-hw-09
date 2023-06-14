import Notiflix from 'notiflix';

const formEl = document.querySelector('.form');
const btnEl = document.querySelector('[type="submit"]');

const createPromise = (position, delay) => {
  const shouldResolve = Math.random() > 0.3;

  if (shouldResolve) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({ position, delay });
      }, delay);
    });
  }

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject({ position, delay });
    }, delay);
  });
};

const onFormSubmit = e => {
  e.preventDefault();
  btnEl.disabled = true;

  const step = parseInt(e.currentTarget.elements.step.value);
  const amount = parseInt(e.currentTarget.elements.amount.value);
  let delay = parseInt(e.currentTarget.elements.delay.value);

  for (let position = 1; position <= amount; position += 1) {
    Promise.resolve(createPromise(position, delay))
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`Fulfilled promise ${position} in ${delay}ms`, {
          timeout: 2000,
        });
        if (position === amount) {
          btnEl.disabled = false;
        }
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`Rejected promise ${position} in ${delay}ms`, {
          timeout: 2000,
        });
        if (position === amount) {
          btnEl.disabled = false;
        }
      });

    delay += step;
  }
};

formEl.addEventListener('submit', onFormSubmit);
