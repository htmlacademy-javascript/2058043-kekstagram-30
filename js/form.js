import {isEscapeKey} from './util.js';
import {changeSliderOptions as onEffectsClickHandler} from './effects.js';
import { sendData } from './load.js';
import { onScaleBtnClick } from './scale.js';
import { showErrorMessage, showSuccessMessage } from './messages.js';

const MAX_COMMENT_LENGTH = 140;
const MAX_HASHTAGS = 5;
const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const form = document.querySelector('.img-upload__form');
const inputPhoto = form.querySelector('.img-upload__input');
const formToEditPhoto = form.querySelector('.img-upload__overlay');
const closeFormBtn = form.querySelector('.img-upload__cancel');

const hashtagInput = form.querySelector('.text__hashtags');
const commentInput = form.querySelector('.text__description');

const effectsList = form.querySelector('.effects__list');
const image = form.querySelector('.img-upload__preview img');

const resetCloseByEscape = (evt) => evt.stopPropagation();

const regexpForHashtag = /^#[\wа-яё]{1,19}$/i;

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
});

const closeForm = () => {
  formToEditPhoto.classList.add('hidden');
  document.body.classList.remove('modal-open');

  document.removeEventListener('keydown', closeFormByEscape);

  image.style.removeProperty('transform');
  image.style.removeProperty('filter');
  form.reset();
  pristine.reset();
};

const isErrorMessageShow = () => Boolean(document.body.querySelector('.error'));

function closeFormByEscape (evt) {
  if (isEscapeKey(evt) && !isErrorMessageShow()) {
    closeForm();
  }
}

const openForm = () => {
  formToEditPhoto.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.querySelector('.img-upload__effect-level').classList.add('hidden');

  document.addEventListener('keydown', closeFormByEscape);
};

const onChooseFileBtnClick = () => {
  openForm();

  const file = inputPhoto.files[0];
  const isCorrectFileType = FILE_TYPES.some((item) => file.name.toLowerCase().endsWith(item));
  if (isCorrectFileType) {
    image.src = URL.createObjectURL(file);
  }
  form.querySelectorAll('.effects__preview').forEach((item) => {
    item.style.backgroundImage = `url(${URL.createObjectURL(file)})`;
  });
};

closeFormBtn.addEventListener('click', closeForm);
hashtagInput.addEventListener('keydown', resetCloseByEscape);
commentInput.addEventListener('keydown', resetCloseByEscape);
effectsList.addEventListener('click', onEffectsClickHandler);
form.querySelector('.img-upload__scale').addEventListener('click', onScaleBtnClick);
inputPhoto.addEventListener('change', onChooseFileBtnClick);

const validateHashtag = (value) => {
  const hashtagArr = value.toLowerCase().trim().split(/\s+/);

  return !(hashtagArr.find((item) => !regexpForHashtag.test(item))) &&
        !(hashtagArr.length > MAX_HASHTAGS) &&
        (new Set(hashtagArr).size === hashtagArr.length);
};

const getHashtagErrorMessage = () => {
  const hashtagArr = hashtagInput.value.toLowerCase().trim().split(/\s+/);

  if (hashtagArr.find((item) => !regexpForHashtag.test(item))) {
    return 'Введён невалидный хэш-тег';
  }
  if (hashtagArr.length > MAX_HASHTAGS) {
    return 'Превышено количество хэш-тегов';
  }
  if (new Set(hashtagArr).size !== hashtagArr.length) {
    return 'Хэш-теги не должны повторяться';
  }
};

pristine.addValidator(hashtagInput, validateHashtag, getHashtagErrorMessage);

const validateComment = (value) => value.length < MAX_COMMENT_LENGTH;

pristine.addValidator(commentInput, validateComment, `Длина комментария больше ${MAX_COMMENT_LENGTH} символов`);

const sendForm = () => {
  showSuccessMessage();
  closeForm();
  form.querySelector('.img-upload__submit').disabled = false;
};

form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  if (pristine.validate()) {
    const data = new FormData(form);
    form.querySelector('.img-upload__submit').disabled = true;
    sendData(sendForm, showErrorMessage, 'POST', data);
  }
});
