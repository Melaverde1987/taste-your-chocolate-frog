import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { createMarkupGridCard } from './grid-card-fetch';

const listRecipe = document.querySelector('.list-recipes');

listRecipe.addEventListener('click', onClickFavorite);

function onClickFavorite(evt) {
  if (evt.target.classList.contains('icon-favorite-recipes')) {
    const name = evt.target.getAttribute('name');
    const svgHeart = evt.target;
    svgHeart.classList.toggle('filled-heart');

    const storedFavorites =
      JSON.parse(localStorage.getItem('favoriteRecipes')) || [];

    // Объявляем _id и присваиваем ему значение атрибута 'name'
    const _id = name;

    // Проверяем, есть ли уже такая карточка в избранном
    const existingIndex = storedFavorites.findIndex(
      recipe => recipe._id === _id
    );

    if (existingIndex !== -1) {
      // Если карточка уже в избранном, удаляем её
      storedFavorites.splice(existingIndex, 1);
    } else {
      // Создаем объект для представления карточки в избранном
      const buttonFavorite = svgHeart
        .closest('.item-recipes')
        .querySelector('.button-favorite-recipes');
      const card = svgHeart.closest('.item-recipes');
      const titleElement = card.querySelector('.title-recipes');
      const title = titleElement ? titleElement.textContent : '';
      const description = card.querySelector(
        '.description-recipes'
      ).textContent;
      const rating = card.querySelector('.rating-recipes').textContent;
      const thumb = card.querySelector('.img-recipes').src;

      const favoriteRecipe = {
        _id,
        title,
        description,
        rating,
        thumb,
      };

      // Добавляем карточку в избранные
      storedFavorites.push(favoriteRecipe);
    }

    // Сохраняем обновленный массив в локальное хранилище
    localStorage.setItem('favoriteRecipes', JSON.stringify(storedFavorites));
    console.log(storedFavorites);
    Notify.success('Recipe added to favorites!');
  }
}

renderFavoriteRecipes();

function renderFavoriteRecipes() {
  const favoritesContainer = document.getElementById('favorites-container');
  const storedFavorites =
    JSON.parse(localStorage.getItem('favoriteRecipes')) || [];

  // Отрисовываем каждую карточку
  storedFavorites.forEach(recipe => {
    const cardHTML = createMarkupGridCard(recipe);
    favoritesContainer.innerHTML += cardHTML;
  });
}
