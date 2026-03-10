import Image from "next/image";
import Container from "@/components/ui/Container";
import { features } from "./features";
import styles from "./PeaceOfMindSection.module.css";

export default function PeaceOfMindSection() {
  return (
    <section className={styles.section}>
      <Container>
        <header className={styles.header}>
          <h2 className={styles.title}>Giving you peace of mind</h2>
        </header>

        <div className={styles.grid}>
          {features.map((feature) => (
            <article key={feature.id} className={styles.card}>
              <div className={styles.iconWrapper}>
                <Image
                  src={feature.icon}
                  alt={feature.iconAlt}
                  width={24}
                  height={24}
                  className={styles.icon}
                />
              </div>
              <h3 className={styles.cardTitle}>{feature.title}</h3>
              <p className={styles.cardBody}>{feature.body}</p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
