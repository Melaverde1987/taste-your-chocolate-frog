import { fetchCardsWithFilters } from './API/filters-api';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

cardsWithFiltersData();
async function cardsWithFiltersData() {
  try {
    const result = await fetchCardsWithFilters();
    console.log(result);
    //elements.cards.innerHTML = createMarkupPopular(result);
  } catch {
    Notify.failure('Oops! Something went wrong! Try reloading the page!');
  }

  function createMarkupCardsWithFilters(arr) {
    return arr.map(({ title }) => ``).join('');
  }
}
