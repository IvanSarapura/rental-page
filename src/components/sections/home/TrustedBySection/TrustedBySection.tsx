import { getTranslations } from "next-intl/server";
import Container from "@/components/ui/Container";
import styles from "./TrustedBySection.module.css";

export default async function TrustedBySection() {
  const t = await getTranslations("TrustedBySection");

  return (
    <section className={styles.section}>
      <Container>
        <h2 className={styles.title}>
          <span className={styles.titleLinePrimary}>{t("line1")}</span>{" "}
          <span className={styles.titleLineSecondary}>{t("line2")}</span>
        </h2>
      </Container>
    </section>
  );
}
