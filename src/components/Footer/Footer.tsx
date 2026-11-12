import Link from 'next/link';
import clsx from 'clsx';

import Icon from '@/components/Icon/Icon';
import Logo from '@/components/Logo/Logo';

import styles from './Footer.module.css';

const links = [
  { href: '/', label: 'Home' },
  { href: '/medicine-store', label: 'Medicine store' },
  { href: '/medicine', label: 'Medicine' },
];

const socials = [
  {
    label: 'Facebook',
    icon: 'facebook',
    href: 'https://www.facebook.com/goITclub/',
  },
  {
    label: 'Instagram',
    icon: 'instagram',
    href: 'https://www.instagram.com/goitclub/',
  },
  {
    label: 'YouTube',
    icon: 'youtube',
    href: 'https://www.youtube.com/c/GoIT',
  },
];

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={clsx('container', styles.inner)}>
        <div className={styles.top}>
          <div className={styles.brand}>
            <Logo variant="light" />
            <p className={styles.text}>
              Get the medicine to help you feel better, get back to your active
              life, and enjoy every moment.
            </p>
          </div>

          <ul className={styles.navigation}>
            {links.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className={styles.navLink}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <ul className={styles.socials}>
            {socials.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className={styles.socialLink}
                >
                  <Icon name={social.icon} size={44} />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.bottom}>
          <p>© E-Pharmacy 2023. All Rights Reserved</p>
          <ul className={styles.legal}>
            <li>Privacy Policy</li>
            <li>Terms &amp; Conditions</li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
