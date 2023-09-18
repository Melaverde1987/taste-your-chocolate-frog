import { fetchPopup } from './API/popup-api';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const currentRecipe = document.querySelector('.current-vrapper');

popupData();
async function popupData() {
  try {
    const result = await fetchPopup();
    currentRecipe.innerHTML = createMarkupPopup(result);
    // elements.cards.innerHTML = createMarkupPopup(result);
  } catch {
    Notify.failure('Oops! Something went wrong! Try reloading the page!');
  }

  function createMarkupPopup(arr) {
    return arr
      .map(
        ({
          title,
          youtube,
          tags,
          instructions,
          rating,
          ingredients,
        }) => `<div class="popup is-hidden" data-modal-popup>
  <div class="container current-vrapper">
    <button type="button" data-modal-popup-close class="close-button">
      <svg class="close-window" width="20" height="20">
        <use href="./img/sprite.svg#cross-close-modal"></use>
      </svg>
    </button>
    <h2 class="current-recipe-name-tablet">${title}</h2>
    <img
      class="current-recipe-img"
      src="./img/pop-up/pop-up-recept-tab.jpg"
      alt="${title}"
    />
    <h2 class="current-recipe-name">${title}</h2>
    <div class="current-information">
      <ul class="current-type-dish-tab">
        <li class="current-type-item">
          <p class="type-item-text">${tags}</p>
        </li>
        <li class="current-type-item"><p class="type-item-text">${tags}</p></li>
        <li class="current-type-item"><p class="type-item-text">${tags}</p></li>
      </ul>
      <p class="current-rating">${rating}</p>
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
      <p class="current-cucing-time">40 min</p>
    </div>
    <ul class="current-ingredients-list">
      <li class="current-ingredients-item border">
        <p class="current-ingredients-name">${ingredients[0].name}</p>
        <p class="current-ingredients-quantity">${ingredients[0].measure}</p>
      </li>

      <li class="current-ingredients-item border">
        <p class="current-ingredients-name">${ingredients[1].name}</p>
        <p class="current-ingredients-quantity">${ingredients[1].measure}</p>
      </li>
      <li class="current-ingredients-item border">
        <p class="current-ingredients-name"></p>
        <p class="current-ingredients-quantity">1 large</p>
      </li>
      <li class="current-ingredients-item border">
        <p class="current-ingredients-name">${ingredients[2].name}</p>
        <p class="current-ingredients-quantity">${ingredients[2].measure}</p>
      </li>
      <li class="current-ingredients-item border">
        <p class="current-ingredients-name">${ingredients[3].name}</p>
        <p class="current-ingredients-quantity">${ingredients[3].measure}</p>
      </li>
      <li class="current-ingredients-item border">
        <p class="current-ingredients-name">${ingredients[4].name}</p>
        <p class="current-ingredients-quantity">${ingredients[4].measure}</p>
      </li>
    </ul>
    <ul class="current-type-dish">
      <li class="current-type-item">
        <p class="type-item-text">${tags}</p>
      </li>
      <li class="current-type-item"><p class="type-item-text">${tags}</p></li>
      <li class="current-type-item"><p class="type-item-text">${tags}</p></li>
    </ul>
    <p class="current-recipe">
      ${instructions}
    </p>
    <div class="custumer-choice">
      <a href="" class="btn btn-primary custumer-choice-text">Add to favorite</a
      ><a href="" class="btn btn-outline custumer-choice-text">Give a rating</a>
    </div>
  </div>
</div>
`
      )
      .join('');
  }
}
