import { renderPhotos } from './picture.js';
import { getData } from './load.js';
import { showDataErrorMessage } from './util.js';
import { initFilter } from './filter.js';
import { initializeForm } from './form.js';

const loadPhotos = (data) => {
  renderPhotos(data);
  initFilter(data);
  initializeForm(data);
};
getData(loadPhotos, showDataErrorMessage);

