const slider = document.querySelector('.effect-level__slider');
const image = document.querySelector('.img-upload__preview img');
const effectInput = document.querySelector('.effect-level__value');

const Effects = {
  CHROME: 'chrome',
  SEPIA: 'sepia',
  MARVIN: 'marvin',
  PHOBOS: 'phobos',
  HEAT: 'heat',
  DEFAULT: 'none',
};

const nameEffectForFilter = {
  [Effects.CHROME]: {
    style: 'grayscale',
    unit: '',
  },
  [Effects.SEPIA]: {
    style: 'sepia',
    unit: '',
  },
  [Effects.MARVIN]: {
    style: 'invert',
    unit: '%',
  },
  [Effects.PHOBOS]: {
    style: 'blur',
    unit: 'px',
  },
  [Effects.HEAT]: {
    style: 'brightness',
    unit: '',
  },
  [Effects.DEFAULT]: {
    style: 'none',
    unit: '',
  },
};

const sliderOptions = {
  [Effects.CHROME]: {
    min: 0,
    max: 1,
    step: 0.1
  },
  [Effects.SEPIA]: {
    min: 0,
    max: 1,
    step: 0.1
  },
  [Effects.MARVIN]: {
    min: 0,
    max: 100,
    step: 1
  },
  [Effects.PHOBOS]: {
    min: 0,
    max: 3,
    step: 0.1
  },
  [Effects.HEAT]: {
    min: 1,
    max: 3,
    step: 0.1
  },
  [Effects.DEFAULT]: {
    min: 0,
    max: 100,
    step: 1
  },
};

let effectName = Effects.DEFAULT;

noUiSlider.create(slider, {
  range: {
    min: sliderOptions[effectName].min,
    max: sliderOptions[effectName].max
  },
  start: sliderOptions[effectName].max,
  step: sliderOptions[effectName].step,
  connect: 'lower',
  format: {
    to: (value) => Number(value),
    from: (value) => Number(value)
  }
});

slider.noUiSlider.on('update', () => {
  const value = slider.noUiSlider.get();
  const {style, unit} = nameEffectForFilter[effectName];
  effectInput.value = value;
  image.style.filter = `${style}(${value}${unit})`;
});

const getUpdateOptions = ({min, max, step}) => ({
  range: {
    min,
    max
  },
  start: max,
  step,
});

const changeSliderOptions = (evt) => {
  if (evt.target.closest('input')) {
    effectName = evt.target.value;
    slider.noUiSlider.updateOptions(getUpdateOptions(sliderOptions[effectName]));
    if (effectName === Effects.DEFAULT) {
      slider.parentNode.classList.add('hidden');
      image.style.removeProperty('filter');
      return;
    }
    slider.parentNode.classList.remove('hidden');
  }
};

export {changeSliderOptions};
