import axios from 'axios';

import { apiUrls } from '@/constants/api';

import { authUtils } from '@/utils/auth/authUtils';

export const api = axios.create({
  baseURL: apiUrls.baseUrl,
});

api.interceptors.request.use(
  config => {
    const token = authUtils.getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);
