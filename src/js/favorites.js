// Добавляем обработчик события для каждой карточки
const favoriteButtons = document.querySelectorAll('.button-favorite-recipes');

favoriteButtons.forEach(button => {
  button.addEventListener('click', addToFavorites);
});

function addToFavorites(event) {
  // Получаем родительский элемент карточки
  const card = event.target.closest('.item-recipes');

  // Извлекаем данные из карточки
  const title = card.querySelector('.title-recipes').textContent;
  const description = card.querySelector('.description-recipes').textContent;
  const rating = card.querySelector('.rating-recipes').textContent;
  const thumb = card.querySelector('.img-recipes').src;
  const id = event.target.getAttribute('name'); // Получаем атрибут name

  // Создаем объект, представляющий данную карточку
  const favoriteRecipe = {
    title,
    description,
    rating,
    thumb,
    id,
  };

  // Получаем текущий список карточек из Local Storage
  const storedFavorites =
    JSON.parse(localStorage.getItem('favoriteRecipes')) || [];

  // Добавляем новую карточку в список
  storedFavorites.push(favoriteRecipe);

  // Обновляем список карточек в Local Storage
  localStorage.setItem('favoriteRecipes', JSON.stringify(storedFavorites));

    // Перерисовываем карточки уже на странице Favorites
    
  renderFavoriteRecipes();
}
// Функция для отрисовки карточек из Local Storage
function renderFavoriteRecipes() {
  const favoritesContainer = document.getElementById('favorites-container');

  // Получаем текущий список карточек из Local Storage
  const storedFavorites =
        JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    
    console.log(storedFavorites);

  // Отрисовываем каждую карточку
  storedFavorites.forEach(recipe => {
    const cardHTML = createCardHTML(recipe);
    favoritesContainer.innerHTML += cardHTML;
  });
}

// Функция для создания HTML-разметки карточки
function createCardHTML(recipe) {
  return `
    <li class="item-recipes">
      <div class="wrap-recipes">
        <button type="button" class="button-favorite-recipes" name="${recipe.id}">
          <svg class="icon-favorite-recipes" width="22" height="22">
            <use href="./sprite.svg#heart-favorite"></use>
          </svg>
        </button>
        <img class="img-recipes" src="${recipe.thumb}" alt="${recipe.title}" width="335" height="335">
        <div class="thumb-desc-recipes">
          <h3 class="title-recipes">${recipe.title}</h3>
          <p class="description-recipes">${recipe.description}</p>
          <div class="thumb-btn-rating">
            <p class="rating-recipes">${recipe.rating}</p>
            <!-- Другие элементы разметки -->
          </div>
        </div>
      </div>
    </li>
  `;
}

// Инициализируем отрисовку карточек при загрузке страницы
renderFavoriteRecipes();
