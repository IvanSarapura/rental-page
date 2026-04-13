/**
 * Property service — single source of truth for all property data access.
 *
 * Currently backed by a static dataset. Replace the internals with API calls
 * (or ORM queries) when a backend is available; the public function signatures
 * should remain stable.
 */

import { allAmenities, featuredProperties } from "@/data/properties";
import type { Amenity, Property, PropertyFilters } from "@/types/property";

// ── Queries ────────────────────────────────────────────────────────────────

/** Returns all properties, optionally filtered. */
export function getProperties(filters?: PropertyFilters): Property[] {
  let results = featuredProperties as Property[];

  if (!filters) return results;

  const { city, type, minPrice, maxPrice, minCapacity, available } = filters;

  if (city) {
    const q = city.toLowerCase();
    results = results.filter((p) => p.location.toLowerCase().includes(q));
  }
  if (type) {
    results = results.filter((p) => p.type.toLowerCase() === type.toLowerCase());
  }
  if (minPrice !== undefined) {
    results = results.filter((p) => p.price >= minPrice);
  }
  if (maxPrice !== undefined) {
    results = results.filter((p) => p.price <= maxPrice);
  }
  if (minCapacity !== undefined) {
    results = results.filter((p) => p.capacity >= minCapacity);
  }
  if (available !== undefined) {
    results = results.filter((p) => p.available === available);
  }

  return results;
}

/** Returns the featured / promoted properties shown on the home page. */
export function getFeaturedProperties(): Property[] {
  return featuredProperties as Property[];
}

/** Finds a single property by its ID. Returns undefined if not found. */
export function getPropertyById(id: string): Property | undefined {
  return (featuredProperties as Property[]).find((p) => p.id === id);
}

/** Returns all IDs — used by generateStaticParams. */
export function getAllPropertyIds(): string[] {
  return (featuredProperties as Property[]).map((p) => p.id);
}

// ── Amenity helpers ────────────────────────────────────────────────────────

/** Returns the full amenity catalog. */
export function getAmenities(): Amenity[] {
  return allAmenities as Amenity[];
}

/** Resolves a list of amenity IDs to their full Amenity objects. */
export function resolveAmenities(ids: string[]): Amenity[] {
  const map = new Map((allAmenities as Amenity[]).map((a) => [a.id, a]));
  return ids.flatMap((id) => {
    const amenity = map.get(id);
    return amenity ? [amenity] : [];
  });
}
