import { fetchPopular } from './API/popular-recipes-api';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

popularData();
async function popularData() {
  try {
    const result = await fetchPopular();
    //console.log(result);
    //elements.cards.innerHTML = createMarkupPopular(result);
  } catch {
    Notify.failure('Oops! Something went wrong! Try reloading the page!');
  }

  function createMarkupPopular(arr) {
    return arr.map(({ description }) => ``).join('');
  }
}
