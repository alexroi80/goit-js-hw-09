import Notiflix from 'notiflix';

const formEl = document.querySelector('.form');

let firstDelay = null;
let delayStep = null;
let amount = null;
let totalDelay = null;

formEl.addEventListener('input', onFormInput);

formEl.addEventListener('submit', onFormSubmit);

function onFormInput(evt) {
  if (evt.target.name === 'delay') {
    firstDelay = Number(evt.target.value);
  }
  if (evt.target.name === 'step') {
    delayStep = Number(evt.target.value);
  }
  if (evt.target.name === 'amount') {
    amount = Number(evt.target.value);
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve(`Fulfilled promise ${position} in ${delay}ms`);
      } else {
        reject(`Rejected promise ${position} in ${delay}ms`);
      }
    }, delay);
  });
}

function onFormSubmit(evt) {
  evt.preventDefault();
  totalDelay = firstDelay;
  for (let i = 1; i <= amount; i += 1) {
    createPromise(i, totalDelay)
      .then(value => {
        Notiflix.Notify.success(value, {
          timeout: 6000,
        });
      })
      .catch(error => {
        Notiflix.Notify.failure(error, {
          timeout: 6000,
        });
      });
    totalDelay += delayStep;
  }
}
