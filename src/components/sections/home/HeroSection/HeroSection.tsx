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
        sizes="100vw"
      />
    </section>
  );
}
