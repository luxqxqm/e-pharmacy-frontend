'use client';

import { useState } from 'react';
import Image from 'next/image';

const NO_IMAGE = '/images/no-image.webp';

type ProductImageProps = {
  src: string;
  alt: string;
  sizes: string;
  className?: string;
  priority?: boolean;
};

// фото ліків з бекенда можуть бути порожні або биті — тоді показуємо заглушку
export default function ProductImage({
  src,
  alt,
  sizes,
  className,
  priority,
}: ProductImageProps) {
  const [hasError, setHasError] = useState(false);
  const imageSrc = !src || hasError ? NO_IMAGE : src;

  return (
    <Image
      src={imageSrc}
      alt={alt}
      fill
      sizes={sizes}
      className={className}
      priority={priority}
      onError={() => setHasError(true)}
      // картинка могла впасти ще до того, як React підключився (onError тоді не спрацює)
      ref={(img) => {
        if (img && img.complete && img.naturalWidth === 0 && !hasError) {
          setHasError(true);
        }
      }}
    />
  );
}
