'use client';

import { useState } from 'react';

import Button from '@/components/Button/Button';
import Icon from '@/components/Icon/Icon';
import ProductImage from '@/components/ProductImage/ProductImage';
import type { Product } from '@/types';
import { formatPrice } from '@/utils/formatPrice';

import styles from './CartItem.module.css';

type CartItemProps = {
  product: Product;
  quantity: number;
  onChangeQuantity: (productId: string, quantity: number) => Promise<void>;
};

export default function CartItem({
  product,
  quantity,
  onChangeQuantity,
}: CartItemProps) {
  const [isUpdating, setIsUpdating] = useState(false);

  // блокуємо кнопки, поки йде запит, щоб не наклікати зайвого
  const changeQuantity = async (newQuantity: number) => {
    setIsUpdating(true);
    await onChangeQuantity(product._id, newQuantity);
    setIsUpdating(false);
  };

  return (
    <article className={styles.item}>
      <div className={styles.imageWrapper}>
        <ProductImage
          src={product.photo}
          alt={product.name}
          sizes="120px"
          className={styles.image}
        />
      </div>

      <div className={styles.info}>
        <div>
          <h3 className={styles.name}>{product.name}</h3>
          <p className={styles.category}>{product.category}</p>
        </div>
        <p className={styles.price}>
          {formatPrice(product.price)}
          <span className={styles.total}>
            Total: {formatPrice(product.price * quantity)}
          </span>
        </p>

        <div className={styles.actions}>
          <div className={styles.counter}>
            <button
              type="button"
              onClick={() => changeQuantity(quantity + 1)}
              disabled={isUpdating || quantity >= product.stock}
              aria-label="Increase quantity"
            >
              <Icon name="plus" size={18} />
            </button>
            <span>{quantity}</span>
            <button
              type="button"
              onClick={() => changeQuantity(quantity - 1)}
              disabled={isUpdating || quantity <= 1}
              aria-label="Decrease quantity"
            >
              <Icon name="minus" size={18} />
            </button>
          </div>

          <Button
            variant="danger"
            onClick={() => changeQuantity(0)}
            disabled={isUpdating}
          >
            Remove
          </Button>
        </div>
      </div>
    </article>
  );
}
