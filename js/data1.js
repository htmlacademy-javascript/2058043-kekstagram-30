import {getRandomNumber, getRandomArrayElement,getRandomInteger} from './util.js';
const PHOTO_COUNT = 25;
const Comments = {
  MIN: 1,
  MAX: 30
};
const Avatars = {
  MIN: 1,
  MAX: 6
};
const Likes = {
  MIN:15,
  MAX:200,
};
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

const addComment = (index) => ({
  id: index,
  avatar: `img/avatar-${getRandomNumber(Avatars.MIN, Avatars.MAX)}.svg`,
  message: getRandomArrayElement(MESSAGES),
  name: getRandomArrayElement(NAMES),
});

const addComments = (index) => {
  const commentsArr = [];
  for (let i = 0; i < index; i++) {
    commentsArr.push(addComment(i));
  }
  return commentsArr;
};


const addPhoto = (index) => ({
  id:index,
  url:`photos/${ index + 1 }.jpg`,
  description:getRandomArrayElement(DESCRIPTIONS),
  likes:getRandomInteger(Likes.MIN,Likes.MAX),
  comments: addComments(getRandomNumber(Comments.MIN, Comments.MAX))
});
const generatedPhotos = [];

const addPhotos = () => {
  for (let i = 0; i < PHOTO_COUNT; i++) {
    generatedPhotos.push(addPhoto(i));
  }
  return generatedPhotos;
};
const photos = addPhotos();
export {photos};
