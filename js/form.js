import {isEscapeKey} from './util.js';

const MAX_COMMENT_LENGTH = 140;
const MAX_HASHTAGS = 5;
const form = document.querySelector('.img-upload__form');
const inputPhoto = form.querySelector('.img-upload__input');
const formToEditPhoto = form.querySelector('.img-upload__overlay');
const closeFormBtn = form.querySelector('.img-upload__cancel');
const hashtagInput = form.querySelector('.text__hashtags');
const commentInput = form.querySelector('.text__description');
const resetCloseByEscape = (evt) => evt.stopPropagation();
hashtagInput.addEventListener('keydown', resetCloseByEscape);
commentInput.addEventListener('keydown', resetCloseByEscape);

const regexpForHashtag = /^#[\wа-яё]{1,19}$/i;

const closeForm = () => {
  formToEditPhoto.classList.add('hidden');
  document.body.classList.remove('modal-open');

  closeFormBtn.removeEventListener('click', closeForm);
  document.removeEventListener('keydown', closeFormByEscape);
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
  closeFormBtn.addEventListener('click', closeForm);
  document.addEventListener('keydown', closeFormByEscape);
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
