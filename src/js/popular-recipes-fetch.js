import { fetchPopular } from './API/popular-recipes-api';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const elements= document.querySelector('.popular-list');

// popularData().then(data => {
//   // elements.cards.innerHTML = createMarkupPopular(data);
  elements.addEventListener('click', evt => {
    const popImgLink = evt.target.closest('.pop-img-link');
    if (!popImgLink) {
      return;
    }

    const clickBtn = popImgLink.querySelector('.button-recipes');
    onClickBtn();
    

    function onClickBtn() {
      const popImg = document.querySelector('.current-vrapper');
      const backdropPopImg = document.querySelector('.popup');

      popImg.style.display = 'block';
      backdropPopImg.style.display = 'block';
   
    }
  })
//  })
// });

popularData();
async function popularData() {
  try {
    const result = await fetchPopular();
  
    elements.innerHTML = createMarkupPopular(result);
  } catch {
    Notify.failure('Oops! Something went wrong! Try reloading the page!');
  }


  function createMarkupPopular(arr) {
    return arr
      .map(
        ({
          _id,
          title,
          description,
          preview,
        }) => `<li class="popular-recipes-list">
        <button value="${_id}" class="pop-img-link">
        </button>
      <img
        id="${_id}"
        class="img-popular"
        src="${preview}"
        alt="${title}"
      />
      <div class="popular-card">
        <h3 class="popular-title">"${title}"</h3>
        <p class="popular-text">
          ${description}
        </p>
      </div>
    </li>
    `
      )
      .join('');
  }
}
