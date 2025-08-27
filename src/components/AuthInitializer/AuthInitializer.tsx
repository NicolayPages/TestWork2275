'use client';

import { useAuthStore } from '@/store/authStore';
import { Loading } from '@/ui/components';
import { useEffect } from 'react';
import styles from './authinitializer.module.scss';

export const AuthInitializer = () => {
  const checkAuth = useAuthStore(store => store.checkAuth);
  const initialized = useAuthStore(store => store.initialized);

  useEffect(() => {
    if (!initialized) {
      checkAuth();
    }
  }, [checkAuth, initialized]);

  if (!initialized) {
    return (
      <div className={styles.global_loading}>
        <Loading />
      </div>
    );
  }

  return null;
};
