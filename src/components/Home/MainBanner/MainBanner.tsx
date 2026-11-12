import Image from 'next/image';

import styles from './MainBanner.module.css';

export default function MainBanner() {
  return (
    <section className={styles.banner}>
      <div className="container">
        <div className={styles.content}>
          <Image
            src="/images/hero/hero-pills.webp"
            alt=""
            width={749}
            height={508}
            sizes="(min-width: 768px) 700px, 335px"
            className={styles.image}
            priority
          />
          <h1 className={styles.title}>Your medication delivered</h1>
          <p className={styles.text}>
            Say goodbye to all your healthcare worries with us
          </p>
        </div>
      </div>
    </section>
  );
}
