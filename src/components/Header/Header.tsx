'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { config } from '@/constants/config';
import { routes } from '@/constants/routes';

import { useAuth } from '@/hooks/useAuth';

import { useAuthStore } from '@/store/authStore';

import { Button } from '@/ui/components';

import styles from './header.module.scss';

export const Header = () => {
  const logout = useAuthStore(store => store.logout);
  const router = useRouter();
  const { isAuth, user } = useAuth();

  const onLogout = () => {
    logout();
    router.replace(routes.public.main.href);
  };

  return (
    <header className={styles.header}>
      <div className={styles.header_container}>
        <h1 className={styles.header_logo}>{config.title}</h1>
        <div className={styles.header_content}>
          {isAuth ? (
            <>
              <p>
                {user?.firstName} {user?.lastName}
              </p>
              <Button onClick={onLogout} variant='secondary'>
                Logout
              </Button>
            </>
          ) : (
            <Link
              className={styles.header_link}
              href={routes.public.login.href}
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};
