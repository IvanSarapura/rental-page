import Image from "next/image";
import styles from "./HeroSection.module.css";

export default function HeroSection() {
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
          <h1 className={styles.title}>
            Rent Offices Tailored to Your Success
          </h1>
        </div>
        <div className={styles.searchWrapper}>
          <div className={styles.searchCard}>
            <span className={styles.searchMobileText}>
              Find an office near you
            </span>
            <div className={styles.searchDesktopInput}>
              <Image
                src="/icons/point.svg"
                alt=""
                width={24}
                height={24}
                className={styles.searchIcon}
                aria-hidden
              />
              <span className={styles.searchPlaceholder}>Search here</span>
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
                Search Nearby
              </button>
              <button type="button" className={styles.btnPrimary}>
                Search
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
