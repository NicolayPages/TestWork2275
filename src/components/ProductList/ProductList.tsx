'use client';

import { errors } from '@/constants/erorrs';
import { useAuth } from '@/hooks/useAuth';
import { useProductStore } from '@/store/productStore';
import { Loading } from '@/ui/components';
import { useEffect, useMemo } from 'react';
import { ProductCard } from './components/ProductCard';
import styles from './productlist.module.scss';

export const ProductList = () => {
  const { isAuth } = useAuth();
  const { products, loading, error, fetchProducts } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const list = useMemo(() => {
    return products.map(product => (
      <ProductCard key={product.id} isAuth={isAuth} product={product} />
    ));
  }, [products, isAuth]);

  if (loading) {
    return <Loading />;
  }

  if (!!error) {
    return (
      <div className={styles.error}>
        <p>{error}</p>
      </div>
    );
  }

  if (!error && !loading && !products.length) {
    return (
      <div className={styles.notfound}>
        <p>{errors.noData}</p>
      </div>
    );
  }

  return <div className={styles.products}>{list}</div>;
};
