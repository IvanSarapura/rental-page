"use client";

import { useSearchParams } from "next/navigation";

export type BookingType = "hourly" | "daily" | "monthly";
const VALID_TYPES: readonly BookingType[] = ["hourly", "daily", "monthly"];

/**
 * Reads the `type` search param and returns the current booking type.
 * Falls back to "monthly" if the param is missing or invalid.
 */
export function useBookingType(): BookingType {
  const params = useSearchParams();
  const raw = params.get("type");
  return VALID_TYPES.includes(raw as BookingType) ? (raw as BookingType) : "monthly";
}
