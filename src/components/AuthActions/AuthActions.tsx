'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import clsx from 'clsx';
import toast from 'react-hot-toast';

import { useIsLoggedIn } from '@/hooks/useIsLoggedIn';
import { logout } from '@/lib/auth';

import styles from './AuthActions.module.css';

type AuthActionsProps = {
  tone?: 'default' | 'onPrimary';
  onNavigate?: () => void;
  className?: string;
};

export default function AuthActions({
  tone = 'default',
  onNavigate,
  className,
}: AuthActionsProps) {
  const router = useRouter();
  const isLoggedIn = useIsLoggedIn();

  const handleLogout = async () => {
    onNavigate?.();
    await logout();
    toast.success('You have logged out');
    router.push('/');
  };

  if (isLoggedIn) {
    return (
      <div className={clsx(styles.actions, styles[tone], className)}>
        <button
          type="button"
          className={styles.register}
          onClick={handleLogout}
        >
          Log out
        </button>
      </div>
    );
  }

  return (
    <div className={clsx(styles.actions, styles[tone], className)}>
      <Link href="/register" onClick={onNavigate} className={styles.register}>
        Register
      </Link>
      <Link href="/login" onClick={onNavigate} className={styles.login}>
        Login
      </Link>
    </div>
  );
}
