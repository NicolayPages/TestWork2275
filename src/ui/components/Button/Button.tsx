'use client';

import { FC, ReactNode } from 'react';
import styles from './button.module.scss';

interface Props {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'secondary';
}

export const Button: FC<Props> = ({
  children,
  onClick = () => null,
  disabled = false,
  variant = 'primary',
}) => {
  return (
    <button
      onClick={onClick}
      className={`${styles.button} ${styles[variant]}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
