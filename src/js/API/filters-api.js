import { BASE_URL } from './config';
import axios from 'axios';

const FILTERS_ENDPOINT = '/recipes';
const SELECT_AREA_ENDPOINT = '/areas';
const SELECT_INGREDIENTS_ENDPOINT = '/ingredients';
/*
https://tasty-treats-backend.p.goit.global/api/recipes?category=Beef&page=1&limit=6&time=160&area=Irish&ingredient=640c2dd963a319ea671e3796 
(приклад з переліком усіх можливих параметрів, кожен з яких можна прибрати за потреби)	*/
const fetchCardsWithFilters = async () => {
  const params = new URLSearchParams({
    page: 1,
    limit: 10000,
  });

  const response = await axios.get(`${BASE_URL}${FILTERS_ENDPOINT}?${params}`);
  //console.log(response.data);
  return response.data.results;
};

const fetchAreas = async () => {
  const params = new URLSearchParams({
    page: 1,
    limit: 10000,
  });

  const response = await axios.get(
    `${BASE_URL}${SELECT_AREA_ENDPOINT}?${params}`
  );
  return response.data;
};

const fetchIngredients = async () => {
  const params = new URLSearchParams({
    page: 1,
    limit: 10000,
  });

  const response = await axios.get(
    `${BASE_URL}${SELECT_INGREDIENTS_ENDPOINT}?${params}`
  );
  return response.data;
};

export { fetchCardsWithFilters, fetchAreas, fetchIngredients };
