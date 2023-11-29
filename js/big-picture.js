import { isEscapeKey } from './util.js';

const COMMENTS_STEP = 5;

const bigPictureElement = document.querySelector('.big-picture');
const bigPictureImage = bigPictureElement.querySelector('.big-picture__img img');
const closeBtnElement = document.querySelector('.big-picture__cancel');
const likesCountElement = bigPictureElement.querySelector('.likes-count');
const commentsListElement = bigPictureElement.querySelector('.social__comments');
const pictureCountElement = bigPictureElement.querySelector('.social__caption');
const socialTotalCount = bigPictureElement.querySelector('.social__comment-total-count');
const loadBtnElement = bigPictureElement.querySelector('.comments-loader');

const renderComment = ({avatar, name, message}) => `
  <li class="social__comment">
    <img
      class="social__picture"
      src="${avatar}"
      alt="${name}"
      width="35" height="35">
    <p class="social__text">${message}</p>
  </li>
`;
const renderCurrentComments = (maxIndex, comments) => {
  let currentIndex = commentsListElement.children.length;
  if (maxIndex >= comments.length) {
    maxIndex = comments.length;
    loadBtnElement.classList.add('hidden');
  }
  while (currentIndex < maxIndex) {
    const comment = renderComment(comments[currentIndex]);
    commentsListElement.insertAdjacentHTML('beforeend', comment);
    currentIndex++;
  }
};
let onloadCommentsBtnClick;

const renderComments = (comments) => {
  let maxIndex = COMMENTS_STEP;

  onloadCommentsBtnClick = () => {
    renderCurrentComments(maxIndex, comments);
    bigPictureElement.querySelector('.social__comment-shown-count').textContent = maxIndex > comments.length ? comments.length : maxIndex;
    maxIndex += COMMENTS_STEP;
  };

  commentsListElement.innerHTML = '';
  loadBtnElement.classList.remove('hidden');
  onloadCommentsBtnClick();
  loadBtnElement.addEventListener('click', onloadCommentsBtnClick);
};


const closeFullPhoto = () => {
  bigPictureElement.classList.add('hidden');

  document.body.classList.remove('modal-open');

  loadBtnElement.removeEventListener('click', onloadCommentsBtnClick);
  closeBtnElement.removeEventListener('click', closeFullPhoto);
  document.removeEventListener('keydown', closeFullPhotoByEscape);
};

function closeFullPhotoByEscape (evt) {

  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeFullPhoto();
  }
}


const onCloseBigPictureClick = () => {
  closeFullPhoto();

  closeBtnElement.removeEventListener('click', onCloseBigPictureClick);
};

const showBigPicture = (picture) => {
  const {url,likes,comments,description} = picture;
  renderComments(comments);
  bigPictureElement.classList.remove('hidden');
  document.body.classList.add('modal-open');

  bigPictureImage.src = url;
  likesCountElement.textContent = likes;
  pictureCountElement.textContent = description;
  socialTotalCount.textContent = comments.length;

  document.addEventListener('keydown', closeFullPhotoByEscape);
  closeBtnElement.addEventListener('click', onCloseBigPictureClick);
};
export { showBigPicture };
