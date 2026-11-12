import Icon from '@/components/Icon/Icon';
import ProductImage from '@/components/ProductImage/ProductImage';
import type { Product } from '@/types';
import { formatPrice } from '@/utils/formatPrice';

import QuantityAddToCart from '../QuantityAddToCart/QuantityAddToCart';
import styles from './ProductOverview.module.css';

type ProductOverviewProps = {
  product: Product;
};

export default function ProductOverview({ product }: ProductOverviewProps) {
  return (
    <div className={styles.overview}>
      <div className={styles.imageWrapper}>
        <ProductImage
          src={product.photo}
          alt={product.name}
          sizes="(min-width: 1440px) 364px, (min-width: 768px) 364px, 335px"
          className={styles.image}
          priority
        />
      </div>

      <div className={styles.info}>
        <div className={styles.heading}>
          <h1 className={styles.name}>{product.name}</h1>
          <p className={styles.price}>{formatPrice(product.price)}</p>
        </div>

        <p className={styles.brand}>Brand: {product.suppliers}</p>

        {product.rating !== undefined && (
          <p className={styles.rating}>
            <Icon name="star" size={16} className={styles.star} />
            {product.rating}
          </p>
        )}

        {product.stock > 0 ? (
          <QuantityAddToCart productId={product._id} stock={product.stock} />
        ) : (
          <p className={styles.outOfStock}>Out of stock</p>
        )}
      </div>
    </div>
  );
}
