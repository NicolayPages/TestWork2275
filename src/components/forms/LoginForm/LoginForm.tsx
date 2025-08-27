'use client';

import { errors } from '@/constants/erorrs';
import { routes } from '@/constants/routes';
import { useAuthStore } from '@/store/authStore';
import { IAuth } from '@/types/model';
import { Button, Input } from '@/ui/components';
import { getIsValid } from '@/utils/getIsValid';
import { useRouter } from 'next/navigation';
import { ChangeEvent, useState } from 'react';
import styles from './loginform.module.scss';

const initialValue: IAuth = {
  username: '',
  password: '',
};

export const LoginForm = () => {
  const { login, error, loading } = useAuthStore();
  const [form, setForm] = useState<IAuth>(initialValue);
  const router = useRouter();

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const isValidUsername = getIsValid(form.username);
  const isValidPassword = getIsValid(form.password);
  const isDisabled = !isValidUsername || !isValidPassword || loading;

  const onLoginHandler = async () => {
    await login(form);
    router.replace(routes.public.main.href);
  };

  return (
    <div className={styles.form}>
      <h2 className={styles.form_title}>Login</h2>
      <div className={styles.form_container}>
        <Input
          name='username'
          placeholder='Username'
          value={form.username}
          onChange={onChange}
          isError={!isValidUsername}
          error={errors.validate}
          disabled={loading}
        />
        <Input
          name='password'
          placeholder='Password'
          value={form.password}
          onChange={onChange}
          isError={!isValidPassword}
          error={errors.validate}
          type='password'
          disabled={loading}
        />
        <Button
          loading={loading}
          disabled={isDisabled}
          onClick={onLoginHandler}
        >
          Login
        </Button>
        {!!error && <p className={styles.form_error}>{error}</p>}
      </div>
    </div>
  );
};
