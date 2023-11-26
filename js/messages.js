import { isEscapeKey } from './util.js';

const successMessage = document.querySelector('#success').content.querySelector('.success');
const errorMessage = document.querySelector('#error').content.querySelector('.error');


const removeMessage = () => {
  document.body.lastChild.remove();
  document.removeEventListener('keydown', onEscapeBtnClick);
};
function onEscapeBtnClick (evt) {
  if (isEscapeKey(evt)) {
    removeMessage();
  }
}

const renderMessage = (element) => {
  const message = element.cloneNode(true);

  message.querySelector('button').addEventListener('click', () => {
    removeMessage();
  });

  message.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('success') || evt.target.classList.contains('error')) {
      removeMessage();
    }
  });

  document.addEventListener('keydown', onEscapeBtnClick);

  document.body.append(message);
};

const showErrorMessage = () => {
  renderMessage(errorMessage);
  document.querySelector('.img-upload__submit').disabled = false;
};

const showSuccessMessage = () => {
  renderMessage(successMessage);
};

export {showErrorMessage, showSuccessMessage};
