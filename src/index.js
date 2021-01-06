import './styles.css';
console.log('Hello HW13');
// import { throttle } from 'throttle-debounce';
import refs from './js/refs';
import ImagesService from './js/apiService';
// import startIntersectionObserver from './js/IntersectionObserver';
import './js/arrowTop';
import './js/basicLightbox';
// import axios from 'axios';

refs.input.addEventListener('submit', onValueSearch);
refs.btnLoadMore.addEventListener('click', onMoreSearch);

function onValueSearch(e) {
  e.preventDefault();
  refs.galleryList.innerHTML = '';
  refs.btnLoadMore.classList.remove('is-hidden');
  ImagesService.query = e.target[0].value.trim();
  ImagesService.resetPage();
  refs.paginationContainer.classList.add('is-hidden');
  onMoreSearch();
}
export default function onMoreSearch() {
  ImagesService.ScrollTo = true;
  ImagesService.fetchImages();
  refs.footer.classList.add('is-hidden');
}

//========throttle======

// window.addEventListener(
//   'scroll',
//   throttle(1000, () => {
//     console.log('Scroll event: throttle');
//   }),
// );

// window.addEventListener('scroll', throttle(1000, fnTrottle));

// function fnTrottle() {
//   console.log('Scroll FN throttle');
// }
