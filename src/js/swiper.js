import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const swiper = new Swiper('.swiper-hero', {
  // Optional parameters
  direction: 'horizontal',
  loop: true,
  slidesPerGroup: 1,
  modules: [Pagination],
  spaceBetween: 20,
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
    type: 'bullets',
    dynamicBullets: true,
  },
});

export { swiper };
