import { create } from 'zustand';

import { errorCodes } from '@/constants/errorCodes';
import { errors } from '@/constants/errors';

import { ICatchError } from '@/types/model';
import { IAuthStore } from '@/types/store';

import { authUtils } from '@/utils/auth/authUtils';

import { authService } from '../services/authService';

const { getAccessToken, clearTokens, setTokens } = authUtils;

const { getCurrentUser, login, refreshTokens } = authService;

export const useAuthStore = create<IAuthStore>()((set, get) => ({
  user: null,
  token: null,
  loading: false,
  error: null,
  initialized: false,

  login: async credentials => {
    set({ loading: true, error: null });
    try {
      const authResponse = await login(credentials);
      setTokens(authResponse.accessToken, authResponse.refreshToken);
      await get().fetchCurrentUser();
    } catch (err: unknown) {
      set({
        error: (err as ICatchError).response?.data?.message || errors.login,
      });
      throw err;
    } finally {
      set({ loading: false });
    }
  },

  fetchCurrentUser: async () => {
    try {
      const user = await getCurrentUser();
      set({ user });
    } catch (err: unknown) {
      set({
        error: (err as ICatchError).response?.data?.message || errors.response,
      });
      clearTokens();
      set({ user: null });
    }
  },

  logout: () => {
    clearTokens();
    set({ user: null });
  },

  checkAuth: async () => {
    const token = getAccessToken();
    if (!token) {
      set({ user: null, initialized: true });
      return;
    }

    set({ loading: true, error: null });

    try {
      const user = await getCurrentUser();
      set({ user });
    } catch (err: unknown) {
      if ((err as ICatchError).response?.status === errorCodes.unauthorized) {
        try {
          const { accessToken, refreshToken } = await refreshTokens();
          setTokens(accessToken, refreshToken);
          const updatedUser = await getCurrentUser();
          set({ user: updatedUser });
        } catch (_) {
          clearTokens();
          set({ user: null });
        }
      } else {
        set({ error: (err as ICatchError).message });
      }
    } finally {
      set({ loading: false, initialized: true });
    }
  },

  refreshTokens: async () => {
    try {
      const { accessToken, refreshToken } = await refreshTokens();
      setTokens(accessToken, refreshToken);
    } catch (_) {
      clearTokens();
      set({ user: null });
    }
  },
}));
