import Image from "next/image";
import styles from "./LogosSection.module.css";
import LogoCarousel from "./LogoCarousel";
import { logos } from "./logos";

export default function LogosSection() {
  return (
    <section className={styles.section} aria-label="Companies that trust us">
      {/* Desktop: estático y centrado */}
      <div className={styles.staticLogos}>
        {logos.map((logo) => (
          <div key={logo.alt} className={styles.staticItem}>
            <Image
              src={logo.src}
              alt={logo.alt}
              width={120}
              height={40}
              className={styles.staticLogo}
            />
          </div>
        ))}
      </div>

      {/* Mobile: carrusel infinito */}
      <div className={styles.carouselWrapper}>
        <LogoCarousel logos={logos} duration={22} />
      </div>
    </section>
  );
}
