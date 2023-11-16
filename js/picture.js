import{showBigPicture} from './big-picture.js';
const pictures = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture')
  .content.querySelector('.picture');

const renderPhoto = (picture) => {
  const pictureElement = pictureTemplate.cloneNode(true);

  pictureElement.querySelector('.picture__img').src = picture.url;
  pictureElement.querySelector('.picture__img').alt = picture.url;
  pictureElement.querySelector('.picture__comments').textContent = picture.comments.length;
  pictureElement.querySelector('.picture__likes').textContent = picture.likes;

  const onPictureElementClick = (evt)=>{
    evt.preventDefault();
    showBigPicture(picture);
  };
  pictureElement.addEventListener('click', onPictureElementClick);
  return pictureElement;
};

const renderPhotos = (photos) => {
  const fragment = document.createDocumentFragment();
  photos.forEach((item) => {
    fragment.appendChild (renderPhoto(item));
  });

  pictures.appendChild(fragment);
};
export {renderPhotos};

