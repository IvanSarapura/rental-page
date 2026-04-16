"use client";

import { useState } from "react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import PropertyCard from "@/components/ui/PropertyCard";
import type { Property } from "@/types/property";
import type { FilterId, PropertyFilter } from "./propertyFilters";
import styles from "./FeaturedPropertiesSection.module.css";

// ── Filter logic ──────────────────────────────────────────────────────────────

function applyFilter(properties: Property[], filterId: FilterId): Property[] {
  switch (filterId) {
    case "top":
      return properties.filter((p) => p.rating >= 4.7);
    case "city":
      return properties.filter((p) => p.available && p.price < 1000);
    case "nearMe":
    default:
      return properties;
  }
}

// ── Types ─────────────────────────────────────────────────────────────────────

type PropertyGridProps = {
  properties: Property[];
  filters: readonly PropertyFilter[];
  /** Pre-translated labels keyed by filter id */
  filterLabels: Record<FilterId, string>;
  groupLabel: string;
};

const variantClass: Record<string, string> = {
  primary: styles.filterBtnPrimary,
  outline: styles.filterBtnOutline,
  ghost: styles.filterBtnGhost,
};

// ── Component ─────────────────────────────────────────────────────────────────

export default function PropertyGrid({
  properties,
  filters,
  filterLabels,
  groupLabel,
}: PropertyGridProps) {
  const [activeFilter, setActiveFilter] = useState<FilterId>("nearMe");

  const visibleProperties = applyFilter(properties, activeFilter);

  return (
    <>
      {/* ── Filter buttons ── */}
      <div className={styles.filters} role="group" aria-label={groupLabel}>
        {filters.map((filter) => {
          const label = filterLabels[filter.id];
          const isActive = filter.id === activeFilter;
          const variant = isActive
            ? "primary"
            : filter.id === "nearMe"
              ? "outline"
              : filter.variant;
          const className = `${styles.filterBtn} ${variantClass[variant]}`;

          const content = (
            <>
              {label}
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

          // "all" is always a navigation link to /search
          if (filter.href) {
            return (
              <Link key={filter.id} href={filter.href} className={className}>
                {content}
              </Link>
            );
          }

          return (
            <button
              key={filter.id}
              type="button"
              className={className}
              aria-pressed={isActive}
              onClick={() => setActiveFilter(filter.id)}
            >
              {content}
            </button>
          );
        })}
      </div>

      {/* ── Property grid ── */}
      <div className={styles.grid}>
        {visibleProperties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </>
  );
}
