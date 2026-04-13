import { describe, it, expect } from "vitest";
import { calculateBookingPrice, submitBooking } from "./bookingService";

// ── calculateBookingPrice ──────────────────────────────────────────────────

describe("calculateBookingPrice", () => {
  const MONTHLY = 1000;

  it("returns the monthly price as-is for 1 month", () => {
    expect(calculateBookingPrice(MONTHLY, "monthly", 1)).toBe(1000);
  });

  it("doubles the price for 2 months", () => {
    expect(calculateBookingPrice(MONTHLY, "monthly", 2)).toBe(2000);
  });

  it("calculates daily price as a fraction of monthly", () => {
    const daily = calculateBookingPrice(MONTHLY, "daily", 1);
    // 1 day = 1/22 of monthly => ~45.45
    expect(daily).toBeCloseTo(1000 / 22, 1);
  });

  it("calculates hourly price as a fraction of monthly", () => {
    const hourly = calculateBookingPrice(MONTHLY, "hourly", 1);
    // 1 hour = 1/(8*22) of monthly => ~5.68
    expect(hourly).toBeCloseTo(1000 / (8 * 22), 1);
  });

  it("returns a rounded number (max 2 decimal places)", () => {
    const result = calculateBookingPrice(MONTHLY, "hourly", 1);
    const decimalPlaces = (result.toString().split(".")[1] ?? "").length;
    expect(decimalPlaces).toBeLessThanOrEqual(2);
  });
});

// ── submitBooking ──────────────────────────────────────────────────────────

describe("submitBooking", () => {
  const VALID_FORM = {
    startDate: "2026-05-01",
    endDate: "2026-05-31",
    period: "monthly" as const,
    guestName: "Ivan Sarita",
    guestEmail: "ivan@example.com",
    guestPhone: "+1 555 000 0000",
  };

  it("returns a confirmed booking for a known property", async () => {
    const booking = await submitBooking("1", VALID_FORM);
    expect(booking.status).toBe("confirmed");
    expect(booking.propertyId).toBe("1");
    expect(booking.guestName).toBe(VALID_FORM.guestName);
    expect(booking.guestEmail).toBe(VALID_FORM.guestEmail);
  });

  it("generates a unique id for each booking", async () => {
    const [a, b] = await Promise.all([
      submitBooking("1", VALID_FORM),
      submitBooking("1", VALID_FORM),
    ]);
    expect(a.id).not.toBe(b.id);
  });

  it("throws an error for an unknown property ID", async () => {
    await expect(submitBooking("__nonexistent__", VALID_FORM)).rejects.toThrow(
      /"__nonexistent__" not found/
    );
  });
});
