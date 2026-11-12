import Link from 'next/link';

import StoreCard from '@/components/StoreCard/StoreCard';
import { api } from '@/lib/api';
import type { Store } from '@/types';

import styles from './NearestStores.module.css';

async function getNearestStores(): Promise<Store[]> {
  try {
    const { data } = await api.get<Store[]>('/stores/nearest');

    return [...data].sort(() => Math.random() - 0.5).slice(0, 6);
  } catch {
    return [];
  }
}

export default async function NearestStores() {
  const stores = await getNearestStores();

  return (
    <section className={styles.section}>
      <div className="container">
        <h2 className={styles.title}>Your Nearest Medicine Store</h2>
        <p className={styles.subtitle}>
          Search for Medicine, Filter by your location
        </p>

        {stores.length === 0 ? (
          <p className={styles.empty}>Stores are not available now</p>
        ) : (
          <ul className={styles.list}>
            {stores.map((store) => (
              <li key={store._id}>
                <Link href="/medicine-store" className={styles.link}>
                  <StoreCard store={store} phoneAsLink={false} />
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
