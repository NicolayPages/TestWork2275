'use client';
import { config } from '@/constants/config';
import { useAuthStore } from '@/store/authStore';
import { Button } from '@/ui/components';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from './header.module.scss';

export const Header = () => {
  const { user, logout } = useAuthStore();
  const router = useRouter();

  const onLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <header className={styles.header}>
      <div className={styles.header_container}>
        <h1 className={styles.header_logo}>{config.title}</h1>
        <div className={styles.header_content}>
          {!!user ? (
            <Button onClick={onLogout} variant='secondary'>
              Logout {user.username}
            </Button>
          ) : (
            <Link href={'/login'}>Login</Link>
          )}
        </div>
      </div>
    </header>
  );
};
