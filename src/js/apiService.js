import refs from './refs';
import photoCardTemplate from '../templates/photoCard.hbs';
import toastr from 'toastr';
import options from './toastr.options';
import 'toastr/build/toastr.min.css';
// import axios from 'axios';
import startIntersectionObserver from './IntersectionObserver';
import Pagination from './pagination';

toastr.options = options;

const baseURL = 'https://pixabay.com/api';
const key = '19717497-dac00bc00e9230cbef98621a0';
const perPage = 12; //12 по дз(проверяем на 6 и 9,200)//df,asa,fa

export default {
  searchQuery: '',
  page: 1,
  ScrollTo: true,

  fetchImages() {
    refs.footer.classList.add('is-hidden');
    refs.btnLoadMore.classList.remove('is-hidden');
    refs.spinneBtn.classList.remove('is-hidden');
    refs.spanBtnLoadMore.classList.add('sr-only');

    if (this.searchQuery === '') {
      toastr.warning('Please enter a more specific querry!', 'Warning!');
      refs.btnLoadMore.classList.add('is-hidden');
      return;
    }
    const url = `${baseURL}/?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=${perPage}&key=${key}`;
    fetch(url)
      .then(res => res.json())
      .then(({ totalHits, hits }) => {
        if (hits.length === 0 && this.page === 1) {
          toastr.warning('Please enter a more specific querry!', 'Warning!');
          refs.btnLoadMore.classList.add('is-hidden');
          return;
        }
        if (hits.length > 0) {
          refs.paginationContainer.classList.remove('is-hidden');
          refs.spinneBtn.classList.add('is-hidden');
          const markup = photoCardTemplate(hits);
          refs.galleryList.insertAdjacentHTML('beforeend', markup);

          const pagPage = Math.ceil(totalHits / perPage);
          Pagination(pagPage, this.page);

          refs.spanBtnLoadMore.classList.remove('sr-only');

          if (
            hits.length < perPage ||
            totalHits === hits.length * (this.page - 1) ||
            pagPage === this.page
          ) {
            refs.btnLoadMore.classList.add('is-hidden');
          } else {
            refs.btnLoadMore.classList.remove('is-hidden');
          }

          //            //window.scrollTo//
          if (this.ScrollTo) {
            this.startScrollTo();
          } else {
            this.startScrollTo(1);
          }

          this.page += 1;
          refs.footer.classList.remove('is-hidden');
          startIntersectionObserver();
          return;
        }
      })
      .catch(error => {
        refs.galleryList.innerHTML = '';
        refs.btnLoadMore.classList.add('is-hidden');
        toastr.error('No connection to server!', 'Error!');
        console.log('ERROR!: ', error.message);
        refs.footer.classList.add('is-hidden');
      });
    // .finally(data => {
    //   console.log('finally');
    // });
  },
  startScrollTo(value = 0) {
    if (this.page > 1 && !value) {
      const scrollHeight =
        document.documentElement.clientHeight +
        document.documentElement.scrollTop -
        150; //прокрутка ровно на один экран(высота дисплея+высота от начала до дисплея-разница на футер)
      window.scrollTo({
        // top: document.documentElement.offsetHeight, //прокрутка на всю длину документа
        top: scrollHeight,
        behavior: 'smooth', // можно убрать,подключено на html
      });
    }
  },
  resetPage() {
    this.page = 1;
  },
  initPage(page) {
    this.page = page;
  },
  get query() {
    return this.searchQuery;
  },

  set query(newQuery) {
    this.searchQuery = newQuery;
  },
};
