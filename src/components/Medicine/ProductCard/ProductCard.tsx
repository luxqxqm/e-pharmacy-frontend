import Image from 'next/image';
import Link from 'next/link';

import AddToCartButton from '@/components/AddToCartButton/AddToCartButton';
import type { Product } from '@/types';
import { formatPrice } from '@/utils/formatPrice';

import styles from './ProductCard.module.css';

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <article className={styles.card}>
      <div className={styles.imageWrapper}>
        <Image
          src={product.photo}
          alt={product.name}
          fill
          sizes="(min-width: 1440px) 280px, (min-width: 768px) 226px, 335px"
          className={styles.image}
        />
      </div>

      <div className={styles.info}>
        <div className={styles.heading}>
          <h3 className={styles.name}>{product.name}</h3>
          <p className={styles.price}>{formatPrice(product.price)}</p>
        </div>
        <p className={styles.supplier}>{product.suppliers}</p>

        <div className={styles.actions}>
          <AddToCartButton
            productId={product._id}
            className={styles.addButton}
          />
          <Link href={`/product/${product._id}`} className={styles.details}>
            Details
          </Link>
        </div>
      </div>
    </article>
  );
}
