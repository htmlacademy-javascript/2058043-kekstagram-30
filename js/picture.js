const pictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');
const container = document.querySelector('.pictures');
const createPicture = ()=>{
  const createTemplate = pictureTemplate.cloneNode(true);

  const img = createTemplate.querySelector('.picture__img');
  const likeCount = createTemplate.querySelector('.picture__likes');

  return createTemplate;
}
