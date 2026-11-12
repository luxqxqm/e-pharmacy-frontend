import type { Metadata } from 'next';

import Filters from '@/components/Medicine/Filters/Filters';
import Pagination from '@/components/Medicine/Pagination/Pagination';
import ProductCard from '@/components/Medicine/ProductCard/ProductCard';
import { api } from '@/lib/api';
import { CATEGORIES, type ProductsResponse } from '@/types';

import styles from './page.module.css';

export const metadata: Metadata = { title: 'Medicine' };

const PER_PAGE = 12;

export default async function MedicinePage({
  searchParams,
}: PageProps<'/medicine'>) {
  const params = await searchParams;

  // беремо фільтри з URL: /medicine?category=Heart&name=asp&page=2
  const name = typeof params.name === 'string' ? params.name : '';
  const category =
    typeof params.category === 'string' && CATEGORIES.includes(params.category)
      ? params.category
      : '';
  const page = Number(params.page) > 0 ? Number(params.page) : 1;

  // фільтрація і пагінація на бекенді
  const { data } = await api.get<ProductsResponse>('/products', {
    params: {
      name: name || undefined,
      category: category || undefined,
      page,
      perPage: PER_PAGE,
    },
  });

  return (
    <section className={styles.section}>
      <div className="container">
        <h1 className={styles.title}>Medicine</h1>

        {/* key: при зміні URL форма бере нові значення */}
        <Filters
          key={`${category}-${name}`}
          initialName={name}
          initialCategory={category}
        />

        {data.products.length === 0 ? (
          <p className={styles.empty}>Nothing was found for your request</p>
        ) : (
          <ul className={styles.list}>
            {data.products.map((product) => (
              <li key={product._id}>
                <ProductCard product={product} />
              </li>
            ))}
          </ul>
        )}

        {data.totalPage > 1 && (
          <Pagination
            page={page}
            totalPage={data.totalPage}
            name={name}
            category={category}
          />
        )}
      </div>
    </section>
  );
}
