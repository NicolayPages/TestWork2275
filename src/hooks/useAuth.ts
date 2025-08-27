import { useMemo } from 'react';

import { useAuthStore } from '@/store/authStore';

export const useAuth = () => {
  const user = useAuthStore(store => store.user);
  return useMemo(() => ({ user, isAuth: !!user }), [user]);
};
