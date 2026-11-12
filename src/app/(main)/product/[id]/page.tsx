import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import ProductOverview from '@/components/Product/ProductOverview/ProductOverview';
import ProductTabs from '@/components/Product/ProductTabs/ProductTabs';
import { api } from '@/lib/api';
import type { Product } from '@/types';

import styles from './page.module.css';

export const metadata: Metadata = { title: 'Product' };

async function getProduct(id: string) {
  try {
    const { data } = await api.get<Product>(`/products/${id}`);
    return data;
  } catch {
    return null;
  }
}

export default async function ProductPage({
  params,
}: PageProps<'/product/[id]'>) {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) notFound();

  return (
    <section className={styles.section}>
      <div className={`container ${styles.inner}`}>
        <ProductOverview product={product} />
        <ProductTabs product={product} />
      </div>
    </section>
  );
}
