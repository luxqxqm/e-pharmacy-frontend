import Link from 'next/link';
import clsx from 'clsx';

import buttonStyles from '@/components/Button/Button.module.css';
import Icon from '@/components/Icon/Icon';
import type { Store } from '@/types';

import styles from './StoreCard.module.css';

type StoreCardProps = {
  store: Store;
  isOpen: boolean;
  phoneAsLink?: boolean;
  showVisitButton?: boolean;
};

export default function StoreCard({
  store,
  isOpen,
  phoneAsLink = true,
  showVisitButton = false,
}: StoreCardProps) {
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

      {showVisitButton && (
        <Link
          href="/medicine"
          className={clsx(
            buttonStyles.button,
            buttonStyles.primary,
            styles.button,
          )}
        >
          Visit Store
        </Link>
      )}
    </article>
  );
}
