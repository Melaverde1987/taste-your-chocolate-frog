import axios from 'axios';
// axios.defaults.headers.common['x-api-key'] =
//   'live_FZepRFg8FuRHMrH9K01MmohQZHWyZkU7tHDFcCE5ET63fBDMIofv93QFs4EW4wN9';

const BASE_URL = 'https://tasty-treats-backend.p.goit.global/api';
const HERO_ENDPOINT = '/events';

// Початковий запрос
const fetchEvents = async findData => {
  const response = await axios.get(`${BASE_URL}${HERO_ENDPOINT}`);
  console.log(response);
  //   console.log(response.data);
  return response;
};

export { fetchEvents };
