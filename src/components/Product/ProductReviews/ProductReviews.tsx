'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

import { api } from '@/lib/api';
import type { CustomerReview } from '@/types';

import styles from './ProductReviews.module.css';

// окремих відгуків до товару на бекенді нема,
// тому показуємо загальні відгуки з /customer-reviews (однакові для всіх товарів)
export default function ProductReviews() {
  const [reviews, setReviews] = useState<CustomerReview[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    api
      .get<CustomerReview[]>('/customer-reviews')
      .then(({ data }) => setReviews(data))
      .catch(() => setReviews([]))
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) return <p className={styles.message}>Loading reviews...</p>;

  if (reviews.length === 0) {
    return <p className={styles.message}>No reviews yet</p>;
  }

  return (
    <ul className={styles.list}>
      {reviews.map((review, index) => (
        <li key={review._id} className={styles.review}>
          <div className={styles.top}>
            <Image
              src={
                review.photo ?? `/images/reviews/avatar-${(index % 3) + 1}.webp`
              }
              alt={review.name}
              width={44}
              height={44}
              className={styles.avatar}
            />
            <p className={styles.name}>{review.name}</p>
          </div>
          <p className={styles.comment}>{review.testimonial}</p>
        </li>
      ))}
    </ul>
  );
}
