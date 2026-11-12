import type { Metadata } from 'next';

import { ButtonLink } from '@/components/Button/Button';
import StoreCard from '@/components/StoreCard/StoreCard';
import { api } from '@/lib/api';
import type { Store } from '@/types';

import styles from './page.module.css';

export const metadata: Metadata = { title: 'Medicine store' };

export const revalidate = 3600;

async function getStores(): Promise<Store[]> {
  try {
    const { data } = await api.get<Store[]>('/stores');
    return data;
  } catch {
    return [];
  }
}

export default async function MedicineStorePage() {
  const stores = await getStores();

  return (
    <section className={styles.section}>
      <div className="container">
        <h1 className={styles.title}>Medicine store</h1>

        {stores.length === 0 ? (
          <p className={styles.empty}>Stores are not available now</p>
        ) : (
          <ul className={styles.list}>
            {stores.map((store) => (
              <li key={store._id}>
                <StoreCard
                  store={store}
                  action={
                    <ButtonLink href="/medicine" variant="primary">
                      Visit Store
                    </ButtonLink>
                  }
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
