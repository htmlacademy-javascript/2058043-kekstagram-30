const Zoom = {
  MIN: 25,
  MAX: 100,
  STEP: 25
};

const scaleInput = document.querySelector('.scale__control--value');

const changeScale = (factor = 1) => {
  let newValue = parseInt(scaleInput.value, 10);
  newValue = newValue + Zoom.STEP * factor;
  if (newValue > Zoom.MAX) {
    newValue = Zoom.MAX;
  }
  if (newValue < Zoom.MIN) {
    newValue = Zoom.MIN;
  }
  scaleInput.value = `${newValue}%`;
  document.querySelector('.img-upload__preview img').style.transform = `scale(${newValue / 100})`;
};

const onScaleBtnClick = (evt) => {
  if(evt.target.classList.contains('scale__control--smaller')) {
    changeScale(-1);
  }
  if(evt.target.classList.contains('scale__control--bigger')) {
    changeScale();
  }
};

export {onScaleBtnClick};
