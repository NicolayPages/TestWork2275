import { FC } from 'react';
import styles from './loading.module.scss';

interface Props {
  className?: string;
}

export const Loading: FC<Props> = ({ className = '' }) => {
  return <div className={`${styles.loading} ${className}`}></div>;
};
