'use client';

import { useState } from 'react';
import clsx from 'clsx';

import type { Product } from '@/types';

import ProductReviews from '../ProductReviews/ProductReviews';
import styles from './ProductTabs.module.css';

type ProductTabsProps = {
  product: Product;
};

export default function ProductTabs({ product }: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState<'description' | 'reviews'>(
    'description',
  );

  return (
    <div className={styles.tabs}>
      <div className={styles.tabList} role="tablist">
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'description'}
          className={clsx(
            styles.tab,
            activeTab === 'description' && styles.active,
          )}
          onClick={() => setActiveTab('description')}
        >
          Description
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'reviews'}
          className={clsx(styles.tab, activeTab === 'reviews' && styles.active)}
          onClick={() => setActiveTab('reviews')}
        >
          Reviews
        </button>
      </div>

      <div className={styles.panel} role="tabpanel">
        {activeTab === 'description' ? (
          <p className={styles.description}>
            {/* опису поки нема на беку */}
            {product.description ??
              `${product.name} is a product from the ${product.category} category by ${product.suppliers}. A detailed description will be added soon. Always read the label and consult your doctor before use.`}
          </p>
        ) : (
          <ProductReviews />
        )}
      </div>
    </div>
  );
}
