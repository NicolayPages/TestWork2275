import { FC } from 'react';

import Image from 'next/image';

import { IProduct } from '@/types/model';

import { Button } from '@/ui/components';

import styles from './productcard.module.scss';

interface Props {
  product: IProduct;
  isAuth: boolean;
}

export const ProductCard: FC<Props> = ({ product, isAuth }) => {
  const { title, category, price, thumbnail } = product;
  return (
    <div className={styles.card}>
      <div className={styles.card_image_wrapper}>
        <Image
          src={thumbnail}
          alt={title}
          width={600}
          height={230}
          className={styles.card_image}
          priority={false}
        />
      </div>
      <div className={styles.card_content}>
        <div className={styles.card_info}>
          <h3 className={styles.card_title}>{title}</h3>
          <p className={styles.card_category}>{category}</p>
          <p className={styles.card_price}>${price.toFixed(2)}</p>
        </div>
        {isAuth && <Button>Add to cart</Button>}
      </div>
    </div>
  );
};
