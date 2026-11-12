'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

import { ButtonLink } from '@/components/Button/Button';
import Loader from '@/components/Loader/Loader';
import { getErrorMessage } from '@/lib/api';
import { getCart, updateCart } from '@/lib/cart';
import type { Cart } from '@/types';

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

  const items = cart.products.flatMap((item) =>
    item.productId
      ? [{ product: item.productId, quantity: item.quantity }]
      : [],
  );

  return (
    <section className={styles.section}>
      <div className="container">
        <h1 className={styles.title}>Cart</h1>

        {items.length === 0 ? (
          <div className={styles.empty}>
            <p>Your cart is empty</p>
            <ButtonLink href="/medicine">Go to medicine</ButtonLink>
          </div>
        ) : (
          <div className={styles.layout}>
            <CheckoutForm
              totalPrice={cart.totalPrice}
              onSuccess={handleOrderPlaced}
            />

            <ul className={styles.list}>
              {items.map((item) => (
                <li key={item.product._id}>
                  <CartItem
                    product={item.product}
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
