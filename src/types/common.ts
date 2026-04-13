import type { routing } from "@/i18n/routing";

// ── Locale ─────────────────────────────────────────────────────────────────
export type Locale = (typeof routing.locales)[number];

// ── Pagination ─────────────────────────────────────────────────────────────
export type PaginatedResult<T> = {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
};

// ── API response wrapper ───────────────────────────────────────────────────
export type ApiResult<T> = { success: true; data: T } | { success: false; error: string };
