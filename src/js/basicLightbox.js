import * as basicLightbox from 'basiclightbox';
import refs from './refs';

refs.galleryList.addEventListener('click', handlerClickImages);

function handlerClickImages(event) {
  event.preventDefault();
  if (event.target.nodeName !== 'IMG') {
    return;
  }
  const imagesOriginal = event.target;
  setImageOnModal(imagesOriginal);
}

function setImageOnModal(image) {
  const instance = basicLightbox.create(`
    <img src="${image.dataset.source}" alt="${image.alt}" width='860'>
`);
  instance.show();
}
