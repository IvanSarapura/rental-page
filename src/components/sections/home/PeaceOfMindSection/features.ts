/**
 * Feature card configuration for PeaceOfMindSection.
 * Text (title, body) is intentionally absent — sourced from translations
 * using the `id` as key: t(`${id}.title`) and t(`${id}.body`).
 */

export type Feature = {
  id: string;
  icon: string;
  iconAlt: string;
};

export const features: readonly Feature[] = [
  { id: "easyBooking", icon: "/icons/notepad.svg", iconAlt: "Notepad icon" },
  { id: "community", icon: "/icons/house.svg", iconAlt: "House icon" },
  { id: "amenities", icon: "/icons/star-stick.svg", iconAlt: "Star icon" },
  { id: "bestPrice", icon: "/icons/tag-price.svg", iconAlt: "Price tag icon" },
  { id: "location", icon: "/icons/earth-globe.svg", iconAlt: "Globe icon" },
  { id: "transparency", icon: "/icons/like.svg", iconAlt: "Like icon" },
] as const;
