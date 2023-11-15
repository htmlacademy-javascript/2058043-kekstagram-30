//случайное целое
const getRandomNumber = (left, right) => Math.trunc(Math.random() * (right + 1 - left) + left);

const getRandomInteger = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const getRandomArrayElement = (elements) =>
  elements[getRandomInteger(0, elements.length - 1)];

const isEscapeKey = (evt) => evt.key === 'Escape';

export {getRandomNumber, getRandomArrayElement,getRandomInteger, isEscapeKey};
