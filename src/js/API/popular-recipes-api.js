import { BASE_URL } from './config';
import axios from 'axios';

const POPULAR_RECIPES_ENDPOINT = '/recipes/popular';

const fetchPopular = async () => {
  const params = new URLSearchParams({
    page: 1,
    limit: 4,
  });

  const response = await axios.get(
    `${BASE_URL}${POPULAR_RECIPES_ENDPOINT}?${params}`
  );
  //console.log(response.data);
  return response.data;
};

const POPUP_ENDPOINT = '/recipes';

const fetchByID = async id => {
  let ID = id;

  const response = await axios.get(`${BASE_URL}${POPUP_ENDPOINT}/${ID}`);
  return response.data;
};





export { fetchPopular, fetchByID };
