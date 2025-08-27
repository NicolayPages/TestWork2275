'use client';

import { useAuth } from '@/hooks/useAuth';

import styles from './footer.module.scss';

const currentYear = new Date().getFullYear();

export const Footer = () => {
  const { isAuth, user } = useAuth();
  return (
    <footer className={styles.footer}>
      <div className={styles.footer_container}>
        <p className={styles.footer_info}>
          {isAuth
            ? `${currentYear} Logged as ${user?.username} \n ${user?.email}`
            : currentYear}
        </p>
      </div>
    </footer>
  );
};
