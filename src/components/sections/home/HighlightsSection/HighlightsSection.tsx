import Image from "next/image";
import Container from "@/components/ui/Container";
import { highlights } from "./highlights";
import type { SplitCard } from "./highlights";
import styles from "./HighlightsSection.module.css";

function TextSide({ text }: { text: SplitCard["text"] }) {
  return (
    <div className={styles.textSide}>
      <p className={styles.eyebrow}>{text.eyebrow}</p>
      <h3 className={styles.title}>{text.title}</h3>
      <p className={styles.body}>{text.body}</p>
      <a href="#" className={styles.cta}>{text.cta}</a>
    </div>
  );
}

function ImageSide({ image }: { image: SplitCard["image"] }) {
  return (
    <div className={styles.imageSide}>
      <Image
        src={image.src}
        alt={image.alt}
        fill
        className={styles.image}
        style={image.imagePosition ? { objectPosition: image.imagePosition } : undefined}
        sizes="(max-width: 767px) 100vw, 50vw"
      />
    </div>
  );
}

export default function HighlightsSection() {
  return (
    <section className={styles.section}>
      <Container>
        <div className={styles.stack}>
          {highlights.map((card) => (
            <div key={card.id} className={styles.card}>
              {card.layout === "text-image" ? (
                <>
                  <TextSide text={card.text} />
                  <ImageSide image={card.image} />
                </>
              ) : (
                <>
                  <ImageSide image={card.image} />
                  <TextSide text={card.text} />
                </>
              )}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
