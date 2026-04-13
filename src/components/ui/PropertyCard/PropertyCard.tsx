import Image from "next/image";
import { Link } from "@/i18n/navigation";
import type { Property } from "@/types/property";
import styles from "./PropertyCard.module.css";

type PropertyCardProps = {
  property: Property;
};

export default function PropertyCard({ property }: PropertyCardProps) {
  const {
    id,
    title,
    location,
    price,
    currency,
    period,
    rating,
    reviewCount,
    area,
    capacity,
    image,
    imagePosition,
    tag,
  } = property;

  return (
    <Link href={`/property/${id}`} className={styles.cardLink}>
      <article className={styles.card}>
        <div className={styles.imageWrapper}>
          {image ? (
            <Image
              src={image}
              alt={title}
              fill
              className={styles.image}
              sizes="(max-width: 767px) 100vw, (max-width: 1199px) 50vw, 25vw"
              style={imagePosition ? { objectPosition: imagePosition } : undefined}
            />
          ) : null}
          {tag ? <span className={styles.tag}>{tag}</span> : null}
        </div>

        <div className={styles.body}>
          <h3 className={styles.title}>{title}</h3>

          <p className={styles.location}>
            <svg
              className={styles.locationIcon}
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden
            >
              <path
                d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
                fill="currentColor"
              />
            </svg>
            {location}
          </p>

          <div className={styles.meta}>
            <span className={styles.metaItem}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path
                  d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {area} m²
            </span>
            <span className={styles.metaItem}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path
                  d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle
                  cx="9"
                  cy="7"
                  r="4"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {capacity} people
            </span>
          </div>

          <div className={styles.footer}>
            <p className={styles.price}>
              {currency}
              {price.toLocaleString()}
              <span className={styles.pricePeriod}> / {period}</span>
            </p>
            <div className={styles.rating}>
              <span className={styles.star} aria-hidden>
                ★
              </span>
              <span>{rating.toFixed(1)}</span>
              <span className={styles.reviewCount}>({reviewCount})</span>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}
