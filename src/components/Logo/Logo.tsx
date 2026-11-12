import Image from 'next/image';
import Link from 'next/link';
import clsx from 'clsx';

import { ROUTES } from '@/constants/routes';

import styles from './Logo.module.css';

type LogoProps = {
  variant?: 'default' | 'light';
  className?: string;
};

export default function Logo({ variant = 'default', className }: LogoProps) {
  const src =
    variant === 'light'
      ? '/images/brand/logo-white.webp'
      : '/images/brand/logo.webp';

  return (
    <Link href={ROUTES.home} className={clsx(styles.logo, className)}>
      <Image
        src={src}
        alt="E-Pharmacy"
        width={172}
        height={44}
        className={styles.image}
      />
    </Link>
  );
}
