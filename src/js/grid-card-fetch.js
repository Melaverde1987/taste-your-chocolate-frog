import { fetchCards } from './API/grid-cards-api';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const elements = {
  cards: document.querySelector('.list-recipes'),
};

let currentlimit = 6;

setCardsLimit();

function setCardsLimit() {
  if (window.screen.width >= 768 && window.screen.width < 1200) {
    currentlimit = 8;
    defaultData();
  } else if (window.screen.width >= 1200) {
    currentlimit = 9;
    defaultData();
  }
  setCardsLimitResizer();
}

function setCardsLimitResizer() {
  window.addEventListener('resize', function () {
    if (window.screen.width >= 768 && window.screen.width < 1200) {
      currentlimit = 8;
      defaultData();
    } else if (window.screen.width >= 1200) {
      currentlimit = 9;
      defaultData();
    } else {
      currentlimit = 6;
      defaultData();
    }
  });
}

async function defaultData() {
  try {
    const result = await fetchCards(currentlimit);
    // console.log(result.results);
    elements.cards.innerHTML = createMarkupGridCard(result.results);
  } catch {
    Notify.failure('Oops! Something went wrong! Try reloading the page!');
  }
}

function createMarkupGridCard(arr) {
  return arr
    .map(({ _id, title, description, rating, thumb }) => {
      const roundRating = Math.round(rating);
       const ratingNumber = rating.toFixed(1);       
         return `<li class="item-recipes">
            <div class="wrap-recipes">
              <button type="button" class="button-favorite-recipes" name="${_id}">
                  <svg class="icon-favorite-recipes" width="22" height="22">
                    <use href="./sprite.svg#heart-favorite"></use>
                  </svg>
              </button>
              <img
                class="img-recipes"
                src="${thumb}"
                alt="${title}"
                width="335"
                height="335"
              />
              <div class="thumb-desc-recipes">
                <h3 class="title-recipes">${title}</h3>
                <p class="description-recipes">${description}</p>
                <div class="thumb-btn-rating">
                  <p class="rating-recipes">${ratingNumber}</p>
                  <div class="wrap-stars-rating">
                    ${markupRatingStars(roundRating)}
                  </div>        
                  <button
                    type="button"
                    class="btn btn-primary button-recipes"
                    data-modal-popup-open
                    id="${_id}"
                  >
                    See recipe
                  </button>
                </div>
              </div>
            </div>
          </li>`;
      
    })
    .join('');
}



function markupRatingStars(roundRating){
  switch(roundRating){
    case 1:
      return `<svg class="icon-rating-recipes star">
      <use href="./sprite.svg#rating-star"></use>
    </svg>
    <svg class="icon-rating-recipes">
      <use href="./sprite.svg#rating-star"></use>
    </svg>
    <svg class="icon-rating-recipes">
      <use href="./sprite.svg#rating-star"></use>
    </svg>
    <svg class="icon-rating-recipes">
      <use href="./sprite.svg#rating-star"></use>
    </svg>
    <svg class="icon-rating-recipes">
      <use href="./sprite.svg#rating-star"></use>
    </svg>`;
    case 2:
      return `<svg class="icon-rating-recipes star">
      <use href="./sprite.svg#rating-star"></use>
    </svg>
    <svg class="icon-rating-recipes star">
      <use href="./sprite.svg#rating-star"></use>
    </svg>
    <svg class="icon-rating-recipes">
      <use href="./sprite.svg#rating-star"></use>
    </svg>
    <svg class="icon-rating-recipes">
      <use href="./sprite.svg#rating-star"></use>
    </svg>
    <svg class="icon-rating-recipes">
      <use href="./sprite.svg#rating-star"></use>
    </svg>`;
    case 3:
      return `<svg class="icon-rating-recipes star">
      <use href="./sprite.svg#rating-star"></use>
    </svg>
    <svg class="icon-rating-recipes star">
      <use href="./sprite.svg#rating-star"></use>
    </svg>
    <svg class="icon-rating-recipes star">
      <use href="./sprite.svg#rating-star"></use>
    </svg>
    <svg class="icon-rating-recipes">
      <use href="./sprite.svg#rating-star"></use>
    </svg>
    <svg class="icon-rating-recipes">
      <use href="./sprite.svg#rating-star"></use>
    </svg>`;
    case 4:
      return `<svg class="icon-rating-recipes star">
      <use href="./sprite.svg#rating-star"></use>
    </svg>
    <svg class="icon-rating-recipes star">
      <use href="./sprite.svg#rating-star"></use>
    </svg>
    <svg class="icon-rating-recipes star">
      <use href="./sprite.svg#rating-star"></use>
    </svg>
    <svg class="icon-rating-recipes star">
      <use href="./sprite.svg#rating-star"></use>
    </svg>
    <svg class="icon-rating-recipes">
      <use href="./sprite.svg#rating-star"></use>
    </svg>`;
    case 5:
      return `<svg class="icon-rating-recipes star">
      <use href="./sprite.svg#rating-star"></use>
    </svg>
    <svg class="icon-rating-recipes star">
      <use href="./sprite.svg#rating-star"></use>
    </svg>
    <svg class="icon-rating-recipes star">
      <use href="./sprite.svg#rating-star"></use>
    </svg>
    <svg class="icon-rating-recipes star">
      <use href="./sprite.svg#rating-star"></use>
    </svg>
    <svg class="icon-rating-recipes star">
      <use href="./sprite.svg#rating-star"></use>
    </svg>`;
    default:
      return `<svg class="icon-rating-recipes star">
      <use href="./sprite.svg#rating-star"></use>
    </svg>
    <svg class="icon-rating-recipes">
      <use href="./sprite.svg#rating-star"></use>
    </svg>
    <svg class="icon-rating-recipes">
      <use href="./sprite.svg#rating-star"></use>
    </svg>
    <svg class="icon-rating-recipes">
      <use href="./sprite.svg#rating-star"></use>
    </svg>
    <svg class="icon-rating-recipes">
      <use href="./sprite.svg#rating-star"></use>
    </svg>`;
  }
};



export {
  createMarkupGridCard,
  setCardsLimit,
  setCardsLimitResizer,
  defaultData,
};
