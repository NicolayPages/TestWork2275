import { apiUrls } from '@/constants/api';
import axios from 'axios';

export const api = axios.create({
  baseURL: apiUrls.baseUrl,
});
