import Image from "next/image";
import { getTranslations } from "next-intl/server";
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
        </div>
        <div className={styles.searchWrapper}>
          <div className={styles.searchCard}>
            <span className={styles.searchMobileText}>{t("searchNearbyLabel")}</span>
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
            <Image
              src="/icons/Search.svg"
              alt=""
              width={24}
              height={24}
              className={styles.searchMobileIcon}
              aria-hidden
            />
            <div className={styles.searchActions}>
              <button type="button" className={styles.btnSecondary}>
                {t("searchNearby")}
              </button>
              <button type="button" className={styles.btnPrimary}>
                {t("search")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
