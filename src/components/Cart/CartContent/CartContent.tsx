'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import clsx from 'clsx';
import toast from 'react-hot-toast';

import buttonStyles from '@/components/Button/Button.module.css';
import Loader from '@/components/Loader/Loader';
import { getErrorMessage } from '@/lib/api';
import { getCart, updateCart } from '@/lib/cart';
import type { Cart, Product } from '@/types';

import CartItem from '../CartItem/CartItem';
import CheckoutForm from '../CheckoutForm/CheckoutForm';
import styles from './CartContent.module.css';

export default function CartContent() {
  const router = useRouter();
  const [cart, setCart] = useState<Cart | null>(null);

  useEffect(() => {
    if (!localStorage.getItem('accessToken')) {
      router.replace('/login');
      return;
    }

    getCart()
      .then(setCart)
      .catch((error) => toast.error(getErrorMessage(error)));
  }, [router]);

  const handleChangeQuantity = async (productId: string, quantity: number) => {
    try {
      const updatedCart = await updateCart(productId, quantity);
      setCart(updatedCart);
      window.dispatchEvent(new Event('cart-change'));
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  const handleOrderPlaced = () => {
    setCart({ products: [], totalPrice: 0 });
    window.dispatchEvent(new Event('cart-change'));
  };

  if (!cart) return <Loader label="Loading cart..." />;

  const items = cart.products.filter((item) => item.productId !== null);

  return (
    <section className={styles.section}>
      <div className="container">
        <h1 className={styles.title}>Cart</h1>

        {items.length === 0 ? (
          <div className={styles.empty}>
            <p>Your cart is empty</p>
            <Link
              href="/medicine"
              className={clsx(buttonStyles.button, buttonStyles.primary)}
            >
              Go to medicine
            </Link>
          </div>
        ) : (
          <div className={styles.layout}>
            <CheckoutForm
              totalPrice={cart.totalPrice}
              onSuccess={handleOrderPlaced}
            />

            <ul className={styles.list}>
              {items.map((item) => (
                <li key={item.productId?._id}>
                  <CartItem
                    product={item.productId as Product}
                    quantity={item.quantity}
                    onChangeQuantity={handleChangeQuantity}
                  />
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
