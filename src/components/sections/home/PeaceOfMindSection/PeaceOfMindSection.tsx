import Image from "next/image";
import { getTranslations } from "next-intl/server";
import Container from "@/components/ui/Container";
import RevealSection from "@/components/ui/RevealSection";
import { features } from "./features";
import styles from "./PeaceOfMindSection.module.css";

export default async function PeaceOfMindSection() {
  const t = await getTranslations("PeaceOfMindSection");

  return (
    <section className={styles.section}>
      <Container>
        <RevealSection>
          <header className={styles.header}>
            <p className={styles.eyebrow}>{t("eyebrow")}</p>
            <h2 className={styles.title}>{t("title")}</h2>
          </header>
        </RevealSection>

        <div className={styles.grid}>
          {features.map((feature, index) => (
            <RevealSection
              key={feature.id}
              delay={((index % 6) + 1) as 1 | 2 | 3 | 4 | 5 | 6}
              threshold={0.1}
            >
              <article className={styles.card}>
                <div className={styles.iconWrapper}>
                  <Image
                    src={feature.icon}
                    alt={feature.iconAlt}
                    width={24}
                    height={24}
                    className={styles.icon}
                  />
                </div>
                <h3 className={styles.cardTitle}>
                  {t(`${feature.id}.title` as Parameters<typeof t>[0])}
                </h3>
                <p className={styles.cardBody}>
                  {t(`${feature.id}.body` as Parameters<typeof t>[0])}
                </p>
              </article>
            </RevealSection>
          ))}
        </div>
      </Container>
    </section>
  );
}
