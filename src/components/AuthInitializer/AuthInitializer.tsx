'use client';

import { useEffect } from 'react';

import { useAuthStore } from '@/store/authStore';

import { Loading } from '@/ui/components';

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
      <div className={styles.loading}>
        <Loading />
      </div>
    );
  }

  return null;
};
