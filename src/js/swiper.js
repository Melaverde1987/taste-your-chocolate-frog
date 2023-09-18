import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
// import 'swiper/css';

const swiper = new Swiper('.swiper-hero', {
  // Optional parameters
  direction: 'horizontal',
  loop: true,
  slideRole: 'group',
  slidesPerGroup: 1,
  // slidesPerView: 3,

  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
    type: 'bullets',
  },

  // // Navigation arrows
  // navigation: {
  //   nextEl: '.swiper-button-next',
  //   prevEl: '.swiper-button-prev',
  // },

  // // And if we need scrollbar
  // scrollbar: {
  //   el: '.swiper-scrollbar',
  // },
});

export { swiper };
