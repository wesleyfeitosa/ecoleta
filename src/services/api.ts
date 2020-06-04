import axios from 'axios';

const api = axios.create({
  baseURL: 'https://ecoleta-wesleyfeitosa.herokuapp.com/',
});

export default api;
