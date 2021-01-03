import './styles.css';
// import '~material-design-icons/iconfont/material-icons.css'; /*для npm подключения*/
console.log('Hello HW13');

import ImagesService from './js/apiService';
import refs from './js/refs';
import './js/arrowTop';
import './js/basicLightbox';
import axios from 'axios';

refs.input.addEventListener('submit', onValueSearch);
refs.btnLoadMore.addEventListener('click', onMoreSearch);

function onValueSearch(e) {
  e.preventDefault();
  refs.galleryList.innerHTML = '';
  refs.btnLoadMore.classList.remove('is-hidden');
  ImagesService.query = e.target[0].value.trim();
  ImagesService.resetPage();
  onMoreSearch();
}
function onMoreSearch() {
  ImagesService.fetchImages();
  refs.spinneBtn.classList.remove('is-hidden'); //спинер на кнопке 'Load more'
  refs.spanBtnLoadMore.classList.add('sr-only');
}
