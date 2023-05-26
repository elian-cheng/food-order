import axios from 'axios';

export const BASE_URL = window.location.origin.includes('local')
  ? 'http://localhost:5000/'
  : 'https://elian-cheng-food-order-api.onrender.com/';

axios.defaults.baseURL = BASE_URL;
