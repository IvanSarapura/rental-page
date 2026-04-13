/**
 * Booking service — encapsulates all booking business logic.
 *
 * Currently a stub with price-calculation utilities. When a backend is
 * available, replace `submitBooking` with a real API call; keep the
 * public signatures stable.
 */

import type { Booking, BookingFormValues, BookingPeriod } from "@/types/booking";
import { getPropertyById } from "./propertyService";

// ── Price calculation ──────────────────────────────────────────────────────

const PERIOD_MULTIPLIERS: Record<BookingPeriod, number> = {
  hourly: 1 / (8 * 22), // ~22 workdays, 8 h/day
  daily: 1 / 22,
  monthly: 1,
};

/**
 * Calculates the total price for a booking given the monthly base price,
 * the selected period, and the number of units (hours/days/months).
 */
export function calculateBookingPrice(
  monthlyPrice: number,
  period: BookingPeriod,
  units: number
): number {
  const unitPrice = monthlyPrice * PERIOD_MULTIPLIERS[period];
  return Math.round(unitPrice * units * 100) / 100;
}

// ── Submission ─────────────────────────────────────────────────────────────

/**
 * Submits a booking request.
 *
 * TODO: replace the stub with a real API call, e.g.:
 *   return apiClient.post<Booking>("/bookings", payload);
 */
export async function submitBooking(propertyId: string, form: BookingFormValues): Promise<Booking> {
  const property = getPropertyById(propertyId);
  if (!property) throw new Error(`Property "${propertyId}" not found.`);

  // Stub — simulate network latency in development
  await new Promise((r) => setTimeout(r, 400));

  const booking: Booking = {
    id: crypto.randomUUID(),
    propertyId,
    startDate: form.startDate,
    endDate: form.endDate,
    period: form.period,
    totalPrice: property.price,
    currency: property.currency,
    status: "confirmed",
    guestName: form.guestName,
    guestEmail: form.guestEmail,
  };

  return booking;
}
