import { fetchEvents } from './API/hero-api';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const elements = {
  heroCard: document.querySelector('.hero-card'),
};

heroData();
async function heroData() {
  try {
    const result = await fetchEvents();
    // console.log(result);
    // console.dir(elements.heroCard);
    elements.heroCard.innerHTML = createMarkupEvents(result);
  } catch {
    // console.dir(elements.heroCard);
    Notify.failure('Oops! Something went wrong! Try reloading the page!');
  }
  // Відмальовка HTML колекції
  function createMarkupEvents(arr) {
    console.log('hello', arr);
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
        }) => `<div class="chief">
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
      < class="cuisine-preview">
        <img
          class="cuisine-preview-photo"
          src="${imgWebpUrlTopic}"
          alt="Preview"
        />`
      )
      .join('');
  }
}
