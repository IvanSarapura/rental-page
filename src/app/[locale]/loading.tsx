import styles from "./loading.module.css";

/**
 * Global loading skeleton for the [locale] route segment.
 * Shown by Next.js during server-side data fetching transitions.
 */
export default function LoadingPage() {
  return (
    <div className={styles.wrapper} aria-label="Loading" aria-busy="true">
      <div className={styles.spinner} />
    </div>
  );
}
