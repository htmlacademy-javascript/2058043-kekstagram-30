import {getRandomNumber} from './util.js';
import {generateComment} from './generate-comment.js';

const getDescPhoto = (index) => ({
  id: index,
  url: `photos/${index}.jpg`,
  description: 'любое описание',
  likes: getRandomNumber(15, 200),
  comments: Array.from({length: getRandomNumber(0, 30)}, generateComment)
});

//массив со всеми объектами
const describePhotos = (count) => Array(count).fill(null).map((_, index) => getDescPhoto(index + 1));

export {describePhotos};
