import { fetchPopup } from './API/popup-api';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import sprite from '../img/sprite.svg';

const currentRecipe = document.querySelector('.current-vrapper');
const cardsGrid = document.querySelector('.cards-grid');
const popup = document.querySelector('[data-modal-popup]');
const btnOpen = document.querySelectorAll('[data-modal-popup-open]');
const btnClose = document.querySelectorAll('[data-modal-popup-close]');
const body = document.querySelector('body');

if (cardsGrid) {
  cardsGrid.addEventListener('click', popupData);
}

async function popupData(evt) {
  if (evt.target.classList.contains('button-recipes')) {
    const { id } = evt.target;
    body.style.overflow = 'hidden';

    popup.addEventListener('click', evt => {
      if (evt.target.classList.contains('close-button')) {
        popup.classList.add('is-hidden');
        body.style.overflow = '';
      }
      if (evt.target === popup) {
        popup.classList.add('is-hidden');
      }
    });
    document.addEventListener('keydown', e => {
      if (e.code == 'Escape') {
        popup.classList.add('is-hidden');
      }
    });

    try {
      const result = await fetchPopup(id);
      currentRecipe.innerHTML = createMarkupPopup(result);
      popup.classList.remove('is-hidden');
    } catch {
      Notify.failure('Oops! Something went wrong! Try reloading the page!');
    }
  }

  function createMarkupPopup(arr) {
    const roundRating = Math.round(arr.rating);

    return `<button type="button" data-modal-popup-close class="close-button">
      <svg class="close-window" width="20" height="20">
        <use href="${sprite}#cross-close-modal"></use>
      </svg>
    </button>
    <h2 class="current-recipe-name-tablet">${arr.title}</h2>
    <img
   class="current-recipe-img"
  src="${arr.thumb}"
  alt="${arr.title}"
 />
 <h2 class="current-recipe-name">${arr.title}</h2>
 <div class="current-information">
 <ul class="current-type-dish-tab">
   ${arr.tags
     .map(
       item =>
         ` <li class="current-type-item"><p class="type-item-text">#${item}</p></li>`
     )
     .join('')} 
  </ul>
  <p class="current-rating">${arr.rating}</p>
  <ul class="current-star">
     ${markupRatingStarsPop(roundRating)}
   </ul>
   <p class="current-cucing-time">${arr.time} min</p>
    </div>
    <ul class="current-ingredients-list">
  ${arr.ingredients
    .map(
      ({ measure, name }) => `<li class="current-ingredients-item border">
     <p class="current-ingredients-name">${name}</p>
     <p class="current-ingredients-quantity">${measure}</p>
  </li>
 `
    )
    .join('')} 
 </ul>
   <ul class="current-type-dish">
   ${arr.tags
     .map(
       item =>
         ` <li class="current-type-item"><p class="type-item-text">#${item}</p></li>`
     )
     .join('')} 
 </ul>
 <p class="current-recipe">
   ${arr.instructions}
 </p>
 <div class="custumer-choice">
   <a href="" class="btn btn-primary custumer-choice-text">Add to favorite</a
   ></div>
 </div>`;
  }
}

function markupRatingStarsPop(roundRating) {
  switch (roundRating) {
    case 1:
      return `<svg class="current-star-color active-star" width="14" height="14">
      <use href="./sprite.svg#rating-star"></use>
    </svg>
    <svg class="current-star-color" width="14" height="14">
      <use href="./sprite.svg#rating-star"></use>
    </svg>
    <svg class="current-star-color" width="14" height="14">
      <use href="./sprite.svg#rating-star"></use>
    </svg>
    <svg class="current-star-color" width="14" height="14">
      <use href="./sprite.svg#rating-star"></use>
    </svg>
    <svg class="current-star-color" width="14" height="14">
      <use href="./sprite.svg#rating-star"></use>
    </svg>`;
    case 2:
      return `<svg class="current-star-color active-star" width="14" height="14">
      <use href="./sprite.svg#rating-star"></use>
    </svg>
    <svg class="current-star-color active-star" width="14" height="14">
      <use href="./sprite.svg#rating-star"></use>
    </svg>
    <svg class="current-star-color" width="14" height="14">
      <use href="./sprite.svg#rating-star"></use>
    </svg>
    <svg class="current-star-color" width="14" height="14">
      <use href="./sprite.svg#rating-star"></use>
    </svg>
    <svg class="current-star-color" width="14" height="14">
      <use href="./sprite.svg#rating-star"></use>
    </svg>`;
    case 3:
      return `<svg class="current-star-color active-star" width="14" height="14">
      <use href="./sprite.svg#rating-star"></use>
    </svg>
    <svg class="current-star-color active-star" width="14" height="14">
      <use href="./sprite.svg#rating-star"></use>
    </svg>
    <svg class="current-star-color active-star" width="14" height="14">
      <use href="./sprite.svg#rating-star"></use>
    </svg>
    <svg class="current-star-color" width="14" height="14">
      <use href="./sprite.svg#rating-star"></use>
    </svg>
    <svg class="current-star-color" width="14" height="14">
      <use href="./sprite.svg#rating-star"></use>
    </svg>`;
    case 4:
      return `<svg class="current-star-color active-star" width="14" height="14">
      <use href="./sprite.svg#rating-star"></use>
    </svg>
    <svg class="current-star-color active-star" width="14" height="14">
      <use href="./sprite.svg#rating-star"></use>
    </svg>
    <svg class="current-star-color active-star" width="14" height="14">
      <use href="./sprite.svg#rating-star"></use>
    </svg>
    <svg class="current-star-color active-star" width="14" height="14">
      <use href="./sprite.svg#rating-star"></use>
    </svg>
    <svg class="current-star-color" width="14" height="14">
      <use href="./sprite.svg#rating-star"></use
    </svg>`;
    case 5:
      return `<svg class="current-star-color active-star" width="14" height="14">
      <use href="./sprite.svg#rating-star"></use>
    </svg>
    <svg class="current-star-color active-star" width="14" height="14">
      <use href="./sprite.svg#rating-star"></use>
    </svg>
    <svg class="current-star-color active-star" width="14" height="14">
      <use href="./sprite.svg#rating-star"></use>
    </svg>
    <svg class="current-star-color active-star" width="14" height="14">
      <use href="./sprite.svg#rating-star"></use>
    </svg>
    <svg class="current-star-color active-star" width="14" height="14">
      <use href="./sprite.svg#rating-star"></use
    </svg>`;
  }
}
