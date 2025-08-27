'use client';

import { FC, ReactNode } from 'react';
import { Loading } from '../Loading';
import styles from './button.module.scss';

interface Props {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'secondary';
  loading?: boolean;
}

export const Button: FC<Props> = ({
  children,
  onClick = () => null,
  disabled = false,
  variant = 'primary',
  loading = false,
}) => {
  return (
    <button
      onClick={onClick}
      className={`${styles.button} ${styles[variant]}`}
      disabled={disabled}
    >
      {variant === 'primary' && loading && (
        <Loading className={styles.spinner} />
      )}
      {children}
    </button>
  );
};
