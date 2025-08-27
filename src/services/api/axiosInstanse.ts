import axios from 'axios';

import { apiUrls } from '@/constants/api';

export const api = axios.create({
  baseURL: apiUrls.baseUrl,
});
