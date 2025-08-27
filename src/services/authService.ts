import { IUser } from '@/types/model';
import { IAuthRequest } from '@/types/request';
import { IRefreshResponse, TAuthResponse } from '@/types/response';

import { authUtils } from '@/utils/auth/authUtils';

import { api } from './api/axiosInstanse';

const AUTH_URL = '/auth';

export const authService = {
  async login(credentials: IAuthRequest): Promise<TAuthResponse> {
    const response = await api.post(`${AUTH_URL}/login`, credentials);
    return response.data;
  },

  async getCurrentUser(): Promise<IUser> {
    const response = await api.get(`${AUTH_URL}/me`);
    return response.data;
  },

  async refreshTokens(): Promise<IRefreshResponse> {
    const response = await api.post(`${AUTH_URL}/refresh`, {
      refreshToken: authUtils.getRefreshToken(),
    });
    return response.data;
  },
};
