import { renderPhotos } from './picture.js';
import { getRandomArrayEl, debounce } from './util.js';

const RANDOM_PHOTOS_LENGTH = 10;
const DELAY = 500;

const filterContainerElement = document.querySelector('.img-filters');
const filterElement = filterContainerElement.querySelector('.img-filters__form');
let photos = [];
const getRandomPhotos = (data) => {
  const randomPhotos = new Set();
  while (randomPhotos.size < RANDOM_PHOTOS_LENGTH) {
    randomPhotos.add(getRandomArrayEl(data));
  }
  return randomPhotos;
};
const getDiscussedPhotos = (data) => {
  const sortPhotos = data.slice().sort((first, second) => second.comments.length - first.comments.length);
  return sortPhotos;
};

const changeActiveFilterBtnClass = (evt) => {
  filterElement.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
  evt.target.classList.add('img-filters__button--active');
};

const setFilter = (cb) => {
  filterElement.addEventListener('click', (evt) => {
    let newPhotos = photos.slice();
    changeActiveFilterBtnClass(evt);
    switch (evt.target.id) {
      case 'filter-random':
        newPhotos = getRandomPhotos(photos);
        break;
      case 'filter-discussed':
        newPhotos = getDiscussedPhotos(photos);
    }
    cb(newPhotos);
  });
};
const initFilter = (data) => {
  photos = data.slice();
  filterContainerElement.classList.remove('img-filters--inactive');
  setFilter(debounce(renderPhotos, DELAY));
};
export { initFilter };
