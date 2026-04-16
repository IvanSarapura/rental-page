import { getTranslations } from "next-intl/server";
import Container from "@/components/ui/Container";
import { getFeaturedProperties } from "@/services/propertyService";
import { propertyFilters } from "./propertyFilters";
import type { FilterId } from "./propertyFilters";
import PropertyGrid from "./PropertyGrid";
import styles from "./FeaturedPropertiesSection.module.css";

export default async function FeaturedPropertiesSection() {
  const t = await getTranslations("FeaturedPropertiesSection");
  const featuredProperties = getFeaturedProperties();

  // Pre-translate filter labels server-side so the client component (PropertyGrid)
  // does not need a useTranslations call — keeps the RSC boundary clean.
  const filterLabels = Object.fromEntries(
    propertyFilters.map((f) => [f.id, t(`filters.${f.id}` as Parameters<typeof t>[0])])
  ) as Record<FilterId, string>;

  return (
    <section className={styles.section} id="offices">
      <Container>
        {/* ── Header: eyebrow + title + subtitle (server-rendered) ── */}
        <div className={styles.header}>
          <div className={styles.headerText}>
            <p className={styles.eyebrow}>{t("eyebrow")}</p>
            <h2 className={styles.title}>{t("title")}</h2>
            <p className={styles.subtitle}>{t("subtitle")}</p>
          </div>
        </div>

        {/* ── Filters + Grid (client component, handles state) ── */}
        <PropertyGrid
          properties={featuredProperties}
          filters={propertyFilters}
          filterLabels={filterLabels}
          groupLabel={t("title")}
          emptyStateText={t("emptyState")}
          seeAllLabel={t("filters.all")}
        />
      </Container>
    </section>
  );
}
