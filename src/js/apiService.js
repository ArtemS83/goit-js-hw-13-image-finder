import refs from './refs';
import photoCardTemplate from '../templates/photoCard.hbs';
import toastr from 'toastr';
import options from './toastr.options';
import 'toastr/build/toastr.min.css';
import axios from 'axios';
// require('intersection-observer');

toastr.options = options;

const baseURL = 'https://pixabay.com/api';
const key = '19717497-dac00bc00e9230cbef98621a0';
const perPage = 12; //12 по дз(проверяем на 5 и 9,200)

export default {
  searchQuery: '',
  page: 1,
  btnLoadMoreHide: false,
  fetchImages() {
    if (this.searchQuery === '') {
      toastr.warning('Please enter a more specific querry!', 'Warning!');
      refs.btnLoadMore.classList.add('is-hidden');
      return;
    }
    const url = `${baseURL}/?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=${perPage}&key=${key}`;
    return fetch(url)
      .then(res => res.json())
      .then(({ totalHits, hits }) => {
        if (hits.length === 0 && this.page === 1) {
          toastr.warning('Please enter a more specific querry!', 'Warning!');
          refs.btnLoadMore.classList.add('is-hidden');
          return;
        }
        if (hits.length > 0) {
          refs.spinneBtn.classList.add('is-hidden');
          const markup = photoCardTemplate(hits);
          refs.galleryList.insertAdjacentHTML('beforeend', markup);
          this.page += 1;
          refs.spanBtnLoadMore.classList.remove('sr-only');
          if (
            hits.length < perPage ||
            totalHits === hits.length * (this.page - 1)
          ) {
            refs.btnLoadMore.classList.add('is-hidden');
            this.btnLoadMoreHide = true;
          }

          if (this.page > 2) {
            const scrollHeight =
              document.documentElement.clientHeight +
              document.documentElement.scrollTop; //прокрутка ровно на один экран(высота дисплея+высота от начала до дисплея)
            window.scrollTo({
              // top: document.documentElement.offsetHeight, //прокрутка на всю длину документа
              top: scrollHeight,
              behavior: 'smooth', // можно убрать,подключено на html
            });
          }
          refs.footer.classList.remove('is-hidden');
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

  resetPage() {
    this.page = 1;
  },
  get query() {
    return this.searchQuery;
  },

  set query(newQuery) {
    this.searchQuery = newQuery;
  },
};
