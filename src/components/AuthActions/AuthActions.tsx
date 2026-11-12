import Link from 'next/link';
import clsx from 'clsx';

import { ROUTES } from '@/constants/routes';

import styles from './AuthActions.module.css';

type AuthActionsProps = {
  /** onPrimary: білі кнопки на зеленому фоні (hero, мобільне меню) */
  tone?: 'default' | 'onPrimary';
  onNavigate?: () => void;
  className?: string;
};

export default function AuthActions({
  tone = 'default',
  onNavigate,
  className,
}: AuthActionsProps) {
  return (
    <div className={clsx(styles.actions, styles[tone], className)}>
      <Link
        href={ROUTES.register}
        onClick={onNavigate}
        className={styles.register}
      >
        Register
      </Link>
      <Link href={ROUTES.login} onClick={onNavigate} className={styles.login}>
        Login
      </Link>
    </div>
  );
}
