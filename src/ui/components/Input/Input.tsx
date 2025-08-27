'use client';

import { ChangeEvent, FC, useCallback, useState } from 'react';

import styles from './input.module.scss';

interface Props {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  isError?: boolean;
  error?: string;
  placeholder?: string;
  name?: string;
  type?: 'text' | 'password';
}

export const Input: FC<Props> = ({
  value,
  onChange,
  disabled = false,
  isError = false,
  error = '',
  placeholder = '',
  name,
  type = 'text',
}) => {
  const [isTouched, setIsTouched] = useState(false);
  const showError = isTouched && isError;

  const onBlur = useCallback(() => {
    setIsTouched(true);
  }, []);

  return (
    <div className={styles.wrapper}>
      <input
        value={value}
        name={name}
        onChange={onChange}
        disabled={disabled}
        type={type}
        className={`${styles.wrapper_input} ${showError ? styles.error : ''}`}
        placeholder={placeholder}
        onBlur={onBlur}
      />
      {showError && <p className={styles.error_info}>{error}</p>}
    </div>
  );
};
