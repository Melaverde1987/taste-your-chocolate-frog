import { fetchEvents } from './API/hero-api';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

heroData();
async function heroData() {
  try {
    const result = await fetchEvents();
    //console.log(result);
    //elements.cards.innerHTML = createMarkupEvents(result);
  } catch {
    Notify.failure('Oops! Something went wrong! Try reloading the page!');
  }

  function createMarkupEvents(arr) {
    return arr.map(({ cook }) => ``).join('');
  }
}
