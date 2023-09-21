import { BASE_URL } from './config';
import axios from 'axios';

const CATEGORIES_ENDPOINT = '/categories';

const fetchCategories = async () => {
  const params = new URLSearchParams({
    page: 1,
  });

  const response = await axios.get(
    `${BASE_URL}${CATEGORIES_ENDPOINT}?${params}`
  );
  return response.data;
};

export { fetchCategories};
