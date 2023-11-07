const pictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');
const container = document.querySelector('.pictures');
const createPicture = ({url,description,comments,likes})=> {
  const createTemplate = pictureTemplate.cloneNode(true);
  createTemplate.querySelector('.picture__img').src = url;
  createTemplate.querySelector('.picture__img').alt = description;
  createTemplate.querySelector('.picture__comments').textContent = comments.length;
  createTemplate.querySelector('.picture__likes').textContent = likes;

  return createPicture;
};

const renderPictures = (pictures) =>{
  const fragment = document.createDocumentFragment();
  pictures.forEach((picture) => {
    const thumbnail = createPicture(pictures);
    fragment.append(thumbnail);
  });
  container.append(fragment);
};
export {renderPictures};
