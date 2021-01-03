import refs from './refs';
import photoCardTemplate from '../templates/photoCard.hbs';
import toastr from 'toastr';
import options from './toastr.options';
import 'toastr/build/toastr.min.css';
import axios from 'axios';
toastr.options = options;

const baseURL = 'https://pixabay.com/api';
const key = '19717497-dac00bc00e9230cbef98621a0';
const perPage = 12; //12 по дз(проверяем на 5 и 9,200)

export default {
  searchQuery: '',
  page: 1,

  fetchImages() {
    if (this.searchQuery === '') {
      toastr.warning('Please enter a more specific querry!', 'Warning!');
      refs.btnLoadMore.classList.add('is-hidden');
      return;
    }
    const url = `${baseURL}/?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=${perPage}&key=${key}`;
    return fetch(url)
      .then(res => res.json())
      .then(data => {
        // console.log(data); // проверитть на поиск 'asa' и 'df' (всего 10 и 6 элементов)
        const total = data.totalHits;
        data = data.hits;
        if (data.length === 0 && this.page === 1) {
          toastr.warning('Please enter a more specific querry!', 'Warning!');
          refs.btnLoadMore.classList.add('is-hidden');
          return;
        }
        if (data.length > 0) {
          refs.spinneBtn.classList.add('is-hidden');
          const markup = photoCardTemplate(data);
          refs.galleryList.insertAdjacentHTML('beforeend', markup);
          this.page += 1;
          refs.spanBtnLoadMore.classList.remove('sr-only');
          this.largeImg();
          if (
            data.length < perPage ||
            total === data.length * (this.page - 1)
          ) {
            refs.btnLoadMore.classList.add('is-hidden');
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
          return;
        }
      })
      .catch(error => {
        refs.galleryList.innerHTML = '';
        refs.btnLoadMore.classList.add('is-hidden');
        toastr.error('No connection to server!', 'Error!');
        console.log('ERROR!: ', error.message);
      });
    // .finally(data => {
    //   console.log('finally');
    // });
  },
  largeImg() {
    const largeImgRef = document.querySelector('.photo-card img');
    console.log(largeImgRef);
    // refs.largeImg.addEventListener('click', () => {
    //   console.log(refs.largeImg);
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
