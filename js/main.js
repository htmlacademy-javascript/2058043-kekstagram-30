import { renderPhotos } from './picture.js';
import { getData } from './load.js';
import { showDataErrorMessage } from './util.js';
import { initFilter } from './filter.js';
import { setupForm } from './form.js';
setupForm();

const loadPhotos = (data) => {
  renderPhotos(data);
  initFilter(data);
};
getData(loadPhotos, showDataErrorMessage);

