import './styles.css';
// import '~material-design-icons/iconfont/material-icons.css'; /*для npm подключения*/
console.log('Hello HW13');
import * as basicLightbox from 'basiclightbox';
import ImagesService from './js/apiService';

import refs from './js/refs';
import axios from 'axios';

refs.input.addEventListener('submit', onValueSearch);
refs.btnLoadMore.addEventListener('click', onMoreSearch);

function onValueSearch(e) {
  e.preventDefault();
  refs.galleryList.innerHTML = '';
  refs.spinner.classList.remove('is-hidden');
  ImagesService.query = e.target[0].value.trim();
  ImagesService.resetPage();
  onMoreSearch();
}
function onMoreSearch() {
  ImagesService.fetchImages();
}
//==============Fn bad============//
// import fetchImages from './js/apiService'; //для ==== Fn bad=======
// refs.input.addEventListener('submit', onValueSearch);
// let searchValue = '';
// let page;
// function onValueSearch(e) {
//   e.preventDefault();
//   refs.galleryList.innerHTML = '';
//   refs.spinner.classList.remove('is-hidden');

//   searchValue = e.target[0].value;

//   page = 1;
//   fetchImages(searchValue, page);
// }

// refs.btnLoadMore.addEventListener('click', () => {
//   console.log('click na');
//   page += 1;
//   fetchImages(searchValue, page);
// });
