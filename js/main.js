const NAMES = [
  'Анна',
  'Андрей',
  'Джоана',
  'Педро',
  'Олег',
  'Санта',
  'Юлия',
  'Евгения',
];
const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
const DESCRIPTIONS = [
  'Мне нравятся слухи. Я так много узнала о себе, чего до этого даже не знала.',
  'Здравый смысл подобен дезодоранту. Люди, которым это нужно больше всего, никогда им не пользуются!',
  'Я не могу убрать свою комнату, потому что меня отвлекают интересные вещи, которые я нахожу!',
  'Откладывать отпуск в ожидании — это дурной тон.',
  'Оставайся сильным, скоро выходные!',
  'Я не всегда учусь, но когда учусь, то не учусь.',
  'Каждой красавице нужно ее чудовище.',
  '75% моего юмора начинается с плохой фотографии.',
  'Лучшая свадьба — та, на которой ваши желудки полны.'
];
function getRandomInteger(a, b) {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}
const getRandomArrayElement = (elements) =>
  elements[getRandomInteger(0, elements.length - 1)];


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
createComments();
const createPhoto = () => ({
  id: generatePhotoId (),
  url: `photos/ ${ getRandomInteger (1, 6) }.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomInteger (15,200),});
const createPhotos = () => Array.from({length: 25}, (_, pictureIndex) => createPhoto(pictureIndex + 1),);

import {renderPictures} from './picture.js';
renderPictures(createPhotos());


