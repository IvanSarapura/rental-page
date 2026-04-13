import Image from "next/image";
import { getTranslations } from "next-intl/server";
import Container from "@/components/ui/Container";
import { spotlights } from "./spotlights";
import type { SplitCard } from "./spotlights";
import styles from "./OfficeSpotlightSection.module.css";

type TextSideProps = {
  eyebrow: string;
  title: string;
  body: string;
  cta: string;
};

function TextSide({ eyebrow, title, body, cta }: TextSideProps) {
  return (
    <div className={styles.textSide}>
      <p className={styles.eyebrow}>{eyebrow}</p>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.body}>{body}</p>
      <a href="#" className={styles.cta}>
        {cta}
      </a>
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

export default async function OfficeSpotlightSection() {
  const t = await getTranslations("OfficeSpotlightSection");

  return (
    <section className={styles.section}>
      <Container>
        <div className={styles.stack}>
          {spotlights.map((card) => {
            const key = card.id as Parameters<typeof t>[0];
            const textProps: TextSideProps = {
              eyebrow: t(`${key}.eyebrow` as Parameters<typeof t>[0]),
              title: t(`${key}.title` as Parameters<typeof t>[0]),
              body: t(`${key}.body` as Parameters<typeof t>[0]),
              cta: t(`${key}.cta` as Parameters<typeof t>[0]),
            };

            return (
              <div key={card.id} className={styles.card}>
                {card.layout === "text-image" ? (
                  <>
                    <TextSide {...textProps} />
                    <ImageSide image={card.image} />
                  </>
                ) : (
                  <>
                    <ImageSide image={card.image} />
                    <TextSide {...textProps} />
                  </>
                )}
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
