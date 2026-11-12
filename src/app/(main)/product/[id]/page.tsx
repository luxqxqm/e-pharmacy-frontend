import { cache } from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import axios from 'axios';

import ProductOverview from '@/components/Product/ProductOverview/ProductOverview';
import ProductTabs from '@/components/Product/ProductTabs/ProductTabs';
import { api } from '@/lib/api';
import type { Product } from '@/types';

import styles from './page.module.css';

// cache: generateMetadata і сторінка викликають це двічі, а запит піде один
const getProduct = cache(async (id: string) => {
  try {
    const { data } = await api.get<Product>(`/products/${id}`);
    return data;
  } catch (error) {
    // 404 — нема такого продукту, 400 — кривий id у URL
    const status = axios.isAxiosError(error) ? error.response?.status : 0;
    if (status === 404 || status === 400) return null;
    throw error;
  }
});

export async function generateMetadata({
  params,
}: PageProps<'/product/[id]'>): Promise<Metadata> {
  const { id } = await params;
  const product = await getProduct(id);

  return { title: product ? product.name : 'Product not found' };
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
