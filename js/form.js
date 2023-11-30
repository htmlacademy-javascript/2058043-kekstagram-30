import { isEscapeKey } from './util.js';
import { changeSliderOptions as onEffectsListClick } from './effects.js';
import { sendData } from './load.js';
import { onScaleBtnClick } from './scale.js';
import { showErrorMessage, showSuccessMessage } from './messages.js';

const MAX_COMMENT_LENGTH = 140;
const MAX_HASHTAGS = 5;
const SUPPORTED_FILE_TYPES = ['jpg', 'jpeg', 'png'];

const formContainerElement = document.querySelector('.img-upload__form');
const inputPhotoElement = formContainerElement.querySelector('.img-upload__input');
const formElement = formContainerElement.querySelector('.img-upload__overlay');
const closeFormBtnElement = formContainerElement.querySelector('.img-upload__cancel');
const submitButton = formContainerElement.querySelector('.img-upload__submit');

const hashtagInputElement = formContainerElement.querySelector('.text__hashtags');
const commentInputElement = formContainerElement.querySelector('.text__description');

const effectsListElement = formContainerElement.querySelector('.effects__list');
const imageElement = formContainerElement.querySelector('.img-upload__preview img');

const regexpForHashtag = /^#[\wа-яё]{1,19}$/i;

const pristine = new Pristine(formContainerElement, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
});

const closeUploadForm = () => {
  formElement.classList.add('hidden');
  document.body.classList.remove('modal-open');

  document.removeEventListener('keydown', closeFormByEscape);

  imageElement.style.removeProperty('transform');
  imageElement.style.removeProperty('filter');
  formContainerElement.reset();
  pristine.reset();
};

const isErrorMessageShow = () => Boolean(document.body.querySelector('.error'));

function closeFormByEscape (evt) {
  if (isEscapeKey(evt) && !isErrorMessageShow()) {
    closeUploadForm();
  }
}

const openForm = () => {
  formElement.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.querySelector('.img-upload__effect-level').classList.add('hidden');

  document.addEventListener('keydown', closeFormByEscape);
};

const onChooseFileBtnClick = () => {
  openForm();

  const file = inputPhotoElement.files[0];
  const isCorrectFileType = SUPPORTED_FILE_TYPES.some((item) => file.name.toLowerCase().endsWith(item));
  if (isCorrectFileType) {
    imageElement.src = URL.createObjectURL(file);
  }
  formContainerElement.querySelectorAll('.effects__preview').forEach((item) => {
    item.style.backgroundImage = `url(${URL.createObjectURL(file)})`;
  });
};
const isValidHashtag = (item) => !regexpForHashtag.test(item);
const validateHashtag = (value) => {
  const hashtagArr = value.toLowerCase().trim().split(/\s+/);

  return !(hashtagArr.find(isValidHashtag)) &&
        !(hashtagArr.length > MAX_HASHTAGS) &&
        (new Set(hashtagArr).size === hashtagArr.length);
};

const getHashtagErrorMessage = () => {
  const hashtagArr = hashtagInputElement.value.toLowerCase().trim().split(/\s+/);

  if (hashtagArr.find(isValidHashtag)) {
    return 'Введён невалидный хэш-тег';
  }
  if (hashtagArr.length > MAX_HASHTAGS) {
    return 'Превышено количество хэш-тегов';
  }
  if (new Set(hashtagArr).size !== hashtagArr.length) {
    return 'Хэш-теги не должны повторяться';
  }
};

pristine.addValidator(hashtagInputElement, validateHashtag, getHashtagErrorMessage);

const validateComment = (value) => value.length < MAX_COMMENT_LENGTH;

pristine.addValidator(commentInputElement, validateComment, `Длина комментария больше ${MAX_COMMENT_LENGTH} символов`);

const sendForm = () => {
  showSuccessMessage();
  closeUploadForm();
  submitButton.disabled = false;
};


const setupForm = () => {
  const preventCloseByEscape = (evt) => evt.stopPropagation();

  closeFormBtnElement.addEventListener('click', closeUploadForm);
  hashtagInputElement.addEventListener('keydown', preventCloseByEscape);
  commentInputElement.addEventListener('keydown', preventCloseByEscape);
  effectsListElement.addEventListener('click', onEffectsListClick);
  formContainerElement.querySelector('.img-upload__scale').addEventListener('click', onScaleBtnClick);
  inputPhotoElement.addEventListener('change', onChooseFileBtnClick);

  formContainerElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
    if (pristine.validate()) {
      const data = new FormData(formContainerElement);
      submitButton.disabled = true;
      sendData(sendForm, showErrorMessage, 'POST', data);
    }
  });
};
export { setupForm };
