import { fetchCategories } from './API/categories-api';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

categoriesData();
async function categoriesData() {
  try {
    const result = await fetchCategories();
    //console.log(result);
    //elements.cards.innerHTML = createMarkupCategories(result);
  } catch {
    Notify.failure('Oops! Something went wrong! Try reloading the page!');
  }

  function createMarkupCategories(arr) {
    return arr.map(({ description }) => ``).join('');
  }
}
