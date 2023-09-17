import { fetchCards } from '../API/grid-cards-api';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const elements = {
  cards: document.querySelector('.list-recipes'),
};

try {
  const result = await fetchCards();
  //console.log(result.results);
  elements.cards.innerHTML = createMarkupGridCard(result.results);
} catch {
  Notify.failure('Oops! Something went wrong! Try reloading the page!');
}

function createMarkupGridCard(arr) {
  return arr
    .map(
      ({
        _id,
        title,
        description,
        rating,
        thumb,
      }) => `<li class="item-recipes" id="${_id}">
      <div class="wrap-recipes">
        <button type="button" class="button-favorite-recipes">
            <svg class="icon-favorite-recipes" width="22" height="22">
                <use href="./img/sprite.svg#heart-favorite"></use>
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
            <p class="rating-recipes">${rating}</p>
            <div class="wrap-stars-rating">
              <svg class="icon-rating-recipes">
                <use href="./img/sprite.svg#rating-star"></use>
              </svg>
              <svg class="icon-rating-recipes">
                <use href="./img/sprite.svg#rating-star"></use>
              </svg>
              <svg class="icon-rating-recipes">
                <use href="./img/sprite.svg#rating-star"></use>
              </svg>
              <svg class="icon-rating-recipes">
                <use href="./img/sprite.svg#rating-star"></use>
              </svg>
              <svg class="icon-rating-recipes">
                <use href="./img/sprite.svg#rating-star"></use>
              </svg>
            </div>

            <button
              type="button"
              class="btn btn-primary button-recipes"
              data-modal-popup-open
            >
              See recipe
            </button>
          </div>
        </div>
      </div>
    </li>`
    )
    .join('');
}
