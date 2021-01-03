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
    // console.log(this.page);
    if (this.searchQuery === '') {
      refs.galleryList.innerHTML = '';
      toastr.warning('Please enter a more specific querry!', 'Warning!');
      refs.spinner.classList.add('is-hidden');
      refs.btnLoadMore.classList.add('is-hidden');
      return;
    }

    const url = `${baseURL}/?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=${perPage}&key=${key}`;
    return fetch(url)
      .then(res => res.json())
      .then(data => {
        // console.log(data); // проверитть на поиск 'asa' и 'df' (всего 10 и 6 элементов)
        const total = data.totalHits;
        // console.log(total);
        data = data.hits;

        if (data.length === 0 && this.page === 1) {
          refs.galleryList.innerHTML = '';
          // console.log('is-hidden data=0');
          toastr.warning('Please enter a more specific querry!', 'Warning!');
          refs.spinner.classList.add('is-hidden');
          refs.btnLoadMore.classList.add('is-hidden');
          // console.log('is-hidden data=0',);
          return;
        }
        if (data.length > 0) {
          // refs.galleryList.innerHTML = '';
          refs.spinner.classList.add('is-hidden');
          const markup = photoCardTemplate(data);
          refs.galleryList.insertAdjacentHTML('beforeend', markup);
          refs.btnLoadMore.classList.remove('is-hidden');
          this.page += 1;

          if (
            data.length < perPage ||
            total === data.length * (this.page - 1)
          ) {
            // console.log('(data.length < perPage || data.length !== 0)');
            refs.btnLoadMore.classList.add('is-hidden'); //
          }
          window.scrollTo({
            top: document.documentElement.offsetHeight, //прокрутка на всю длину документа
            behavior: 'smooth',
          });

          return;
        }
      })
      .catch(error => {
        refs.spinner.classList.add('is-hidden');
        //   console.log('is-hidden catch');
        refs.galleryList.innerHTML = '';
        toastr.error('No connection to server!', 'Error!');
        console.log('ERROR!: ', error.message);
      });
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

//==============Fn bad============//

// const baseURL = 'https://pixabay.com/api';
// const key = '19717497-dac00bc00e9230cbef98621a0';
// const perPage = 9; //12 по дз
// // refs.btnLoadMore.addEventListener('click', fetchImagesPlus);
// const appFindImages = {}; // переписать на объект или класс!!!!!!!!
// // let page = 1;
// function fetchImages(searchQuery, page) {
//   // let page = 1;
//   searchQuery = searchQuery.trim();
//   console.log(page);
//   if (searchQuery === '') {
//     refs.galleryList.innerHTML = '';
//     toastr.warning('Please enter a more specific querry!', 'Warning!');
//     refs.spinner.classList.add('is-hidden');
//     refs.btnLoadMore.classList.add('is-hidden');
//     return;
//   }

//   const url = `${baseURL}/?image_type=photo&orientation=horizontal&q=${searchQuery}&page=${page}&per_page=${perPage}&key=${key}`;
//   return fetch(url)
//     .then(res => res.json())
//     .then(data => {
//       console.log(data); // проверитть на поиск 'asa' (всего 10 элементов)
//       data = data.hits;
//       if (data.length === 0) {
//         refs.galleryList.innerHTML = '';
//         // console.log('is-hidden data=0');
//         toastr.warning('Please enter a more specific querry!', 'Warning!');
//         refs.spinner.classList.add('is-hidden');
//         refs.btnLoadMore.classList.add('is-hidden');
//         // console.log('is-hidden data=0',);
//         return;
//       }
//       if (data.length > 0) {
//         // refs.galleryList.innerHTML = '';
//         refs.spinner.classList.add('is-hidden');
//         const markup = photoCardTemplate(data);
//         refs.galleryList.insertAdjacentHTML('beforeend', markup);
//         refs.btnLoadMore.classList.remove('is-hidden');
//         // page += 1; //???????????
//         // refs.btnLoadMore.addEventListener('click', () => {
//         //   console.log('click na', page);
//         //   fetchImages(searchQuery);
//         // });
//         if (data.length < perPage) {
//           refs.btnLoadMore.classList.add('is-hidden');
//         }
//         window.scrollTo({
//           top: document.documentElement.offsetHeight, //прокрутка на всю длину документа
//           behavior: 'smooth',
//         });

//         return;
//       }
//     })
//     .catch(error => {
//       refs.spinner.classList.add('is-hidden');
//       //   console.log('is-hidden catch');
//       refs.galleryList.innerHTML = '';
//       toastr.error('No connection to server!', 'Error!');
//       console.log('ERROR!: ', error.message);
//     });
// }
// // refs.btnLoadMore.textContent = 'dfghj';

// export default fetchImages;