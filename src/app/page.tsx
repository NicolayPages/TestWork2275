import { ProductList } from '@/components/ProductList';
import styles from './page.module.scss';

export default function Home() {
  return (
    <div className={styles.page}>
      <ProductList />
    </div>
  );
}
