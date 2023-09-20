import { fetchCards } from './API/grid-cards-api';
import { setCardsLimitResizer } from './grid-card-fetch';

const elements = {
  btnsPagesBox: document.querySelector('.js-btns-pages'),
  pagWrap: document.querySelector('.js-pag-wrap'),
  btnsBack: document.querySelector('.btns-back'),
  btnsEnd: document.querySelector('.btns-forward'),
};

const pages = 5;
const quantMobbtn = 3; // кількість кнопок в моб варіанті

let currentPage = 3;
let currentlimit = 6;

quantityBtn(pages);

elements.btnsPagesBox.addEventListener('click', handlerBattonPag);
elements.pagWrap.addEventListener('click', handlerBattonArrow);

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
    } else if (i === quantMobbtn && pages !== quantMobbtn) {
      arrBtn.push(
        `<button type="button" class="pag-page-btn pag-btn additional-btn">...</button>`
      );
      continue;
    }
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
    // з цього отримується номер сторінки, вставити функцію розмітки сторінки
  }
}

function handlerBattonArrow(e) {
  if (e.target.classList.contains('pag-end-btn')) {
    elements.btnsPagesBox.innerHTML = markupEndBattons(pages);
  }
  if (e.target.classList.contains('pag-start-btn')) {
    elements.btnsPagesBox.innerHTML = markupBtnPagination(pages);
  }
  if (e.target.classList.contains('pag-forward-btn')) {
    const currentActiveBtn = document.querySelector('.btn-active');
    currentActiveBtn.nextSibling.classList.add('btn-active');
    currentActiveBtn.classList.remove('btn-active');
  }
}

function markupEndBattons(quantityPages) {
  const arrBtn = [];
  for (let i = quantityPages - (quantMobbtn - 1); i <= quantityPages; i += 1) {
    arrBtn.push(
      `<button type="button" class="pag-page-btn pag-btn additional-btn">${i}</button>`
    );
  }
  arrBtn.splice(
    0,
    1,
    `<button type="button" class="pag-page-btn pag-btn additional-btn">...</button>`
  );
  arrBtn.splice(
    quantMobbtn - 1,
    1,
    `<button type="button" class="pag-page-btn pag-btn btn-active">${quantityPages}</button>`
  );
  const endSetPages = arrBtn.join('');
  return endSetPages;
}

// function markupNextBatton(quantityPages){

// const currentActiveBtn = document.querySelector('.btn-active');
// console.log(currentActiveBtn.classList);
// currentActiveBtn.nextSibling.classList.add('btn-active');
// currentActiveBtn.classList.remove('btn-active');
// console.log(currentActiveBtn.nextSibling.classList);

// }
