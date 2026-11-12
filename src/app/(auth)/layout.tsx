import clsx from 'clsx';

import Logo from '@/components/Logo/Logo';

import styles from './layout.module.css';

/** Login / Register: без SharedLayout, тільки шапка з логотипом */
export default function AuthLayout({ children }: LayoutProps<'/'>) {
  return (
    <div className={styles.layout}>
      <header className={clsx('container', styles.header)}>
        <Logo />
      </header>
      <main className={styles.main}>{children}</main>
    </div>
  );
}
