const TIME_TO_DELETE_MESSAGE = 5000;

const isEscapeKey = (evt) => evt.key === 'Escape';

const showDataErrorMessage = () => {
  const message = document.querySelector('#data-error').content.querySelector('.data-error').cloneNode(true);
  document.body.append(message);
  setTimeout(() => {
    message.remove();
  }, TIME_TO_DELETE_MESSAGE);
};

export {isEscapeKey, showDataErrorMessage};
