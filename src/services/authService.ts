import { storageKeys } from '@/constants/storageKeys';
import { times } from '@/constants/times';

import { IUser } from '@/types/model';
import { IAuthRequest } from '@/types/request';
import { IAuthResponse, IRefreshResponse } from '@/types/response';

import { api } from './api/axiosInstanse';

const AUTH_URL = '/auth';

const maxAge = 30 * times.secInDay;

export const authService = {
  async login(credentials: IAuthRequest): Promise<IAuthResponse> {
    const response = await api.post(`${AUTH_URL}/login`, credentials);
    return response.data;
  },

  async getCurrentUser(): Promise<IUser> {
    const response = await api.get(`${AUTH_URL}/me`, {
      headers: {
        Authorization: `Bearer ${this.getAccessToken()}`,
      },
    });
    return response.data;
  },

  async refreshTokens(): Promise<IRefreshResponse> {
    const response = await api.post(`${AUTH_URL}/refresh`, {
      refreshToken: this.getRefreshToken(),
    });
    return response.data;
  },

  getAccessToken(): string | null {
    return localStorage.getItem(storageKeys.accessToken);
  },

  getRefreshToken(): string | null {
    return localStorage.getItem(storageKeys.refreshToken);
  },

  setTokens(accessToken: string, refreshToken: string): void {
    localStorage.setItem(storageKeys.accessToken, accessToken);
    localStorage.setItem(storageKeys.refreshToken, refreshToken);
    document.cookie = `${storageKeys.accessToken}=${accessToken}; path=/; max-age=${maxAge}; SameSite=Lax`;
  },

  clearTokens(): void {
    localStorage.removeItem(storageKeys.accessToken);
    localStorage.removeItem(storageKeys.refreshToken);
    localStorage.removeItem(storageKeys.user);
    document.cookie = `${storageKeys.accessToken}=; path=/; max-age=0`;
  },

  setUser(user: IUser): void {
    localStorage.setItem(storageKeys.user, JSON.stringify(user));
  },

  getUser(): IUser | null {
    const userStr = localStorage.getItem(storageKeys.user);
    return userStr ? JSON.parse(userStr) : null;
  },
};
