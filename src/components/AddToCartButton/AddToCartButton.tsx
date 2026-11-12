'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';

import AuthModal from '@/components/AuthModal/AuthModal';
import Button from '@/components/Button/Button';
import { useIsLoggedIn } from '@/hooks/useIsLoggedIn';
import { getErrorMessage } from '@/lib/api';
import { addToCart } from '@/lib/cart';

type AddToCartButtonProps = {
  productId: string;
  quantity?: number;
  className?: string;
};

export default function AddToCartButton({
  productId,
  quantity = 1,
  className,
}: AddToCartButtonProps) {
  const isLoggedIn = useIsLoggedIn();
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClick = async () => {
    if (!isLoggedIn) {
      setIsModalOpen(true);
      return;
    }

    setIsLoading(true);
    try {
      await addToCart(productId, quantity);
      toast.success('Added to cart');
      window.dispatchEvent(new Event('cart-change'));
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Button onClick={handleClick} disabled={isLoading} className={className}>
        {isLoading ? 'Adding...' : 'Add to cart'}
      </Button>

      {isModalOpen && <AuthModal onClose={() => setIsModalOpen(false)} />}
    </>
  );
}
