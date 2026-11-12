import type { Cart } from '@/types';

import { api } from './api';

export async function getCart() {
  const { data } = await api.get<Cart>('/cart');
  return data;
}

export async function updateCart(productId: string, quantity: number) {
  const { data } = await api.put<Cart>('/cart/update', { productId, quantity });
  return data;
}

export async function addToCart(productId: string, quantity = 1) {
  const cart = await getCart();
  const item = cart.products.find((p) => p.productId?._id === productId);
  const currentQuantity = item ? item.quantity : 0;

  return updateCart(productId, currentQuantity + quantity);
}
