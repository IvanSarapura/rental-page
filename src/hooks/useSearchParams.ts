"use client";

import { useSearchParams as useNextSearchParams } from "next/navigation";

export type SearchFilters = {
  city: string | null;
  type: string | null;
  minPrice: number | null;
  maxPrice: number | null;
  capacity: number | null;
};

/**
 * Parses and returns the current search filter params from the URL.
 * Provides typed access to all supported filter keys.
 */
export function usePropertySearchParams(): SearchFilters {
  const params = useNextSearchParams();

  const minPriceRaw = params.get("minPrice");
  const maxPriceRaw = params.get("maxPrice");
  const capacityRaw = params.get("capacity");

  return {
    city: params.get("city"),
    type: params.get("type"),
    minPrice: minPriceRaw ? Number(minPriceRaw) : null,
    maxPrice: maxPriceRaw ? Number(maxPriceRaw) : null,
    capacity: capacityRaw ? Number(capacityRaw) : null,
  };
}
