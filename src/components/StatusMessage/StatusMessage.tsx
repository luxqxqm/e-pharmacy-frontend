import type { ReactNode } from 'react';

import styles from './StatusMessage.module.css';

type StatusMessageProps = {
  title: string;
  text?: string;
  action?: ReactNode;
  headingLevel?: 'h1' | 'h2';
};

export default function StatusMessage({
  title,
  text,
  action,
  headingLevel: Heading = 'h2',
}: StatusMessageProps) {
  return (
    <div className={styles.wrapper}>
      <Heading className={styles.title}>{title}</Heading>
      {text && <p className={styles.text}>{text}</p>}
      {action}
    </div>
  );
}
