import type { ReactNode } from 'react';
import clsx from 'clsx';

import Icon from '@/components/Icon/Icon';
import type { Store } from '@/types';
import { isStoreOpen } from '@/utils/isStoreOpen';

import styles from './StoreCard.module.css';

type StoreCardProps = {
  store: Store;
  phoneAsLink?: boolean;
  action?: ReactNode;
};

export default function StoreCard({
  store,
  phoneAsLink = true,
  action,
}: StoreCardProps) {
  const isOpen = isStoreOpen(store._id);
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

      {action && <div className={styles.action}>{action}</div>}
    </article>
  );
}
