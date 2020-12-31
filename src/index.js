import './styles.css';
// import '~material-design-icons/iconfont/material-icons.css'; /*для npm подключения*/
console.log('Hello HW13');
import * as basicLightbox from 'basiclightbox';
import fetchImages from './js/apiService';

// import debounce from 'lodash.debounce';
import refs from './js/refs';
import axios from 'axios';

refs.input.addEventListener('submit', onValueSearch);

function onValueSearch(e) {
  e.preventDefault();
  refs.spinner.classList.remove('is-hidden');
  const value = e.target[0].value;
  //   console.log('value', value);
  fetchImages(value);
}
