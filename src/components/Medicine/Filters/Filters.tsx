'use client';

import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';

import Button from '@/components/Button/Button';
import { CATEGORIES } from '@/types';

import styles from './Filters.module.css';

type FiltersProps = {
  initialName: string;
  initialCategory: string;
};

export default function Filters({
  initialName,
  initialCategory,
}: FiltersProps) {
  const router = useRouter();
  const [name, setName] = useState(initialName);
  const [category, setCategory] = useState(initialCategory);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const params = new URLSearchParams();
    if (category) params.set('category', category);
    if (name.trim()) params.set('name', name.trim());

    router.push(`/medicine?${params.toString()}`);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <select
        className={styles.field}
        value={category}
        onChange={(event) => setCategory(event.target.value)}
        aria-label="Product category"
      >
        <option value="">Product category</option>
        {CATEGORIES.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>

      <input
        className={styles.field}
        type="search"
        placeholder="Search medicine"
        value={name}
        onChange={(event) => setName(event.target.value)}
        aria-label="Search medicine"
      />

      <Button type="submit" className={styles.button}>
        Filter
      </Button>
    </form>
  );
}
