'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import clsx from 'clsx';

import buttonStyles from '@/components/Button/Button.module.css';
import Icon from '@/components/Icon/Icon';

import styles from './AuthModal.module.css';

type AuthModalProps = {
  onClose: () => void;
};

export default function AuthModal({ onClose }: AuthModalProps) {
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
      <div
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby="auth-modal-title"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          className={styles.close}
          onClick={onClose}
          aria-label="Close"
        >
          <Icon name="close" size={24} />
        </button>

        <h2 id="auth-modal-title" className={styles.title}>
          Log in to continue
        </h2>
        <p className={styles.text}>
          To add products to the cart, please log in or create an account.
        </p>

        <div className={styles.actions}>
          <Link
            href="/login"
            className={clsx(buttonStyles.button, buttonStyles.primary)}
          >
            Log in
          </Link>
          <Link
            href="/register"
            className={clsx(buttonStyles.button, buttonStyles.outline)}
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}
