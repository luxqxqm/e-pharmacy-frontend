import clsx from 'clsx';

import Icon from '@/components/Icon/Icon';
import type { Store } from '@/types';
import { isStoreOpen } from '@/utils/isStoreOpen';

import styles from './StoreCard.module.css';

type StoreCardProps = {
  store: Store;
  // якщо вся картка вже посилання, телефон не можна робити <a> (a в a — невалідно)
  phoneAsLink?: boolean;
};

export default function StoreCard({
  store,
  phoneAsLink = true,
}: StoreCardProps) {
  const isOpen = isStoreOpen();
  // для tel: лишаємо тільки цифри і +
  const phoneHref = store.phone.replace(/[^\d+]/g, '');

  return (
    <article className={styles.card}>
      <div className={styles.top}>
        <h3 className={styles.name}>{store.name}</h3>

        <div className={styles.meta}>
          <span className={styles.rating}>
            <Icon name="star" size={16} className={styles.star} />
            {store.rating}
          </span>
          <span className={clsx(styles.status, !isOpen && styles.closed)}>
            {isOpen ? 'OPEN' : 'CLOSE'}
          </span>
        </div>
      </div>

      <ul className={styles.info}>
        <li className={styles.infoItem}>
          <Icon name="map-pin" size={18} className={styles.icon} />
          <span>
            {store.address}
            <br />
            {store.city}
          </span>
        </li>
        <li>
          {phoneAsLink ? (
            <a href={`tel:${phoneHref}`} className={styles.infoItem}>
              <Icon name="phone" size={18} className={styles.icon} />
              {store.phone}
            </a>
          ) : (
            <span className={styles.infoItem}>
              <Icon name="phone" size={18} className={styles.icon} />
              {store.phone}
            </span>
          )}
        </li>
      </ul>
    </article>
  );
}
