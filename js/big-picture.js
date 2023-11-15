import {isEscapeKey} from './util.js';

const bigPicture = document.querySelector('.big-picture');
const bigPictureImage = bigPicture.querySelector('.big-picture__img img');
const pictureCloseButton = document.querySelector('.big-picture__cancel');
const likesCount = bigPicture.querySelector('.likes-count');
const commentsList = bigPicture.querySelector('.social__comments');
const pictureCount = bigPicture.querySelector('.social__caption');
const socialCommentCount = bigPicture.querySelector('.social__comment-shown-count');
const socialTotalCount = bigPicture.querySelector('.social__comment-total-count');

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

const renderComments = (comments) => {
  commentsList.innerHTML = '';

  comments.forEach((item) => {
    const comment = renderComment(item);
    commentsList.insertAdjacentHTML('beforeend', comment);
  });
};


const closeFullPhoto = () => {
  bigPicture.classList.add('hidden');

  document.body.classList.remove('modal-open');

  //loadBtn.removeEventListener('click', onloadCommentsBtnClick);
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
  socialCommentCount.textContent = comments.length;
  socialTotalCount.textContent = comments.length;

  document.addEventListener('keydown', closeFullPhotoByEscape);
  pictureCloseButton.addEventListener('click', onCloseBigPictureClick);
};
export {showBigPicture};
