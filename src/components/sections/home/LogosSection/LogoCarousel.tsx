import Image from "next/image";
import type { Logo } from "./logos";
import styles from "./LogoCarousel.module.css";

type LogoCarouselProps = {
  logos: readonly Logo[];
  /** Duración del loop completo en segundos. Default: 22 */
  duration?: number;
};

export default function LogoCarousel({
  logos,
  duration = 22,
}: LogoCarouselProps) {
  return (
    <div
      className={styles.wrapper}
      style={{ "--carousel-duration": `${duration}s` } as React.CSSProperties}
      aria-hidden
    >
      {/* Dos copias del track para loop continuo sin salto */}
      <div className={styles.track}>
        {[...logos, ...logos].map((logo, i) => (
          <div key={i} className={styles.item}>
            <Image
              src={logo.src}
              alt={logo.alt}
              width={120}
              height={40}
              className={styles.logo}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
