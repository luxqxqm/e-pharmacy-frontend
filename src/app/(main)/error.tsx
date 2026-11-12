'use client';

import Button from '@/components/Button/Button';

import styles from '../not-found.module.css';

export default function Error({ reset }: { reset: () => void }) {
  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>Something went wrong</h2>
      <p className={styles.text}>
        We couldn&apos;t load this page. The server may be waking up, please try
        again.
      </p>
      <Button onClick={reset}>Try again</Button>
    </div>
  );
}
