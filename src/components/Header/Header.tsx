'use client';
import { config } from '@/constants/config';
import { useAuth } from '@/hooks/useAuth';
import { useAuthStore } from '@/store/authStore';
import { Button } from '@/ui/components';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from './header.module.scss';

export const Header = () => {
  const logout = useAuthStore(store => store.logout);
  const router = useRouter();
  const { isAuth, user } = useAuth();

  const onLogout = () => {
    logout();
    router.push('/');
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
            <Link className={styles.header_link} href={'/login'}>
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};
