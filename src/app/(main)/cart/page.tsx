import type { Metadata } from 'next';

import CartContent from '@/components/Cart/CartContent/CartContent';

export const metadata: Metadata = { title: 'Cart' };

// токен лежить у localStorage, тому весь кошик рендериться на клієнті
export default function CartPage() {
  return <CartContent />;
}
