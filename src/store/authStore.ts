import { errors } from '@/constants/erorrs';
import { errorCodes } from '@/constants/errorCodes';
import { storageKeys } from '@/constants/storageKeys';
import { ICatchError } from '@/types/model';
import { IAuthStore } from '@/types/store';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { authService } from '../services/authService';

export const useAuthStore = create<IAuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      loading: false,
      error: null,
      initialized: false,

      login: async credentials => {
        set({ loading: true, error: null });
        try {
          const authResponse = await authService.login(credentials);
          authService.setTokens(
            authResponse.accessToken,
            authResponse.refreshToken,
          );
          set({ token: authResponse.accessToken });
          await get().fetchCurrentUser();
        } catch (err: unknown) {
          set({
            error: (err as ICatchError).response?.data?.message || errors.login,
          });
        } finally {
          set({ loading: false });
        }
      },

      fetchCurrentUser: async () => {
        try {
          const user = await authService.getCurrentUser();
          authService.setUser(user);
          set({ user });
        } catch (err: unknown) {
          set({
            error:
              (err as ICatchError).response?.data?.message || errors.response,
          });
          authService.clearTokens();
          set({ user: null, token: null });
        }
      },

      logout: () => {
        authService.clearTokens();
        set({ user: null, token: null });
      },

      checkAuth: async () => {
        const token = authService.getAccessToken();
        if (!token) {
          set({ user: null, token: null });
          return;
        }

        set({ loading: true, error: null });

        try {
          const user = await authService.getCurrentUser();
          authService.setUser(user);
          set({ user, token });
        } catch (err: unknown) {
          if (
            (err as ICatchError).response?.status === errorCodes.unauthorized
          ) {
            try {
              const { accessToken, refreshToken } =
                await authService.refreshTokens();
              authService.setTokens(accessToken, refreshToken);
              const updatedUser = await authService.getCurrentUser();
              authService.setUser(updatedUser);
              set({ user: updatedUser, token: accessToken });
            } catch (refreshErr) {
              authService.clearTokens();
              set({ user: null, token: null });
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
          const { accessToken, refreshToken } =
            await authService.refreshTokens();
          authService.setTokens(accessToken, refreshToken);
          set({ token: accessToken });
        } catch (err) {
          authService.clearTokens();
          set({ user: null, token: null });
        }
      },
    }),
    {
      name: storageKeys.auth,
      partialize: state => ({
        user: state.user,
        token: state.token,
      }),
    },
  ),
);
