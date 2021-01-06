// import ImagesService from './apiService';
import refs from './refs';
import onMoreSearch from '../index';
//====================Intersection Observer============//

const optionsOi = {
  rootMargin: '-92px', // - со всех сторон вьюпорта
  threshold: 1, //
};

const onEntry = (entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      onMoreSearch();
    }
  });
};

const io = new IntersectionObserver(onEntry, optionsOi);

export default function startIntersectionObserver() {
  io.observe(refs.spanBtnLoadMore);
}
