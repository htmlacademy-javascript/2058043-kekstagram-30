import {isEscapeKey} from './util.js';
import {changeSliderOptions as onEffectsClickHandler} from './effects.js';

const MAX_COMMENT_LENGTH = 140;
const MAX_HASHTAGS = 5;
const ZOOM_CHANGE = 25;

const form = document.querySelector('.img-upload__form');
const inputPhoto = form.querySelector('.img-upload__input');
const formToEditPhoto = form.querySelector('.img-upload__overlay');
const closeFormBtn = form.querySelector('.img-upload__cancel');

const hashtagInput = form.querySelector('.text__hashtags');
const commentInput = form.querySelector('.text__description');
const scaleInput = form.querySelector('.scale__control--value');

const effectsList = form.querySelector('.effects__list');
const image = form.querySelector('.img-upload__preview img');

const resetCloseByEscape = (evt) => evt.stopPropagation();

const regexpForHashtag = /^#[\wа-яё]{1,19}$/i;

const changeScale = (evt) => {
  let newValue = parseInt(scaleInput.value, 10);
  if(evt.target.classList.contains('scale__control--smaller')) {
    newValue = newValue - ZOOM_CHANGE < ZOOM_CHANGE ? ZOOM_CHANGE : newValue - ZOOM_CHANGE;
  }
  if(evt.target.classList.contains('scale__control--bigger')) {
    newValue = newValue + ZOOM_CHANGE > 100 ? 100 : newValue + ZOOM_CHANGE;
  }
  scaleInput.value = `${newValue}%`;
  image.style.transform = `scale(${newValue === 100 ? '1' : `0.${newValue}`})`;
};

const closeForm = () => {
  formToEditPhoto.classList.add('hidden');
  document.body.classList.remove('modal-open');

  closeFormBtn.removeEventListener('click', closeForm);
  document.removeEventListener('keydown', closeFormByEscape);
  hashtagInput.removeEventListener('keydown', resetCloseByEscape);
  commentInput.removeEventListener('keydown', resetCloseByEscape);
  effectsList.removeEventListener('click', onEffectsClickHandler);
  form.querySelector('.img-upload__scale').removeEventListener('click', changeScale);

  image.style.removeProperty('transform');
  image.style.removeProperty('filter');
  form.reset();
};

function closeFormByEscape (evt) {
  if (isEscapeKey(evt)) {
    closeForm();
  }
}

const openForm = () => {
  formToEditPhoto.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.querySelector('.img-upload__effect-level').classList.add('hidden');

  closeFormBtn.addEventListener('click', closeForm);
  document.addEventListener('keydown', closeFormByEscape);
  hashtagInput.addEventListener('keydown', resetCloseByEscape);
  commentInput.addEventListener('keydown', resetCloseByEscape);
  effectsList.addEventListener('click', onEffectsClickHandler);
  form.querySelector('.img-upload__scale').addEventListener('click', changeScale);
};

inputPhoto.addEventListener('change', openForm);

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
});

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

form.addEventListener('submit', (evt) => {
  if (!pristine.validate()) {
    evt.preventDefault();
  }
});
