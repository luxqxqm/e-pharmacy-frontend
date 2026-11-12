'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

import { NAV_LINKS, isNavLinkActive } from '@/constants/routes';

import styles from './Navigation.module.css';

type NavigationProps = {
  /** pills: меню-«пігулки» в хедері; plain: прості посилання у футері */
  variant?: 'pills' | 'plain';
  onNavigate?: () => void;
  className?: string;
  label?: string;
};

export default function Navigation({
  variant = 'pills',
  onNavigate,
  className,
  label = 'Main navigation',
}: NavigationProps) {
  const pathname = usePathname();

  return (
    <nav aria-label={label} className={className}>
      <ul className={clsx(styles.list, styles[variant])}>
        {NAV_LINKS.map(({ href, label: text }) => {
          const isActive = isNavLinkActive(href, pathname);

          return (
            <li key={href}>
              <Link
                href={href}
                onClick={onNavigate}
                aria-current={isActive ? 'page' : undefined}
                className={clsx(styles.link, isActive && styles.active)}
              >
                {text}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
