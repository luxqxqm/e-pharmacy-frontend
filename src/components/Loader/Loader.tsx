import styles from './Loader.module.css';

type LoaderProps = {
  label?: string;
};

/** Render free tier прокидається до ~1 хв, тому підказуємо, що чекати нормально */
export default function Loader({ label = 'Loading…' }: LoaderProps) {
  return (
    <div className={styles.wrapper} role="status" aria-live="polite">
      <span className={styles.spinner} aria-hidden="true" />
      <p className={styles.label}>{label}</p>
      <p className={styles.hint}>
        The first load may take up to a minute while the server wakes up.
      </p>
    </div>
  );
}
