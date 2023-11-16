import {isEscapeKey} from './util.js';
const COMMENTS_STEP = 5;
const bigPicture = document.querySelector('.big-picture');
const bigPictureImage = bigPicture.querySelector('.big-picture__img img');
const pictureCloseButton = document.querySelector('.big-picture__cancel');
const likesCount = bigPicture.querySelector('.likes-count');
const commentsList = bigPicture.querySelector('.social__comments');
const pictureCount = bigPicture.querySelector('.social__caption');
const socialTotalCount = bigPicture.querySelector('.social__comment-total-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');

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
  let currentIndex = commentsList.children.length;
  if (maxIndex >= comments.length) {
    maxIndex = comments.length;
    commentsLoader.classList.add('hidden');
  }
  while (currentIndex < maxIndex) {
    const comment = renderComment(comments[currentIndex]);
    commentsList.insertAdjacentHTML('beforeend', comment);
    currentIndex++;
  }
};
let onloadCommentsBtnClick;

const renderComments = (comments) => {
  let maxIndex = COMMENTS_STEP;

  onloadCommentsBtnClick = () => {
    renderCurrentComments(maxIndex, comments);
    bigPicture.querySelector('.social__comment-shown-count').textContent = maxIndex > comments.length ? comments.length : maxIndex;
    maxIndex += COMMENTS_STEP;
  };

  commentsList.innerHTML = '';
  commentsLoader.classList.remove('hidden');
  onloadCommentsBtnClick();
  commentsLoader.addEventListener('click', onloadCommentsBtnClick);
};


const closeFullPhoto = () => {
  bigPicture.classList.add('hidden');

  document.body.classList.remove('modal-open');

  commentsLoader.removeEventListener('click', onloadCommentsBtnClick);
  pictureCloseButton.removeEventListener('click', closeFullPhoto);
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

  pictureCloseButton.removeEventListener('click', onCloseBigPictureClick);
};

const showBigPicture = (picture) => {
  const {url,likes,comments,description} = picture;
  renderComments(comments);
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');

  bigPictureImage.src = url;
  likesCount.textContent = likes;
  pictureCount.textContent = description;
  socialTotalCount.textContent = comments.length;

  document.addEventListener('keydown', closeFullPhotoByEscape);
  pictureCloseButton.addEventListener('click', onCloseBigPictureClick);
};
export {showBigPicture};
