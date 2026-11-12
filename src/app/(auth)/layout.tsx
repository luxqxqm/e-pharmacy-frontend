import Image from 'next/image';
import clsx from 'clsx';

import Logo from '@/components/Logo/Logo';

import styles from './layout.module.css';

export default function AuthLayout({ children }: LayoutProps<'/'>) {
  return (
    <div className={styles.page}>
      <div className={clsx('container', styles.inner)}>
        <header className={styles.header}>
          <Logo />
        </header>

        <main className={styles.content}>
          <div className={styles.promo}>
            <Image
              src="/images/decor/tablet.webp"
              alt=""
              width={179}
              height={175}
              className={styles.tablet}
              priority
            />
            <h1 className={styles.title}>
              Your medication, delivered Say goodbye to all{' '}
              <span className={styles.accent}>your healthcare</span> worries
              with us
            </h1>
          </div>

          {children}
        </main>
      </div>

      <Image
        src="/images/decor/stripes.webp"
        alt=""
        width={279}
        height={257}
        className={styles.stripes}
      />
    </div>
  );
}
