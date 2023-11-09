import {getRandomNumber, chooseAIdentificator} from './util.js';

const chooseAMessage = () => {
  const i = getRandomNumber(0, 5);
  const string = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
  ];

  return string[i];
};

const chooseAName = () => {
  const choice = getRandomNumber(0, 5);
  const names = ['Александр', 'Андрей', 'Ольга', 'Диана', 'Петр', 'Ксения'];

  return names[choice];
};

const generateComment = () => ({
  id: chooseAIdentificator(),
  avatar: `img/avatar-${getRandomNumber(1, 6)}.svg`,
  message: chooseAMessage(),
  name: chooseAName()
});

export {generateComment};
