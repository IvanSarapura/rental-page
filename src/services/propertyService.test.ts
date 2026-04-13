import { describe, it, expect } from "vitest";
import {
  getProperties,
  getFeaturedProperties,
  getPropertyById,
  getAllPropertyIds,
  getAmenities,
  resolveAmenities,
} from "./propertyService";

// ── getProperties ──────────────────────────────────────────────────────────

describe("getProperties", () => {
  it("returns all properties when no filters are provided", () => {
    const results = getProperties();
    expect(results.length).toBeGreaterThan(0);
  });

  it("filters by city (case-insensitive partial match)", () => {
    const results = getProperties({ city: "new york" });
    expect(results.every((p) => p.location.toLowerCase().includes("new york"))).toBe(true);
  });

  it("filters by type (case-insensitive exact match)", () => {
    const results = getProperties({ type: "Coworking" });
    expect(results.every((p) => p.type.toLowerCase() === "coworking")).toBe(true);
  });

  it("filters by minPrice", () => {
    const min = 1000;
    const results = getProperties({ minPrice: min });
    expect(results.every((p) => p.price >= min)).toBe(true);
  });

  it("filters by maxPrice", () => {
    const max = 800;
    const results = getProperties({ maxPrice: max });
    expect(results.every((p) => p.price <= max)).toBe(true);
  });

  it("filters by minCapacity", () => {
    const cap = 8;
    const results = getProperties({ minCapacity: cap });
    expect(results.every((p) => p.capacity >= cap)).toBe(true);
  });

  it("filters by available=true", () => {
    const results = getProperties({ available: true });
    expect(results.every((p) => p.available)).toBe(true);
  });

  it("filters by available=false", () => {
    const results = getProperties({ available: false });
    expect(results.every((p) => !p.available)).toBe(true);
  });

  it("returns empty array when filters match nothing", () => {
    const results = getProperties({ city: "___no_match___" });
    expect(results).toHaveLength(0);
  });

  it("combines multiple filters correctly", () => {
    const results = getProperties({ available: true, minCapacity: 6 });
    expect(results.every((p) => p.available && p.capacity >= 6)).toBe(true);
  });
});

// ── getFeaturedProperties ──────────────────────────────────────────────────

describe("getFeaturedProperties", () => {
  it("returns at least one property", () => {
    expect(getFeaturedProperties().length).toBeGreaterThan(0);
  });

  it("returns properties with required fields", () => {
    getFeaturedProperties().forEach((p) => {
      expect(p).toHaveProperty("id");
      expect(p).toHaveProperty("title");
      expect(p).toHaveProperty("price");
      expect(p).toHaveProperty("image");
    });
  });
});

// ── getPropertyById ────────────────────────────────────────────────────────

describe("getPropertyById", () => {
  it("returns the correct property for a known ID", () => {
    const property = getPropertyById("1");
    expect(property).toBeDefined();
    expect(property?.id).toBe("1");
  });

  it("returns undefined for an unknown ID", () => {
    expect(getPropertyById("__nonexistent__")).toBeUndefined();
  });
});

// ── getAllPropertyIds ──────────────────────────────────────────────────────

describe("getAllPropertyIds", () => {
  it("returns an array of strings", () => {
    const ids = getAllPropertyIds();
    expect(Array.isArray(ids)).toBe(true);
    ids.forEach((id) => expect(typeof id).toBe("string"));
  });

  it("matches the count of featured properties", () => {
    expect(getAllPropertyIds().length).toBe(getFeaturedProperties().length);
  });
});

// ── getAmenities ───────────────────────────────────────────────────────────

describe("getAmenities", () => {
  it("returns amenities with id, label and icon", () => {
    getAmenities().forEach((a) => {
      expect(a).toHaveProperty("id");
      expect(a).toHaveProperty("label");
      expect(a).toHaveProperty("icon");
    });
  });
});

// ── resolveAmenities ───────────────────────────────────────────────────────

describe("resolveAmenities", () => {
  it("resolves known amenity IDs to their objects", () => {
    const resolved = resolveAmenities(["wifi", "coffee"]);
    expect(resolved).toHaveLength(2);
    expect(resolved[0].id).toBe("wifi");
    expect(resolved[1].id).toBe("coffee");
  });

  it("silently skips unknown amenity IDs", () => {
    const resolved = resolveAmenities(["wifi", "__unknown__"]);
    expect(resolved).toHaveLength(1);
    expect(resolved[0].id).toBe("wifi");
  });

  it("returns an empty array for empty input", () => {
    expect(resolveAmenities([])).toHaveLength(0);
  });
});
