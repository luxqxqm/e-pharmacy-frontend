import Image from 'next/image';

import { api } from '@/lib/api';
import type { CustomerReview } from '@/types';

import styles from './Reviews.module.css';

async function getReviews(): Promise<CustomerReview[]> {
  try {
    const { data } = await api.get<CustomerReview[]>('/customer-reviews');
    return data;
  } catch {
    return [];
  }
}

export default async function Reviews() {
  const reviews = await getReviews();

  return (
    <section className={styles.section}>
      <div className="container">
        <h2 className={styles.title}>Reviews</h2>
        <p className={styles.subtitle}>
          Search for Medicine, Filter by your location
        </p>

        {reviews.length === 0 ? (
          <p className={styles.empty}>No reviews yet</p>
        ) : (
          <ul className={styles.list}>
            {reviews.map((review, index) => (
              <li key={review._id} className={styles.card}>
                <Image
                  src={
                    review.photo ??
                    `/images/reviews/avatar-${(index % 3) + 1}.webp`
                  }
                  alt={review.name}
                  width={64}
                  height={64}
                  className={styles.avatar}
                />
                <h3 className={styles.name}>{review.name}</h3>
                <p className={styles.text}>{review.testimonial}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
