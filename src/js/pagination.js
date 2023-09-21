import { fetchCards } from './API/grid-cards-api';
import { setCardsLimitResizer } from './grid-card-fetch';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const elements = {
  btnsPagesBox: document.querySelector('.js-btns-pages'),
  pagWrap: document.querySelector('.js-pag-wrap'),
  btnsBack: document.querySelector('.btns-back'),
  btnsEnd: document.querySelector('.btns-forward'),
  btnFin: document.querySelector('.pag-forward-btn')
};

const pages = 7; //кількість сторінок
let quantMobbtn = 3; // кількість кнопок сторінок в моб варіанті

let currentPage = 1; //поточна сторінка
let currentlimit; // рецептів на сторінці
// let totalPages; // кількість рецептів

setCardsLimitTest();

function setCardsLimitTest() {
  if (window.screen.width >= 768 && window.screen.width < 1200) {
    currentlimit = 8;
    quantMobbtn = 4;
    defaultDataTest(currentPage, currentlimit);
  } else if (window.screen.width >= 1200) {
    currentlimit = 9;
    quantMobbtn = 4;
    defaultDataTest(currentPage, currentlimit);
  }
  setCardsLimitResizerTest();
}

setCardsLimitResizerTest();

function setCardsLimitResizerTest() {
  window.addEventListener('resize', function () {
    if (window.screen.width >= 768 && window.screen.width < 1200) {
      currentlimit = 8;
      quantMobbtn = 4;
      defaultDataTest(currentPage, currentlimit);
      return quantMobbtn;
    } else if (window.screen.width >= 1200) {
      currentlimit = 9;
      quantMobbtn= 4;
      defaultDataTest(currentPage, currentlimit);
      return quantMobbtn;
    } else {
      currentlimit = 6;
      quantMobbtn = 3;
      defaultDataTest(currentPage, currentlimit);
      return quantMobbtn;
    }
  });
}



elements.btnsPagesBox.addEventListener('click', handlerBattonPag);
elements.pagWrap.addEventListener('click', handlerBattonArrow);

quantityBtn(pages);

function quantityBtn(quantityPages) {
  elements.btnsPagesBox.innerHTML = markupBtnPagination(quantityPages);
}

function markupBtnPagination(pages) {
  const arrBtn = [];

  for (let i = 1; i <= pages; i += 1) {
    if (i === quantMobbtn && pages === quantMobbtn) {
      arrBtn.push(
        `<button type="button" class="pag-page-btn pag-btn">${i}</button>`
      );
      continue;
    } else 
    // if (i === quantMobbtn && pages !== quantMobbtn) {
    //   arrBtn.push(
    //     `<button type="button" class="pag-page-btn pag-btn additional-btn">...</button>`
    //   );
    //   continue;
    // }
    arrBtn.push(
      `<button type="button" class="pag-page-btn pag-btn">${i}</button>`
    );
  }
  if (arrBtn.length <= quantMobbtn) {
    elements.btnsBack.classList.add('visually-hidden');
    elements.btnsEnd.classList.add('visually-hidden');
  }
  arrBtn.splice(
    0,
    1,
    `<button type="button" class="pag-page-btn pag-btn btn-active">1</button>`
  );
  const visualBtn = pages - (pages - quantMobbtn);
  const allBtn = arrBtn.slice(0, visualBtn);

  return allBtn.join('');
}

function handlerBattonPag(e) {
  if (e.target.nodeName !== 'BUTTON') {
    return;
  }
  const currentActiveBtn = document.querySelector('.btn-active');

  if (currentActiveBtn) {
    currentActiveBtn.classList.remove('btn-active');
  }

  if (e.target) {
    e.target.classList.add('btn-active');
    currentPage = Number(e.target.textContent);
    console.dir(Number(e.target.textContent));

    // зміна розмітки
    defaultDataTest(currentPage, currentlimit);
    // з цього отримується номер сторінки, вставити функцію розмітки сторінки
  }
}

const cards = document.querySelector('.list-recipes');

async function defaultDataTest(currentPage, currentlimit) {
  try {
    const result = await fetchCards(currentPage, currentlimit);
    cards.innerHTML = createMarkupGridCardPag(result.results);
    // pages = result.totalPages;
   
  } catch {
    Notify.failure('Oops! Something went wrong! Try reloading the page!');
  }
}

function createMarkupGridCardPag(arr) {
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

function markupRatingStars(roundRating) {
  switch (roundRating) {
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
}

function handlerBattonArrow(e) {
  if (e.target.classList.contains('pag-end-btn')) {
    elements.btnsPagesBox.innerHTML = markupEndBattons(pages);
    const currentActiveBtn = document.querySelector('.btn-active');
    const choosePage = currentActiveBtn.textContent;
    defaultDataTest(choosePage, currentlimit);
    
  }
  if (e.target.classList.contains('pag-start-btn')) {
    elements.btnsPagesBox.innerHTML = markupBtnPagination(pages);
    const currentActiveBtn = document.querySelector('.btn-active');
    const choosePage = currentActiveBtn.textContent;
    defaultDataTest(choosePage, currentlimit);
   
  }
  if (e.target.classList.contains('pag-forward-btn')) {
    const currentActiveBtn = document.querySelector('.btn-active');
       if (Number(currentActiveBtn.textContent) <= pages - 1) {
      currentActiveBtn.nextSibling.classList.add('btn-active');
      currentActiveBtn.classList.remove('btn-active');
      const choosePage = Number(currentActiveBtn.textContent) + 1;
      defaultDataTest(choosePage, currentlimit);
      
      btnPageMarkup (Number(currentActiveBtn.textContent), pages);
    }
  }
  if (e.target.classList.contains('pag-back-btn')) {
    const currentActiveBtn = document.querySelector('.btn-active');  
    if (Number(currentActiveBtn.textContent)-1 >= 1) {
      currentActiveBtn.previousSibling.classList.add('btn-active');
      currentActiveBtn.classList.remove('btn-active');
      currentActiveBtn.previousSibling.classList.add('btn-active');
      currentActiveBtn.classList.remove('btn-active');
      const choosePage = Number(currentActiveBtn.textContent)-1;
      defaultDataTest(choosePage, currentlimit);
     
    }
  }
}

function markupEndBattons(quantityPages) {
  const arrBtn = [];
  for (let i = quantityPages - (quantMobbtn - 1); i <= quantityPages; i += 1) {
    arrBtn.push(
      `<button type="button" class="pag-page-btn pag-btn">${i}</button>`
    );
  }
  // arrBtn.splice(
  //   0,
  //   1,
  //   `<button type="button" class="pag-page-btn pag-btn additional-btn">...</button>`
  // );
  arrBtn.splice(
    quantMobbtn - 1,
    1,
    `<button type="button" class="pag-page-btn pag-btn btn-active">${quantityPages}</button>`
  );
  const endSetPages = arrBtn.join('');
  return endSetPages;
}


function btnPageMarkup (page, endPage){
  const actualPage = page+1;
  const arrBtn = [];
console.log(actualPage);
  for (let i = actualPage; i <= endPage; i += 1) {
       arrBtn.push(
        `<button type="button" class="pag-page-btn pag-btn">${i}</button>`)
     console.log(arrBtn);
  }
   arrBtn.splice(
    0,
    1,
    `<button type="button" class="pag-page-btn pag-btn btn-active">1</button>`
  );
  const visualBtn = pages - (pages - quantMobbtn);
  const allBtn = arrBtn.slice(0, visualBtn);
  
  return allBtn.join('');
}