import type { ComponentProps } from 'react';
import Link from 'next/link';
import clsx from 'clsx';

import styles from './Button.module.css';

type Variant = 'primary' | 'outline' | 'danger';

type CommonProps = {
  variant?: Variant;
  fullWidth?: boolean;
};

type ButtonProps = ComponentProps<'button'> & CommonProps;
type ButtonLinkProps = ComponentProps<typeof Link> & CommonProps;

function getClassName(
  { variant = 'primary', fullWidth }: CommonProps,
  className?: string,
) {
  return clsx(
    styles.button,
    styles[variant],
    fullWidth && styles.fullWidth,
    className,
  );
}

export default function Button({
  variant,
  fullWidth,
  className,
  type = 'button',
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={getClassName({ variant, fullWidth }, className)}
      {...props}
    />
  );
}

/** Посилання, що виглядає як кнопка (навігація — це <a>, а не <button>) */
export function ButtonLink({
  variant,
  fullWidth,
  className,
  ...props
}: ButtonLinkProps) {
  return (
    <Link
      className={getClassName({ variant, fullWidth }, className)}
      {...props}
    />
  );
}
