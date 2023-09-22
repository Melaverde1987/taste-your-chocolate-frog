import { fetchEvents } from './API/hero-api.js';
import { swiper } from './swiper';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const elements = {
  heroCard: document.querySelector('.hero-card'),
  swiperWrapper: document.querySelector('.swiper-wrapper'),
};

//console.log(elements);

if (elements.heroCard) {
  heroData();
}

async function heroData() {
  try {
    const result = await fetchEvents();
    elements.swiperWrapper.innerHTML = createMarkupEvents(result);
  } catch {
    //console.log('err');
    Notify.failure('Oops! Something went wrong! Try reloading the page!');
  }
  // Відмальовка HTML колекції
  function createMarkupEvents(arr) {
    return arr
      .map(
        ({
          cook: { name, imgWebpUrl },
          topic: {
            name: nameTopic,
            area,
            imgWebpUrl: imgWebpUrlTopic,
            previewWebpUrl,
          },
        }) => `<div class="swiper-slide">
          <div class="swiper-item">
            <div class="chief">
              <img
                class="chief-photo"
                src="${imgWebpUrl}"
                alt="${name}"
              />
            </div>
            <div class="dish">
              <img
                class="dish-photo"
                src="${previewWebpUrl}"
                alt="dish"
              />
              <h2 class="dish-name">${nameTopic}</h2>
              <p class="dish-area">${area}</p>
            </div>
            <div class="cuisine-preview">
              <img
                class="cuisine-preview-photo"
                src="${imgWebpUrlTopic}"
                alt="Preview"
              />
            </div>
          </div>
        </div>`
      )
      .join('');
  }
}
