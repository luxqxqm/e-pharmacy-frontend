'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

import AuthActions from '@/components/AuthActions/AuthActions';
import Icon from '@/components/Icon/Icon';
import Logo from '@/components/Logo/Logo';
import MobileMenu from '@/components/MobileMenu/MobileMenu';
import Navigation from '@/components/Navigation/Navigation';

import styles from './Header.module.css';

export default function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // на головній хедер зелений
  const isHome = pathname === '/home';

  return (
    <header className={clsx(styles.header, isHome && styles.hero)}>
      <div className={clsx('container', styles.inner)}>
        <Logo variant={isHome ? 'light' : 'default'} />

        <Navigation className={styles.navigation} />

        <div className={styles.actions}>
          <AuthActions
            tone={isHome ? 'onPrimary' : 'default'}
            className={styles.auth}
          />

          <button
            type="button"
            className={styles.burger}
            onClick={() => setIsMenuOpen(true)}
            aria-label="Open menu"
          >
            <Icon name="menu" size={32} />
          </button>
        </div>
      </div>

      {isMenuOpen && <MobileMenu onClose={() => setIsMenuOpen(false)} />}
    </header>
  );
}
