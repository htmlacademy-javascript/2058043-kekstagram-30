const TIME_TO_DELETE_MESSAGE = 5000;

const isEscapeKey = (evt) => evt.key === 'Escape';

const showDataErrorMessage = () => {
  const message = document.querySelector('#data-error').content.querySelector('.data-error').cloneNode(true);
  document.body.append(message);
  setTimeout(() => {
    message.remove();
  }, TIME_TO_DELETE_MESSAGE);
};
const getRandomNumber = (min, max) => Math.floor(min + Math.random() * (max + 1 - min));
const getRandomArrayEl = (array) => array[getRandomNumber(0, array.length - 1)];

const debounce = (callback, timeoutDelay) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export { isEscapeKey, showDataErrorMessage, debounce, getRandomArrayEl };
