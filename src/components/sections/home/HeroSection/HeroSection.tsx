import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import styles from "./HeroSection.module.css";

export default async function HeroSection() {
  const t = await getTranslations("HeroSection");

  return (
    <section className={styles.hero}>
      <Image
        src="/images/office1.png"
        alt="Modern office space"
        fill
        priority
        className={styles.image}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
      />
      <div className={styles.gradientOverlay} aria-hidden />
      <div className={styles.cardOverlay}>
        <div className={styles.titleWrapper}>
          <h1 className={styles.title}>{t("title")}</h1>
          <p className={styles.subtitle}>{t("subtitle")}</p>
        </div>
        <div className={styles.searchWrapper}>
          <div className={styles.searchCard}>
            {/* Mobile: toda la card es un link a /search */}
            <Link href="/search" className={styles.searchMobileLink}>
              <span className={styles.searchMobileText}>{t("searchNearbyLabel")}</span>
              <Image
                src="/icons/Search.svg"
                alt=""
                width={24}
                height={24}
                className={styles.searchMobileIcon}
                aria-hidden
              />
            </Link>

            {/* Desktop: input mock + botones de acción */}
            <div className={styles.searchDesktopInput}>
              <Image
                src="/icons/point.svg"
                alt=""
                width={24}
                height={24}
                className={styles.searchIcon}
                aria-hidden
              />
              <span className={styles.searchPlaceholder}>{t("searchPlaceholder")}</span>
            </div>
            <div className={styles.searchActions}>
              <Link href="/search?mode=nearby" className={styles.btnSecondary}>
                {t("searchNearby")}
              </Link>
              <Link href="/search" className={styles.btnPrimary}>
                {t("search")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
