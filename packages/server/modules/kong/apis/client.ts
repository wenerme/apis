import axios from 'axios';

export const kongClient = axios.create({
  baseURL: 'http://127.0.0.1:8001'
});
