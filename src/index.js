import './styles.css';
// import '~material-design-icons/iconfont/material-icons.css'; /*для npm подключения*/
console.log('Hello HW13');
import { throttle } from 'throttle-debounce';
import ImagesService from './js/apiService';
import refs from './js/refs';
import './js/arrowTop';
import './js/basicLightbox';
import axios from 'axios';
// require('intersection-observer');
refs.input.addEventListener('submit', onValueSearch);
refs.btnLoadMore.addEventListener('click', onMoreSearch);

function onValueSearch(e) {
  e.preventDefault();
  refs.galleryList.innerHTML = '';
  refs.btnLoadMore.classList.remove('is-hidden');
  ImagesService.query = e.target[0].value.trim();
  ImagesService.resetPage();
  startObserver();
  refs.footer.classList.add('is-hidden');
  onMoreSearch();
}
function onMoreSearch() {
  ImagesService.fetchImages();
  refs.spinneBtn.classList.remove('is-hidden'); //спинер на кнопке 'Load more'
  refs.spanBtnLoadMore.classList.add('sr-only');
}

//====================Intersection Observer============

// window.onload = () => {};// ждем полной загрузки страницы
const optionsOi = {
  // root: null, // родитель целевого элемента - область просмотра
  // rootMargin: '50px', // расстояние до елемента
  threshold: 0.9, // на сколько показан елемент-(на 1 не всегда срабатывал!!!!)
};

const onEntry = (entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      console.log(entry.target.textContent);
      onMoreSearch();
      if (ImagesService.btnLoadMoreHide) {
        observer.disconnect(); // отключает после первого события, когда уже не нужен
      }
    }
  });
};
const io = new IntersectionObserver(onEntry, optionsOi);

function startObserver() {
  io.observe(refs.footer);
  ImagesService.btnLoadMoreHide = false;
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
