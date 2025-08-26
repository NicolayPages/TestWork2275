import { useAuthStore } from '@/store/authStore';
import { useMemo } from 'react';

export const useAuth = () => {
  const user = useAuthStore(store => store.user);
  return useMemo(() => ({ user, isAuth: !!user }), [user]);
};
