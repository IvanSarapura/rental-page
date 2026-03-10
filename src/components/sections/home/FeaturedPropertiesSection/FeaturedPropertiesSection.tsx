import Image from "next/image";
import { Link } from "@/i18n/navigation";
import Container from "@/components/ui/Container";
import PropertyCard from "@/components/ui/PropertyCard";
import { featuredProperties } from "./properties";
import { propertyFilters } from "./propertyFilters";
import styles from "./FeaturedPropertiesSection.module.css";

const variantClass: Record<string, string> = {
  primary: styles.filterBtnPrimary,
  outline: styles.filterBtnOutline,
  ghost:   styles.filterBtnGhost,
};

export default function FeaturedPropertiesSection() {
  return (
    <section className={styles.section}>
      <Container>
        {/* ── Header ───────────────────────────────────────── */}
        <div className={styles.header}>
          <div className={styles.headerText}>
            <p className={styles.eyebrow}>Checkout our new</p>
            <h2 className={styles.title}>Latest Listed Properties</h2>
            <p className={styles.subtitle}>
              Donex porttitor euismod dignissim. Nullam a lacinia ipsum, nec dignissim purus.
            </p>
          </div>

          <div className={styles.filters} role="group" aria-label="Filter properties">
            {propertyFilters.map((filter) => {
              const className = `${styles.filterBtn} ${variantClass[filter.variant]}`;
              const content = (
                <>
                  {filter.label}
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
                <Link
                  key={filter.id}
                  href={filter.href}
                  className={className}
                >
                  {content}
                </Link>
              ) : (
                <button
                  key={filter.id}
                  type="button"
                  className={className}
                  aria-pressed={filter.id === "near-me"}
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
