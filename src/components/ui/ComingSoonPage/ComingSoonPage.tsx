import styles from "./ComingSoonPage.module.css";

type ComingSoonPageProps = {
  eyebrow: string;
  title: string;
  description: string;
};

/**
 * Full-page placeholder used by routes that are not yet implemented.
 * Renders a centered layout with an eyebrow label, a heading, and a body.
 */
export default function ComingSoonPage({ eyebrow, title, description }: ComingSoonPageProps) {
  return (
    <main className={styles.wrapper}>
      <div className={styles.inner}>
        <p className={styles.eyebrow}>{eyebrow}</p>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.description}>{description}</p>
      </div>
    </main>
  );
}
