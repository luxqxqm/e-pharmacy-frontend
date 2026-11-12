import type { Metadata } from 'next';
import Link from 'next/link';
import clsx from 'clsx';

import buttonStyles from '@/components/Button/Button.module.css';
import Icon from '@/components/Icon/Icon';

import styles from './page.module.css';

export const metadata: Metadata = { title: 'Features' };

const features = [
  {
    title: 'Secure delivery',
    text: 'Every order is packed and sealed in the pharmacy and delivered straight to your door. Medicines that need special conditions travel in temperature-controlled packaging.',
  },
  {
    title: 'Verified pharmacies',
    text: 'We work only with licensed pharmacies, so every product in the catalog comes from a trusted supplier.',
  },
  {
    title: 'Fast checkout',
    text: 'Add medicines to the cart, enter your shipping info and pay with cash on delivery or by bank card.',
  },
  {
    title: 'Nearest store',
    text: 'Find a pharmacy near you, check its rating and opening status before you go.',
  },
];

export default function FeaturesPage() {
  return (
    <section className={styles.section}>
      <div className="container">
        <h1 className={styles.title}>Features</h1>
        <p className={styles.subtitle}>
          Why thousands of people choose E-Pharmacy to get their medicine
        </p>

        <ul className={styles.list}>
          {features.map((feature) => (
            <li key={feature.title} className={styles.card}>
              <span className={styles.icon}>
                <Icon name="bolt" size={20} />
              </span>
              <h2 className={styles.cardTitle}>{feature.title}</h2>
              <p className={styles.cardText}>{feature.text}</p>
            </li>
          ))}
        </ul>

        <Link
          href="/medicine"
          className={clsx(
            buttonStyles.button,
            buttonStyles.primary,
            styles.button,
          )}
        >
          Buy medicine
        </Link>
      </div>
    </section>
  );
}
