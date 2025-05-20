import axios from 'axios';

export const nasaApi = axios.create({
  baseURL: 'https://api.nasa.gov/',
  timeout: 10000,
  params: {
    api_key: 'DEMO_KEY', // Puedes reemplazar con tu key personal
  },
});
