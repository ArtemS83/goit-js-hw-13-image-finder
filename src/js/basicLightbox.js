import * as basicLightbox from 'basiclightbox';
import refs from './refs';
// console.log(refs.largeImg);
// refs.largeImg.addEventListener('click', () => {
//   console.log(refs.largeImg);
// });
const instance = basicLightbox.create(`
    <img src="" alt="" >
`);

instance.show();
// function setImageOnModal(image) {
//   lightboxImageRef.src = image.dataset.source;
//   lightboxImageRef.alt = image.alt;
// }
