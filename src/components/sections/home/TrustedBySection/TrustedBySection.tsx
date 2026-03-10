import Container from "@/components/ui/Container";
import styles from "./TrustedBySection.module.css";

export default function TrustedBySection() {
  return (
    <section className={styles.section}>
      <Container>
        <h2 className={styles.title}>
          <span className={styles.titleLinePrimary}>Trusted by 100+ Companies</span>{" "}
          <span className={styles.titleLineSecondary}>across the globe!</span>
        </h2>
      </Container>
    </section>
  );
}
