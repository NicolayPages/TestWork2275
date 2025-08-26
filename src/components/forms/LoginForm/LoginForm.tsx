'use client';

import { errors } from '@/constants/erorrs';
import { IAuth } from '@/types/model';
import { Button, Input } from '@/ui/components';
import { ChangeEvent, useState } from 'react';
import styles from './loginform.module.scss';

const initialValue: IAuth = {
  username: '',
  password: '',
};

const getIsValid = (value: string) => {
  return !!value.trim() && value.length >= 3;
};

export const LoginForm = () => {
  const [form, setForm] = useState<IAuth>(initialValue);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const isValidUsername = getIsValid(form.username);
  const isValidPassword = getIsValid(form.password);
  const isDisabled = !isValidUsername || !isValidPassword;

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
        />
        <Input
          name='password'
          placeholder='Password'
          value={form.password}
          onChange={onChange}
          isError={!isValidPassword}
          error={errors.validate}
          type='password'
        />
        <Button disabled={isDisabled}>Login</Button>
      </div>
    </div>
  );
};
