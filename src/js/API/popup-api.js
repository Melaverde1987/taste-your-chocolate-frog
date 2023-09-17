import { BASE_URL } from './config';
import axios from 'axios';

const POPUP_ENDPOINT = '/recipes';

const fetchPopup = async () => {
  let ID = '6462a8f74c3d0ddd28897fc1';

  const response = await axios.get(`${BASE_URL}${POPUP_ENDPOINT}/${ID}`);
  //console.log(response.data);
  return response.data;
};

export { fetchPopup };
