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

  const start = Math.max(1, Math.min(page - 2, totalPage - 4));
  const end = Math.min(totalPage, start + 4);
  const pages = [];
  for (let i = start; i <= end; i++) pages.push(i);

  return (
    <nav className={styles.pagination} aria-label="Pagination">
      {page > 1 ? (
        <Link
          href={getHref(page - 1)}
          className={styles.arrow}
          aria-label="Previous page"
        >
          <Icon name="arrow-left" size={20} />
        </Link>
      ) : (
        <span
          className={clsx(styles.arrow, styles.disabled)}
          aria-hidden="true"
        >
          <Icon name="arrow-left" size={20} />
        </span>
      )}

      <ul className={styles.list}>
        {pages.map((pageNumber) => (
          <li key={pageNumber}>
            <Link
              href={getHref(pageNumber)}
              className={clsx(
                styles.page,
                pageNumber === page && styles.active,
              )}
              aria-current={pageNumber === page ? 'page' : undefined}
            >
              {pageNumber}
            </Link>
          </li>
        ))}
      </ul>

      {page < totalPage ? (
        <Link
          href={getHref(page + 1)}
          className={styles.arrow}
          aria-label="Next page"
        >
          <Icon name="arrow-right" size={20} />
        </Link>
      ) : (
        <span
          className={clsx(styles.arrow, styles.disabled)}
          aria-hidden="true"
        >
          <Icon name="arrow-right" size={20} />
        </span>
      )}
    </nav>
  );
}
