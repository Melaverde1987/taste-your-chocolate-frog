import { fetchPopup } from './API/popup-api';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const currentRecipe = document.querySelector('.current-vrapper');
const cardsGrid = document.querySelector('.cards-grid');
const popup = document.querySelector('[data-modal-popup]');
const btnOpen = document.querySelectorAll('[data-modal-popup-open]');
const btnClose = document.querySelectorAll('[data-modal-popup-close]');

cardsGrid.addEventListener('click', popupData);

//popupData();
async function popupData(evt) {
  if (evt.target.classList.contains('button-recipes')) {
    popup.classList.remove('is-hidden');

    const { id } = evt.target;
    //console.log(id);

    popup.addEventListener('click', evt => {
      if (evt.target.classList.contains('close-button')) {
        popup.classList.add('is-hidden');
      }
    });

    try {
      const result = await fetchPopup(id);
      console.log(result);
      currentRecipe.innerHTML = createMarkupPopup(result);
      // elements.cards.innerHTML = createMarkupPopup(result);
    } catch {
      Notify.failure('Oops! Something went wrong! Try reloading the page!');
    }
  }

  function createMarkupPopup(arr) {
    return `<button type="button" data-modal-popup-close class="close-button">
      <svg class="close-window" width="20" height="20">
        <use href="./img/sprite.svg#cross-close-modal"></use>
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
     <li class="current-star-color">
       <svg class="star-icon" width="18" height="18">
         <use href="./img/sprite.svg#rating-star"></use>
       </svg>
     </li>
     <li class="current-star-color">
       <svg class="star-icon" width="18" height="18">
         <use href="./img/sprite.svg#rating-star"></use>
       </svg>
     </li>
     <li class="current-star-color">
       <svg class="star-icon" width="18" height="18">
        <use href="./img/sprite.svg#rating-star"></use>
       </svg>
     </li>
     <li class="current-star-color">
       <svg class="star-icon" width="18" height="18">
         <use href="./img/sprite.svg#rating-star"></use>
       </svg>
     </li>
     <li class="current-star-color">
       <svg class="star-icon" width="18" height="18">
         <use href="./img/sprite.svg#rating-star"></use>
       </svg>
     </li>
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
   ><a href="" class="btn btn-outline custumer-choice-text">Give a rating</a></div>
 </div>`;
  }
}

const openModalBtn = document.querySelector('.btn-primary');

//console.log(openModalBtn);
