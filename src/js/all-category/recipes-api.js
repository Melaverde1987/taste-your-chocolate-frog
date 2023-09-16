import axios from 'axios';

const BASE_URL= 'https://tasty-treats-backend.p.goit.global/api/recipes';


// async function getFetchRecipes();




export async function getFetch(name, totalNumberOfPges, currentPage = 1 ) {
    const response = await axios.get(`${BASE_URL}`, {
      params: {
        key: API_KEY,
        q: name,
        per_page: totalNumberOfPges,
        page: currentPage,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
      },
    });
    return response;
  };