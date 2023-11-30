import { renderPhotos } from './picture.js';
import { getData } from './load.js';
import { showDataErrorMessage } from './util.js';
import { initFilter } from './filter.js';
import { initializeForm } from './form.js';
initializeForm();
const loadPhotos = (data) => {
  renderPhotos(data);
  initFilter(data);

};
getData(loadPhotos, showDataErrorMessage);

