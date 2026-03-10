import Container from "@/components/ui/Container";
import styles from "./TrustedBySection.module.css";

const LOGO_SLOTS = 6;

export default function TrustedBySection() {
  return (
    <section className={styles.section}>
      <Container>
        <h2 className={styles.title}>
          Trusted by 100+ Companies across the globe!
        </h2>
        <div className={styles.logos} role="list" aria-label="Logos de empresas">
          {Array.from({ length: LOGO_SLOTS }, (_, i) => (
            <div
              key={i}
              className={styles.logoSlot}
              role="listitem"
              aria-hidden
            >
              {/* placeholder logos */}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
