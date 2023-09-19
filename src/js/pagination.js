import { fetchCards } from './API/grid-cards-api';

const elements = {
  btnsPagesBox: document.querySelector('.js-btns-pages'),
  pagWrap: document.querySelector('.js-pag-wrap'),
};

const pages = 5;
const quantMobbtn = 3; // кількість кнопок в моб варіанті

quantityBtn(pages);

function quantityBtn(quantityPages) {
  elements.btnsPagesBox.innerHTML = markupBtnPagination(quantityPages);
}

function markupBtnPagination(pages) {
  const arrBtn = [];

  console.log(elements.btnsPagesBox);
  for (let i = 1; i <= pages; i += 1) {
    if (i === quantMobbtn && pages === quantMobbtn) {
      arrBtn.push(`<div class="pag-page-btn pag-btn additional-btn">${i}</div>`);
      continue;
    }else if(i === quantMobbtn && pages !== quantMobbtn){
        arrBtn.push(`<div class="pag-page-btn pag-btn additional-btn">...</div>`);
      continue;
    }
    arrBtn.push(`<div class="pag-page-btn pag-btn">${i}</div>`);
  }
  if (arrBtn.length===1){
    elements.pagWrap.classList.add('visually-hidden')
  }
  const visualBtn = pages - (pages - quantMobbtn);
  const allBtn = arrBtn.slice(0, visualBtn);

  return allBtn.join('');
}

elements.pagWrap.addEventListener('click', handlerBattonPag);

function handlerBattonPag(e) {
  console.log(e.target);
}
