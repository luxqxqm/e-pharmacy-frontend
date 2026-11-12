'use client';

import { useEffect } from 'react';

import AuthActions from '@/components/AuthActions/AuthActions';
import Icon from '@/components/Icon/Icon';
import Navigation from '@/components/Navigation/Navigation';

import styles from './MobileMenu.module.css';

type MobileMenuProps = {
  onClose: () => void;
};

export default function MobileMenu({ onClose }: MobileMenuProps) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.menu} onClick={(event) => event.stopPropagation()}>
        <button
          type="button"
          className={styles.close}
          onClick={onClose}
          aria-label="Close menu"
        >
          <Icon name="close" size={32} />
        </button>

        <Navigation onNavigate={onClose} className={styles.navigation} />

        <AuthActions
          tone="onPrimary"
          onNavigate={onClose}
          className={styles.auth}
        />
      </div>
    </div>
  );
}
