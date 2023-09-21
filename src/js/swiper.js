import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import '../css/partials/hero-swiper.css';

const swiper = new Swiper('.swiper-hero', {
  // Optional parameters
  direction: 'horizontal',
  loop: true,
  slidesPerGroup: 1,
  modules: [Pagination],
  spaceBetween: 20,
  pagination: {
    el: '.swiper-pagination',
    clickable: false,
    type: 'bullets',
    dynamicBullets: true,
  },
  renderBullet: function (index, className) {
    return '<span class="' + className + '">' + (index + 1) + '</span>';
  },
});

export { swiper };
