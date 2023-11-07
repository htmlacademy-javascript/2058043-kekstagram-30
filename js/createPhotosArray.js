import {getRandomArrayElement} from './util.js';
import {getRandomInteger} from './util.js';
import {NAMES,MESSAGES,DESCRIPTIONS} from './staticdata.js';
const getIdGenerator = () => {
  let lastIdGenerator = 0;
  return () => {
    lastIdGenerator += 1;
    return lastIdGenerator;
  };
};

const generateCommentId = getIdGenerator();
const generatePhotoId = getIdGenerator();

const createComment = () => ({
  id: generateCommentId (),
  url: `img/avatar-${ getRandomInteger (1, 6) }.svg`,
  message: getRandomArrayElement(MESSAGES),
  name: getRandomArrayElement(NAMES)
});
const createComments = () => Array.from({length: 30}, createComment);

const createPhoto = () => ({
  id: generatePhotoId (),
  avatar: `photos/ ${ getRandomInteger (1, 6) }.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomInteger (15,200),
  comments: getRandomArrayElement(createComments)
});
const createPhotos = () => Array.from({length: 25}, createPhoto);
export {createPhotos};
