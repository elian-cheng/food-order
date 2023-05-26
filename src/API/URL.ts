import axios from 'axios';

export const BASE_URL = window.location.origin.includes('local')
  ? 'http://localhost:5000/'
  : 'https://netlify';

axios.defaults.baseURL = BASE_URL;
