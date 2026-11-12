import Image from 'next/image';
import Link from 'next/link';

import Icon from '@/components/Icon/Icon';

import styles from './AddPharmacy.module.css';

const features = [
  'Take user orders form online',
  'Create your shop profile',
  'Manage your store',
  'Get more orders',
  'Storage shed',
];

export default function AddPharmacy() {
  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.banner}>
          <div className={styles.content}>
            <h2 className={styles.title}>Add your local pharmacy online now</h2>
            <p className={styles.text}>
              Enjoy the convenience of having your prescriptions filled from
              home by connecting with your community pharmacy through our online
              platform.
            </p>
            <Link href="/medicine-store" className={styles.button}>
              Buy medicine
            </Link>
          </div>

          <Image
            src="/images/add-medicines.webp"
            alt="Woman consulting a doctor online"
            width={600}
            height={406}
            sizes="(min-width: 1440px) 608px, (min-width: 768px) 608px, 295px"
            className={styles.image}
          />
        </div>

        <ul className={styles.features}>
          {features.map((feature) => (
            <li key={feature} className={styles.feature}>
              <span className={styles.bolt}>
                <Icon name="bolt" size={16} />
              </span>
              {feature}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
