import Link from 'next/link';
import clsx from 'clsx';

import Icon from '@/components/Icon/Icon';

import styles from './Pagination.module.css';

type PaginationProps = {
  page: number;
  totalPage: number;
  name: string;
  category: string;
};

export default function Pagination({
  page,
  totalPage,
  name,
  category,
}: PaginationProps) {
  const getHref = (pageNumber: number) => {
    const params = new URLSearchParams();
    if (category) params.set('category', category);
    if (name) params.set('name', name);
    params.set('page', String(pageNumber));
    return `/medicine?${params.toString()}`;
  };

  const pages = [];
  for (let i = 1; i <= totalPage; i++) {
    pages.push(i);
  }

  return (
    <div className={styles.pagination}>
      {page > 1 && (
        <Link
          href={getHref(page - 1)}
          className={styles.page}
          aria-label="Previous page"
        >
          <Icon name="arrow-left" size={20} />
        </Link>
      )}

      {pages.map((pageNumber) => (
        <Link
          key={pageNumber}
          href={getHref(pageNumber)}
          className={clsx(styles.page, pageNumber === page && styles.active)}
        >
          {pageNumber}
        </Link>
      ))}

      {page < totalPage && (
        <Link
          href={getHref(page + 1)}
          className={styles.page}
          aria-label="Next page"
        >
          <Icon name="arrow-right" size={20} />
        </Link>
      )}
    </div>
  );
}
