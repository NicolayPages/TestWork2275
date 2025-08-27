import { storageKeys } from '@/constants/storageKeys';
import { times } from '@/constants/times';

const maxAge = 30 * times.secInDay;

export const authUtils = {
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
    document.cookie = `${storageKeys.accessToken}=; path=/; max-age=0`;
  },
};
