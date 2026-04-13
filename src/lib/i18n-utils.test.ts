import { describe, it, expect } from "vitest";
import { isValidLocale, resolveLocale } from "./i18n-utils";

describe("isValidLocale", () => {
  it("returns true for supported locales", () => {
    expect(isValidLocale("es")).toBe(true);
    expect(isValidLocale("en")).toBe(true);
  });

  it("returns false for unsupported locales", () => {
    expect(isValidLocale("fr")).toBe(false);
    expect(isValidLocale("")).toBe(false);
    expect(isValidLocale("ES")).toBe(false); // case-sensitive
  });
});

describe("resolveLocale", () => {
  it("returns the provided locale when valid", () => {
    expect(resolveLocale("en")).toBe("en");
    expect(resolveLocale("es")).toBe("es");
  });

  it("falls back to default locale for invalid input", () => {
    expect(resolveLocale("fr")).toBe("es");
    expect(resolveLocale(undefined)).toBe("es");
    expect(resolveLocale("")).toBe("es");
  });
});
