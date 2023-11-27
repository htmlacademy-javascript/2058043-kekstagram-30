import {renderPhotos} from './picture.js';
import './form.js';
import { getData } from './load.js';
import {showDataErrorMessage} from './util.js';

let photos = [];
const loadPhotos = (data) => {
  photos = data.slice();
  renderPhotos(photos);
};
getData(loadPhotos, showDataErrorMessage);

