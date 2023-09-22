import {
  fetchCardsWithFilters,
  fetchAreas,
  fetchIngredients,
} from './API/filters-api';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { debounce } from 'debounce';
import { createMarkupGridCard, defaultData } from './grid-card-fetch';
import SlimSelect from 'slim-select';
// import 'slim-select/dist/slimselect.css';
import { quantityBtn } from './pagination';

let currentlimit = 6;

let arrNameRecipes = [];

const elements = {
  cards: document.querySelector('.list-recipes'),
  searchInput: document.querySelector('.filter-search'),
  resetButton: document.querySelector('.js-reset-filters'),
  selectTimeButton: document.querySelector('#time-select'),
  selectAreaButton: document.querySelector('#area-select'),
  selectIngredientsButton: document.querySelector('#ingredients-select'),

  btnsPagesBox: document.querySelector('.js-btns-pages'),
};

// if (elements.searchInput) {
//   elements.searchInput.addEventListener(
//     'input',
//     debounce(getQueryNameRecipes, 700)
//   );
// }

function getQueryNameRecipes(e) {
  const inpunValue = e.target.value.trim();
  console.log(inpunValue);
  if (inpunValue === '') {
    elements.searchInput.innerHTML = '';
    elements.cards.innerHTML = defaultData(); // якщо написав і стер то вертається дефолтна розмітка
    elements.resetButton.classList.add('js-reset-filters');
    Notify.info('Your query is empty. Please try again');
    return;
  }
  console.dir(elements.resetButton);
  elements.resetButton.classList.remove('js-reset-filters');
  cardsWithFiltersData(inpunValue, currentlimit);
}

if (elements.resetButton) {
  elements.resetButton.addEventListener('click', clearSearchInput);
}

function clearSearchInput(e) {
  if (e.target) {
    elements.searchInput.value = '';
    elements.cards.innerHTML = defaultData();
    elements.resetButton.classList.add('js-reset-filters');
  }
}

async function cardsWithFiltersData(nameRecipe, currentlimit) {
  try {
    if (window.screen.width >= 768 && window.screen.width < 1200) {
      currentlimit = 8;
    } else if (window.screen.width >= 1200) {
      currentlimit = 9;
    }
    const result = await fetchCardsWithFilters(nameRecipe);

    const filterRecipes = result.filter(({ title }) =>
      title.toLowerCase().includes(nameRecipe.toLowerCase())
    );
    // console.dir(filterRecipes);

    if (filterRecipes.length === 0) {
      elements.cards.innerHTML = defaultData();
      // elements.resetButton.classList.add('js-reset-filters');
      Notify.warning('Nothing was found for your request!');
      return;
    }
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    arrNameRecipes = filterRecipes;
    // .splice(0, currentlimit)
    // console.log(Math.ceil(arrNameRecipes.length / currentlimit));

    const arrResipesOnPage = [];

    for (let i = 0; i <= Math.ceil(arrNameRecipes.length /currentlimit); i+=1){
      arrResipesOnPage.push(arrNameRecipes.splice(0, 8));
      // console.log(arrResipesOnPage);
      // console.log(arrNameRecipes);
    }; 
//     // const recipesOnPage = arrNameRecipes.splice(0, 8);
    // console.log(arrResipesOnPage);
    // console.log(filterRecipes);

   elements.btnsPagesBox.addEventListener('click',handlerBtnPage)

function handlerBtnPage(e){
  elements.cards.innerHTML = createMarkupGridCard(arrResipesOnPage[Number(e.target.textContent)-1]);
  // console.log(Number(e.target.textContent)-1);
}

    // при реалізації пагінації можна опрацювати filterRecipes після splice
    quantityBtn(arrResipesOnPage.length);
    elements.cards.innerHTML = createMarkupGridCard(arrResipesOnPage[0]);
    return arrNameRecipes.length / currentlimit;
  } catch {
    Notify.failure('Oops! Something went wrong! Try reloading the page!');
  }
}

// функція для вираховуання кількості сторінок піся інпуту
function getQuantPagesFilterName(arr, quantOnPage) {
  return arr.length / quantOnPage;
}

/*
====================
SELECT TIME
====================
*/

if (elements.selectTimeButton) {
  let selectTime = [];
  let startTime = 5;
  const step = 5;
  for (let i = 0; startTime <= 120; i++) {
    selectTime.push(startTime);
    startTime += step;
  }
  console.log(selectTime);
  elements.selectTimeButton.insertAdjacentHTML(
    'beforeend',
    createMarkupSelectTime(selectTime)
  );
  new SlimSelect({
    select: elements.selectTimeButton,
    settings: {
      showSearch: false,
    },
  });
}

function createMarkupSelectTime(arr) {
  return arr
    .map(
      time =>
        `<option class="filter-select-option" value="${time}">${time} min</option>`
    )
    .join('');
}

/*
====================
SELECT AREA
====================
*/
if (elements.selectAreaButton) {
  selectAreaData();
}

async function selectAreaData() {
  try {
    const result = await fetchAreas();
    elements.selectAreaButton.insertAdjacentHTML(
      'beforeend',
      createMarkupSelectArea(result)
    );
    new SlimSelect({
      select: elements.selectAreaButton,
      settings: {
        showSearch: false,
      },
    });
  } catch {
    Notify.failure('Oops! Filters went wrong! Try reloading the page!');
  }
}

function createMarkupSelectArea(arr) {
  return arr
    .map(
      ({ _id, name }) =>
        `<option class="filter-select-option" value=">${name}">${name}</option>`
    )
    .join('');
}

/*
====================
SELECT INGREDIENTS
====================
*/
if (elements.selectIngredientsButton) {
  selectIngredientsData();
}
async function selectIngredientsData() {
  try {
    const result = await fetchIngredients();
    elements.selectIngredientsButton.insertAdjacentHTML(
      'beforeend',
      createMarkupSelectIngredients(result)
    );
    new SlimSelect({
      select: elements.selectIngredientsButton,
      settings: {
        showSearch: false,
      },
    });
  } catch {
    Notify.failure('Oops! Filters went wrong! Try reloading the page!');
  }
}

function createMarkupSelectIngredients(arr) {
  return arr
    .map(
      ({ _id, name }) =>
        `<option class="filter-select-option" value="${name}">${name}</option>`
    )
    .join('');
}

export { getQueryNameRecipes };
