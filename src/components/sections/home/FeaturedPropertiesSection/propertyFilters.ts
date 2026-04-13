/**
 * Filter button configuration for FeaturedPropertiesSection.
 * Labels are intentionally omitted here — they come from translations
 * using the `id` as key: t(`filters.${filter.id}`).
 */

export type FilterId = "nearMe" | "top" | "all" | "city";

export type PropertyFilter = {
  id: FilterId;
  variant: "primary" | "outline" | "ghost";
  icon?: string;
  href?: string;
};

export const propertyFilters: readonly PropertyFilter[] = [
  { id: "nearMe", variant: "primary" },
  { id: "top", variant: "outline" },
  { id: "all", variant: "outline", href: "/search" },
  { id: "city", variant: "outline", icon: "/icons/arrow-down.svg" },
] as const;
