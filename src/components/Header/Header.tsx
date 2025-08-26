import { config } from '@/constants/config';
import { Button } from '@/ui/components';
import styles from './header.module.scss';

export const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.header_container}>
        <h1 className={styles.header_logo}>{config.title}</h1>
        <div className={styles.header_content}>
          <Button variant='secondary'>Logout</Button>
        </div>
      </div>
    </header>
  );
};
