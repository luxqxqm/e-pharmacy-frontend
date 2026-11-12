import type { ReactNode } from 'react';
import clsx from 'clsx';

import styles from './Button.module.css';

type ButtonProps = {
  children: ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit';
  disabled?: boolean;
  variant?: 'primary' | 'outline' | 'danger';
  className?: string;
};

export default function Button({
  children,
  onClick,
  type = 'button',
  disabled,
  variant = 'primary',
  className,
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={clsx(styles.button, styles[variant], className)}
    >
      {children}
    </button>
  );
}
