import type { ReactNode } from 'react';

import styles from './StatusMessage.module.css';

type StatusMessageProps = {
  title: string;
  text?: string;
  /** Кнопка/посилання дії: "Try again", "Go home" */
  action?: ReactNode;
  headingLevel?: 'h1' | 'h2';
};

/** Один компонент для empty / error / not-found станів */
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
