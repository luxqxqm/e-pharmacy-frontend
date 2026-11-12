import type { Metadata } from 'next';
import Link from 'next/link';
import clsx from 'clsx';

import buttonStyles from '@/components/Button/Button.module.css';

import styles from './not-found.module.css';

export const metadata: Metadata = { title: 'Page not found' };

export default function NotFound() {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Page not found</h1>
      <p className={styles.text}>
        The page you are looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/home"
        className={clsx(buttonStyles.button, buttonStyles.primary)}
      >
        Go to home
      </Link>
    </div>
  );
}
