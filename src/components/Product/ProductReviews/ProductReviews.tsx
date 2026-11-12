'use client';

import { useEffect, useState } from 'react';

import Button from '@/components/Button/Button';
import Icon from '@/components/Icon/Icon';
import { api } from '@/lib/api';
import type { ProductReview, ProductReviewsResponse } from '@/types';

import styles from './ProductReviews.module.css';

type ProductReviewsProps = {
  productId: string;
};

export default function ProductReviews({ productId }: ProductReviewsProps) {
  const [reviews, setReviews] = useState<ProductReview[]>([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadReviews = async () => {
      setIsLoading(true);
      try {
        // ендпоінт ще треба додати на бекенд, поки буде порожньо
        const { data } = await api.get<ProductReviewsResponse>(
          `/products/${productId}/reviews`,
          { params: { page, perPage: 3 } },
        );
        setReviews(data.reviews);
        setTotalPage(data.totalPage);
      } catch {
        setReviews([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadReviews();
  }, [productId, page]);

  if (isLoading) return <p className={styles.message}>Loading reviews...</p>;

  if (reviews.length === 0) {
    return <p className={styles.message}>No reviews for this product yet</p>;
  }

  return (
    <div>
      <ul className={styles.list}>
        {reviews.map((review) => (
          <li key={review._id} className={styles.review}>
            <div className={styles.top}>
              <div>
                <p className={styles.name}>{review.name}</p>
                <p className={styles.date}>
                  {new Date(review.createdAt).toLocaleDateString('en-GB')}
                </p>
              </div>
              <div
                className={styles.stars}
                aria-label={`Rating ${review.rating} of 5`}
              >
                {[1, 2, 3, 4, 5].map((star) => (
                  <Icon
                    key={star}
                    name="star"
                    size={16}
                    className={
                      star <= review.rating ? styles.starFull : styles.starEmpty
                    }
                  />
                ))}
              </div>
            </div>
            <p className={styles.comment}>{review.comment}</p>
          </li>
        ))}
      </ul>

      {totalPage > 1 && (
        <div className={styles.pagination}>
          <Button
            variant="outline"
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
          >
            Previous
          </Button>
          <span>
            {page} / {totalPage}
          </span>
          <Button
            variant="outline"
            onClick={() => setPage(page + 1)}
            disabled={page === totalPage}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}
