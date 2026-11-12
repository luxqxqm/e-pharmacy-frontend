'use client';

import { useState } from 'react';

import AddToCartButton from '@/components/AddToCartButton/AddToCartButton';
import Icon from '@/components/Icon/Icon';

import styles from './QuantityAddToCart.module.css';

type QuantityAddToCartProps = {
  productId: string;
  stock: number;
};

export default function QuantityAddToCart({
  productId,
  stock,
}: QuantityAddToCartProps) {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className={styles.wrapper}>
      <div className={styles.counter}>
        <button
          type="button"
          className={styles.counterButton}
          onClick={() => setQuantity(quantity + 1)}
          disabled={quantity >= stock}
          aria-label="Increase quantity"
        >
          <Icon name="plus" size={20} />
        </button>
        <span className={styles.value} aria-live="polite">
          {quantity}
        </span>
        <button
          type="button"
          className={styles.counterButton}
          onClick={() => setQuantity(quantity - 1)}
          disabled={quantity <= 1}
          aria-label="Decrease quantity"
        >
          <Icon name="minus" size={20} />
        </button>
      </div>

      <AddToCartButton productId={productId} quantity={quantity} />
    </div>
  );
}
