import clsx from 'clsx';

import Icon from '@/components/Icon/Icon';
import Logo from '@/components/Logo/Logo';
import Navigation from '@/components/Navigation/Navigation';
import { SOCIAL_LINKS } from '@/constants/routes';

import styles from './Footer.module.css';

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

          <Navigation
            variant="plain"
            className={styles.navigation}
            label="Footer navigation"
          />

          <ul className={styles.socials}>
            {SOCIAL_LINKS.map(({ label, icon, href }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${label} (opens in a new tab)`}
                  className={styles.socialLink}
                >
                  <Icon name={icon} size={44} />
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
