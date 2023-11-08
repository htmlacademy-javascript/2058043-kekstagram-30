import {describePhotos} from './main.js';

const createPhoto = () => {
  const fragment = new DocumentFragment();

  for (const photo of describePhotos(25)) {
    //шаблон картинки
    const picture = document.querySelector('#picture').content.cloneNode(true);

    //тэг img
    const img = picture.querySelector('.picture__img');
    img.src = photo.url;
    img.alt = photo.description;

    const likeCount = picture.querySelector('.picture__likes');
    likeCount.textContent = photo.likes;

    const commentCount = picture.querySelector('.picture__comments');
    commentCount.textContent = photo.comments.length;

    fragment.append(picture);
  }

  return fragment;
};

window.onload = function() {
  const fragment = createPhoto();
  const picture = document.querySelector('.pictures');
  picture.append(fragment);
};
