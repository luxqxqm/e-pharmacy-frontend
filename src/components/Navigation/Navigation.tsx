'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

import styles from './Navigation.module.css';

const links = [
  { href: '/home', label: 'Home' },
  { href: '/medicine-store', label: 'Medicine store' },
  { href: '/medicine', label: 'Medicine' },
];

type NavigationProps = {
  onNavigate?: () => void;
  className?: string;
};

export default function Navigation({ onNavigate, className }: NavigationProps) {
  const pathname = usePathname();

  return (
    <nav className={className}>
      <ul className={styles.list}>
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              onClick={onNavigate}
              className={clsx(
                styles.link,
                pathname === link.href && styles.active,
              )}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
