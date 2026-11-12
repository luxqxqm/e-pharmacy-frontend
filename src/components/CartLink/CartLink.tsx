'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

import Icon from '@/components/Icon/Icon';
import { useIsLoggedIn } from '@/hooks/useIsLoggedIn';
import { getCart } from '@/lib/cart';

import styles from './CartLink.module.css';

export default function CartLink() {
  const isLoggedIn = useIsLoggedIn();
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isLoggedIn) return;

    const loadCount = async () => {
      try {
        const cart = await getCart();
        const total = cart.products.reduce(
          (sum, item) => sum + item.quantity,
          0,
        );
        setCount(total);
      } catch {
        setCount(0);
      }
    };

    loadCount();
    window.addEventListener('cart-change', loadCount);
    return () => window.removeEventListener('cart-change', loadCount);
  }, [isLoggedIn]);

  if (!isLoggedIn) return null;

  return (
    <Link
      href="/cart"
      className={styles.cart}
      aria-label={`Cart, ${count} items`}
    >
      <Icon name="shopping-cart" size={16} />
      <span className={styles.count}>{count}</span>
    </Link>
  );
}
