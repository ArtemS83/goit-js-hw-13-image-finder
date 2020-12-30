import photoCardTemplate from '../templates/photoCard.hbs';
// import refs from './refs';
import toastr from 'toastr';
import options from './toastr.options';
import 'toastr/build/toastr.min.css';

const refs = {
  input: document.querySelector('#search-form'),
  galleryList: document.querySelector('.gallery'),
  spinner: document.querySelector('.spinner-border'),
};
toastr.options = options;
let page = 1;
const key = '19717497-dac00bc00e9230cbef98621a0';
function fetchImages(searchQuery) {
  // searchQuery = searchQuery.trim();
  const url = `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${searchQuery}&page=${page}&per_page=12&key=${key}`;
  console.log('url', url);
  return fetch(url)
    .then(res => {
      if (res.status === 404) {
        // refs.galleryList.innerHTML = '';
        toastr.warning('Please enter a more specific querry!', 'Warning!');
        // refs.spinner.classList.remove('is-hidden');
      } else {
        return res.json();
      }
    })
    .then(data => {
      data = data.hits;
      // if (data.length > 0) {
      // refs.spinner.classList.add('is-hidden');
      const markup = photoCardTemplate(data);
      refs.galleryList.innerHTML = markup;
      // refs.galleryList.innerHTML = 'markup';
      //   return;
      // }

      // toastr.warning('Please enter a more specific querry!', 'Warning!');
      // refs.container.innerHTML = '';
      // refs.spinner.classList.add('is-hidden');
    })
    .catch(error => {
      // refs.spinner.classList.add('is-hidden');
      console.log('ERROR!: ', error.message);
    });
}
fetchImages('sky');
