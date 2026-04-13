import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import Container from "@/components/ui/Container";
import PropertyCard from "@/components/ui/PropertyCard";
import { getFeaturedProperties } from "@/services/propertyService";
import { propertyFilters } from "./propertyFilters";
import styles from "./FeaturedPropertiesSection.module.css";

const variantClass: Record<string, string> = {
  primary: styles.filterBtnPrimary,
  outline: styles.filterBtnOutline,
  ghost: styles.filterBtnGhost,
};

export default async function FeaturedPropertiesSection() {
  const t = await getTranslations("FeaturedPropertiesSection");
  const featuredProperties = getFeaturedProperties();

  return (
    <section className={styles.section}>
      <Container>
        {/* ── Header ───────────────────────────────────────── */}
        <div className={styles.header}>
          <div className={styles.headerText}>
            <p className={styles.eyebrow}>{t("eyebrow")}</p>
            <h2 className={styles.title}>{t("title")}</h2>
            <p className={styles.subtitle}>{t("subtitle")}</p>
          </div>

          <div className={styles.filters} role="group" aria-label={t("title")}>
            {propertyFilters.map((filter) => {
              const filterLabel = t(`filters.${filter.id}` as Parameters<typeof t>[0]);
              const className = `${styles.filterBtn} ${variantClass[filter.variant]}`;
              const content = (
                <>
                  {filterLabel}
                  {filter.icon && (
                    <Image
                      src={filter.icon}
                      alt=""
                      width={16}
                      height={16}
                      className={styles.filterIcon}
                      aria-hidden
                    />
                  )}
                </>
              );

              return filter.href ? (
                <Link key={filter.id} href={filter.href} className={className}>
                  {content}
                </Link>
              ) : (
                <button
                  key={filter.id}
                  type="button"
                  className={className}
                  aria-pressed={filter.id === "nearMe"}
                >
                  {content}
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Grid ─────────────────────────────────────────── */}
        <div className={styles.grid}>
          {featuredProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </Container>
    </section>
  );
}
