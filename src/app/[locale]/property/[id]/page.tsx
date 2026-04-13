import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import Container from "@/components/ui/Container";
import { getAllPropertyIds, getPropertyById, resolveAmenities } from "@/services/propertyService";
import styles from "./PropertyDetail.module.css";

// ─── Static generation ────────────────────────────────────────────────────────

export function generateStaticParams() {
  return getAllPropertyIds().map((id) => ({ id }));
}

// ─── Metadata ─────────────────────────────────────────────────────────────────

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const property = getPropertyById(id);
  if (!property) return { title: "Property not found" };
  return {
    title: `${property.title} — Rental`,
    description: property.description,
  };
}

// ─── Page ─────────────────────────────────────────────────────────────────────

type Props = { params: Promise<{ id: string }> };

export default async function PropertyPage({ params }: Props) {
  const { id } = await params;
  const [property, t] = await Promise.all([
    Promise.resolve(getPropertyById(id)),
    getTranslations("PropertyDetail"),
  ]);

  if (!property) {
    return (
      <main className={styles.page}>
        <Container>
          <div className={styles.notFound}>
            <p className={styles.notFoundCode}>404</p>
            <h1 className={styles.notFoundTitle}>{t("notFoundTitle")}</h1>
            <p className={styles.notFoundText}>{t("notFoundDescription")}</p>
            <Link href="/#offices" className={styles.notFoundLink}>
              {t("notFoundBackLink")}
            </Link>
          </div>
        </Container>
      </main>
    );
  }

  const {
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
    type,
    available,
    description,
    amenityIds,
    images,
  } = property;

  const resolvedAmenities = resolveAmenities(amenityIds);

  const galleryImages = images.slice(1);

  return (
    <main className={styles.page}>
      <Container>
        {/* ── Back link ── */}
        <Link href="/#offices" className={styles.back}>
          <span className={styles.backArrow} aria-hidden>
            ←
          </span>
          {t("backLink")}
        </Link>

        {/* ── Hero (image + info panel) ── */}
        <div className={styles.hero}>
          {/* Main image */}
          <div className={styles.imageWrapper}>
            <Image
              src={image}
              alt={title}
              fill
              priority
              className={styles.image}
              sizes="(max-width: 991px) 100vw, 60vw"
              style={imagePosition ? { objectPosition: imagePosition } : undefined}
            />
            {tag && <span className={styles.tag}>{tag}</span>}
            {!available && <span className={styles.unavailableBadge}>{t("notAvailable")}</span>}
          </div>

          {/* Info panel */}
          <aside className={styles.infoPanel}>
            <p className={styles.propertyType}>{type}</p>
            <h1 className={styles.propertyTitle}>{title}</h1>

            <p className={styles.location}>
              <svg
                className={styles.locationIcon}
                width="15"
                height="15"
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

            {/* Stats */}
            <div className={styles.statsRow}>
              <div className={styles.stat}>
                <span aria-hidden>★</span>
                <span className={styles.statValue}>{rating.toFixed(1)}</span>
                <span>
                  ({reviewCount} {t("reviews")})
                </span>
              </div>
              <div className={styles.stat}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path
                    d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className={styles.statValue}>{area} m²</span>
              </div>
              <div className={styles.stat}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path
                    d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2" />
                  <path
                    d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className={styles.statValue}>{capacity}</span>
                <span>{t("people")}</span>
              </div>
            </div>

            {/* Price */}
            <div className={styles.priceBlock}>
              <span className={styles.price}>
                {currency}
                {price.toLocaleString()}
              </span>
              <span className={styles.pricePeriod}>/ {period}</span>
            </div>

            {/* CTA */}
            <Link
              href={available ? `/booking/${id}` : "#"}
              className={`${styles.bookBtn} ${!available ? styles.bookBtnDisabled : ""}`}
              aria-disabled={!available}
            >
              {available ? t("bookBtn") : t("unavailableBtn")}
            </Link>
          </aside>
        </div>

        {/* ── Description ── */}
        <section className={styles.contentSection}>
          <h2 className={styles.sectionTitle}>{t("about")}</h2>
          <p className={styles.description}>{description}</p>
        </section>

        {/* ── Amenities ── */}
        <section className={styles.contentSection}>
          <h2 className={styles.sectionTitle}>{t("amenities")}</h2>
          <div className={styles.amenitiesGrid}>
            {resolvedAmenities.map((amenity) => (
              <div key={amenity.id} className={styles.amenityItem}>
                <Image
                  src={amenity.icon}
                  alt=""
                  width={20}
                  height={20}
                  className={styles.amenityIcon}
                  aria-hidden
                />
                {amenity.label}
              </div>
            ))}
          </div>
        </section>

        {/* ── Gallery ── */}
        {galleryImages.length > 0 && (
          <section className={styles.contentSection}>
            <h2 className={styles.sectionTitle}>{t("gallery")}</h2>
            <div className={styles.gallery}>
              {galleryImages.map((src, i) => (
                <div key={i} className={styles.galleryItem}>
                  <Image
                    src={src}
                    alt={`${title} — photo ${i + 2}`}
                    fill
                    className={styles.galleryImage}
                    sizes="(max-width: 767px) 50vw, 33vw"
                  />
                </div>
              ))}
            </div>
          </section>
        )}
      </Container>
    </main>
  );
}
