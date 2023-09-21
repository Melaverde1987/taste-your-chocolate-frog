import { BASE_URL } from './config';
import axios from 'axios';

const GRID_CARDS_ENDPOINT = '/recipes';



const fetchCards = async (currentPage, currentlimit) => {
  const params = new URLSearchParams({
    page: currentPage,
    limit: currentlimit,
  });
  

  const response = await axios.get(
    `${BASE_URL}${GRID_CARDS_ENDPOINT}?${params}`
  );
  //console.log(response.data);
  return response.data;
};

export { fetchCards };
