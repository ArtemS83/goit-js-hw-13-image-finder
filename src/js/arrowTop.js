import refs from './refs';

refs.arrowTop.addEventListener('click', () => {
  window.scrollTo(pageXOffset, 0);
  // после scrollTo возникнет событие "scroll", так что стрелка автоматически скроется
});

window.addEventListener('scroll', () => {
  refs.arrowTop.hidden = pageYOffset < document.documentElement.clientHeight;
});
