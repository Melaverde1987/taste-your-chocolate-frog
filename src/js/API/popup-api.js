import { BASE_URL } from './config';
import axios from 'axios';

const POPUP_ENDPOINT = '/recipes';

const fetchPopup = async id => {
  let ID = id;

  const response = await axios.get(`${BASE_URL}${POPUP_ENDPOINT}/${ID}`);
  return response.data;
};

export { fetchPopup };
