import { fetchCategories } from './API/categories-api';
import { Notify } from 'notiflix/build/notiflix-notify-aio';


const categoryContainer = document.querySelector('.categories');
const categoriesAll = document.querySelector('.categories-list');
export const allCategories = document.querySelector('.btn-all-categories');
const blokCategory = document.querySelector('.categories-block');
const btnCategory = document.querySelector('.category-btn');
const categoriesItem = document.querySelector('.categories-element')
const CATEGORIES_ENDPOINT = '/categories';



categoriesData();
async function categoriesData() {
  try {
    const result = await fetchCategories();
    const categoriesList = createMarkupCategories(result);
    categoriesAll.insertAdjacentHTML('beforeend', categoriesList);
    //console.log(result);
    //elements.cards.innerHTML = createMarkupCategories(result);
  } catch {
    Notify.failure('Oops! Something went wrong! Try reloading the page!');
  }

  function createMarkupCategories(arr) {
    return arr.map(({ _id, name  }) => 
    `<li class="categories-element" data-id=${_id}>
    <button class="category-btn">${name}</button>
    </li>`
    ).join('');
    
  }
}

