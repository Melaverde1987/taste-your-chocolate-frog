import { fetchCategories } from './API/categories-api';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { createMarkupGridCard } from './grid-card-fetch';
import { fetchCards } from './API/grid-cards-api';

const gallery = document.querySelector('.list-recipes');

const categoryContainer = document.querySelector('.categories');
const categoriesAll = document.querySelector('.categories-list');
export const btnAllCategories = document.querySelector('.btn-all-categories');
const blokCategory = document.querySelector('.categories-block');
const btnCategory = document.querySelector('.category-btn');
const categoriesItem = document.querySelector('.categories-element');
const CATEGORIES_ENDPOINT = '/categories';

// categoriesData();
// async function categoriesData() {
//   try {
//     const result = await fetchCategories();
//     const categoriesList = createMarkupCategories(result);
//     categoriesAll.insertAdjacentHTML('beforeend', categoriesList);
//   } catch {
//     Notify.failure('Oops! Something went wrong! Try reloading the page!');
//   }

// }

function createMarkupCategories(data) {
  return data
    .map(
      item =>
        `<li class="categories-element" data-id=${item._id}>
  <button class="category-btn" type="submit">${item.name}</button>
  </li>`
    )
    .join('');
}

btnAllCategories.addEventListener('click', onAllRecipesClick);
categoriesAll.addEventListener('click', onSearchCategory);

let recipes = [];

categoriesData();
async function categoriesData() {
  try {
    const result = await fetchCategories();
    const categoriesList = createMarkupCategories(result);
    categoriesAll.insertAdjacentHTML('beforeend', categoriesList);
  } catch {
    Notify.failure('Oops! Something went wrong! Try reloading the page!');
  }
}

async function onAllRecipesClick(evt) {
  let data = await getDataArr();
  gallery.innerHTML = createMarkupGridCard(data);
}

async function onSearchCategory(e) {
  if (!e.target.classList.contains('category-btn')) {
    return;
  }
  const value = e.target.textContent;
  let data = await getDataArr();

  const recipesByCategory = data.filter(item => item.category === value);
  gallery.innerHTML = createMarkupGridCard(recipesByCategory);
}

async function getDataArr() {
  let data = [];
  if (recipes[0]) {
    data = [];
  } else {
    const res = await fetchCards(1, currentlimit);
    data = res.results;
  }
  return data;
}

let currentlimit = 0;
if (document.documentElement.clientWidth < 768) {
  currentlimit = 6;
} else if (
  document.documentElement.clientWidth >= 768 &&
  document.documentElement.clientWidth < 1280
) {
  currentlimit = 8;
} else {
  currentlimit = 9;
}
