import axios from 'axios';
import { NASA_API_KEY } from '../constants/env';

export const nasaApi = axios.create({
  baseURL: 'https://api.nasa.gov/',
  timeout: 10000,
  params: {
    api_key: NASA_API_KEY, // Puedes reemplazar con tu key personal//
  },
});
