"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Container from "@/components/ui/Container";
import styles from "./error.module.css";

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

/**
 * Global error boundary for the [locale] route segment.
 * Catches unhandled errors in Server and Client Components.
 */
export default function ErrorPage({ error, reset }: ErrorPageProps) {
  const t = useTranslations("Error");

  useEffect(() => {
    // Log to an error reporting service (e.g. Sentry) when integrated
    console.error(error);
  }, [error]);

  return (
    <main className={styles.wrapper}>
      <Container>
        <div className={styles.inner}>
          <p className={styles.code}>500</p>
          <h1 className={styles.title}>{t("title")}</h1>
          <p className={styles.description}>{t("description")}</p>
          <div className={styles.actions}>
            <button type="button" className={styles.retryBtn} onClick={reset}>
              {t("tryAgain")}
            </button>
            <Link href="/" className={styles.homeLink}>
              {t("backHome")}
            </Link>
          </div>
        </div>
      </Container>
    </main>
  );
}
