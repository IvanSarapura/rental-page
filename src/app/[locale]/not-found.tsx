import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import Container from "@/components/ui/Container";
import styles from "./not-found.module.css";

export default async function NotFound() {
  const t = await getTranslations("NotFound");

  return (
    <main className={styles.wrapper}>
      <Container>
        <div className={styles.inner}>
          <p className={styles.code}>404</p>
          <h1 className={styles.title}>{t("title")}</h1>
          <p className={styles.description}>{t("description")}</p>
          <Link href="/" className={styles.backLink}>
            {t("backLink")}
          </Link>
        </div>
      </Container>
    </main>
  );
}
