import { routing } from "@/i18n/routing";

export type Locale = (typeof routing.locales)[number];

/**
 * Returns true if the given value is a valid supported locale.
 */
export function isValidLocale(locale: string): locale is Locale {
  return (routing.locales as readonly string[]).includes(locale);
}

/**
 * Returns the locale to use, falling back to the default if the given value
 * is not a valid supported locale.
 */
export function resolveLocale(locale: string | undefined): Locale {
  if (locale && isValidLocale(locale)) return locale;
  return routing.defaultLocale as Locale;
}
