import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { createMarkupGridCard } from './grid-card-fetch';

const btnToFavorite = document.querySelectorAll('.button-favorite-recipes');

btnToFavorite.forEach(btn => {
  btn.addEventListener('click', onClickFavorite);
});

function onClickFavorite(event) {
  const buttonFavorite = event.currentTarget;
  const svgHeart = buttonFavorite.querySelector('.icon-favorite-recipes'); // Находим <svg> иконку

  const _id = buttonFavorite.getAttribute('name');

  // Закрашиваем или снимаем заливку для иконки
  svgHeart.classList.toggle('filled-heart');

  // Получаем данные из локального хранилища (если они есть)
  const storedFavorites =
    JSON.parse(localStorage.getItem('favoriteRecipes')) || [];

  // Проверяем, есть ли уже такая карточка в избранном
  const existingIndex = storedFavorites.findIndex(recipe => recipe._id === _id);

  if (existingIndex !== -1) {
    // Если карточка уже в избранном, удаляем её
    storedFavorites.splice(existingIndex, 1);
  } else {
    // Создаем объект для представления карточки в избранном
    const card = buttonFavorite.closest('.item-recipes');
    const titleElement = card.querySelector('.title-recipes');
    const title = titleElement ? titleElement.textContent : '';
    const description = card.querySelector('.description-recipes').textContent;
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

renderFavoriteRecipes();

function renderFavoriteRecipes() {
  const favoritesContainer = document.getElementById('favorites-container');
  // favoritesContainer.innerHTML = ''; // Очищаем контейнер

  // Получаем текущий список карточек из Local Storage
  const storedFavorites =
    JSON.parse(localStorage.getItem('favoriteRecipes')) || [];

  // Отрисовываем каждую карточку
  storedFavorites.forEach(recipe => {
    const cardHTML = createMarkupGridCard(recipe); 
    favoritesContainer.innerHTML += cardHTML;
  });
}
