// ── Amenity ────────────────────────────────────────────────────────────────
export type Amenity = {
  id: string;
  label: string;
  icon: string;
};

// ── Property ───────────────────────────────────────────────────────────────
export type Property = {
  id: string;
  title: string;
  location: string;
  price: number;
  currency: string;
  period: string;
  rating: number;
  reviewCount: number;
  area: number;
  capacity: number;
  image: string;
  imagePosition?: string;
  tag?: string;
  type: string;
  available: boolean;
  description: string;
  amenityIds: string[];
  images: string[];
};

// ── Search / filter ────────────────────────────────────────────────────────
export type PropertyFilters = {
  city?: string;
  type?: string;
  minPrice?: number;
  maxPrice?: number;
  minCapacity?: number;
  available?: boolean;
};
