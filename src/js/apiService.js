import refs from './refs';
import photoCardTemplate from '../templates/photoCard.hbs';

import toastr from 'toastr';
import options from './toastr.options';
import 'toastr/build/toastr.min.css';
import axios from 'axios';

toastr.options = options;
const baseURL = 'https://pixabay.com/api';
const key = '19717497-dac00bc00e9230cbef98621a0';

let page = 1;

function fetchImages(searchQuery) {
  searchQuery = searchQuery.trim();
  if (searchQuery === '') {
    refs.galleryList.innerHTML = '';
    toastr.warning('Please enter a more specific querry!', 'Warning!');
    refs.spinner.classList.add('is-hidden');
    refs.btnLoadMore.classList.add('is-hidden');
    return;
  }
  const url = `${baseURL}/?image_type=photo&orientation=horizontal&q=${searchQuery}&page=${page}&per_page=12&key=${key}`;
  return fetch(url)
    .then(res => res.json())
    .then(data => {
      console.log(data); // проверитть на поиск 'df' (всего 6 элементов)
      data = data.hits;
      if (data.length === 0) {
        refs.galleryList.innerHTML = '';
        // console.log('is-hidden data=0');
        toastr.warning('Please enter a more specific querry!', 'Warning!');
        refs.spinner.classList.add('is-hidden');
        refs.btnLoadMore.classList.add('is-hidden');
        // console.log('is-hidden data=0');
        return;
      }
      if (data.length > 0) {
        // refs.galleryList.innerHTML = '';
        refs.spinner.classList.add('is-hidden');
        const markup = photoCardTemplate(data);
        refs.galleryList.insertAdjacentHTML('beforeend', markup);
        refs.btnLoadMore.classList.remove('is-hidden');
        page += 1; //???????????
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
}
export default fetchImages;
