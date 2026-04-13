// ── Booking period ─────────────────────────────────────────────────────────
export type BookingPeriod = "hourly" | "daily" | "monthly";

// ── Booking status ─────────────────────────────────────────────────────────
export type BookingStatus = "pending" | "confirmed" | "cancelled";

// ── Booking ────────────────────────────────────────────────────────────────
export type Booking = {
  id: string;
  propertyId: string;
  startDate: string; // ISO 8601 date string
  endDate: string;
  period: BookingPeriod;
  totalPrice: number;
  currency: string;
  status: BookingStatus;
  guestName: string;
  guestEmail: string;
};

// ── Booking form ────────────────────────────────────────────────────────────
export type BookingFormValues = {
  startDate: string;
  endDate: string;
  period: BookingPeriod;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
};
