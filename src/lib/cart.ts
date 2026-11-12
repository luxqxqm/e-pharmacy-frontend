import type { Cart } from '@/types';

import { api } from './api';

export async function getCart() {
  const { data } = await api.get<Cart>('/cart');
  return data;
}

// бекенд ставить кількість, а не додає. quantity 0 = видалити з кошика
export async function updateCart(productId: string, quantity: number) {
  const { data } = await api.put<Cart>('/cart/update', { productId, quantity });
  return data;
}

// "Add to cart": беремо поточну кількість у кошику і додаємо до неї
export async function addToCart(productId: string, quantity = 1) {
  const cart = await getCart();
  const item = cart.products.find((p) => p.productId?._id === productId);
  const currentQuantity = item ? item.quantity : 0;

  return updateCart(productId, currentQuantity + quantity);
}
