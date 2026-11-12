import Link from 'next/link';

import styles from './PromoBanners.module.css';

// у бекенді нема знижок, тому "Shop now" веде на каталог з категорією
const banners = [
  {
    title: 'Huge Sale',
    value: '70%',
    linkText: 'Shop now',
    href: '/medicine?category=Medicine',
  },
  {
    title: 'Secure delivery',
    value: '100%',
    linkText: 'Read more',
    href: '/features',
  },
  {
    title: 'Off',
    value: '35%',
    linkText: 'Shop now',
    href: '/medicine?category=Heart',
  },
];

export default function PromoBanners() {
  return (
    <section className={styles.section}>
      <div className="container">
        <ul className={styles.list}>
          {banners.map((banner, index) => (
            <li key={banner.title} className={styles.card}>
              <div className={styles.top}>
                <span className={styles.number}>{index + 1}</span>
                <h2 className={styles.title}>{banner.title}</h2>
              </div>
              <div className={styles.bottom}>
                <p className={styles.value}>{banner.value}</p>
                <Link href={banner.href} className={styles.link}>
                  {banner.linkText}
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
