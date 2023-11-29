import{ showBigPicture } from './big-picture.js';
const picturesElement = document.querySelector('.pictures');
const pictureTemplateElement = document.querySelector('#picture')
  .content.querySelector('.picture');

const renderPhoto = (picture) => {
  const pictureElement = pictureTemplateElement.cloneNode(true);

  pictureElement.querySelector('.picture__img').src = picture.url;
  pictureElement.querySelector('.picture__img').alt = picture.description;
  pictureElement.querySelector('.picture__comments').textContent = picture.comments.length;
  pictureElement.querySelector('.picture__likes').textContent = picture.likes;

  const onPictureElementClick = (evt)=>{
    evt.preventDefault();
    showBigPicture(picture);
  };
  pictureElement.addEventListener('click', onPictureElementClick);
  return pictureElement;
};
const clearPicturesContainer = () => {
  if (picturesElement.querySelectorAll('a.picture')) {
    picturesElement.querySelectorAll('a.picture').forEach((item) => item.remove());
  }
};
const renderPhotos = (photos) => {
  clearPicturesContainer();
  const fragment = document.createDocumentFragment();
  photos.forEach((item) => {
    fragment.appendChild (renderPhoto(item));
  });

  picturesElement.appendChild(fragment);
};
export { renderPhotos };
