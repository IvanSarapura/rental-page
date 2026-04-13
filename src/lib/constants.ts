/**
 * App-wide constants — single source of truth for navigation, social links,
 * and contact information. Import from here; never hardcode in components.
 */

// ── Navigation ─────────────────────────────────────────────────────────────

export type NavItem = {
  href: string;
  label: string;
};

/** Primary navigation links (used by Navbar). */
export const NAV_ITEMS: readonly NavItem[] = [
  { href: "/", label: "Home" },
  { href: "/#offices", label: "Offices" },
  { href: "/#about", label: "About" },
  { href: "/#contact", label: "Contact" },
] as const;

/** Quick links shown in the Footer. */
export const FOOTER_QUICK_LINKS: readonly NavItem[] = [
  { href: "/", label: "Home" },
  { href: "/#about", label: "About" },
  { href: "/search", label: "Listings" },
  { href: "/terms", label: "Terms and Conditions" },
] as const;

/** Discover links (city searches) shown in the Footer. */
export const FOOTER_DISCOVER_LINKS: readonly NavItem[] = [
  { href: "/search?city=new-york", label: "New York City" },
  { href: "/search?city=chicago", label: "Chicago" },
  { href: "/search?city=los-angeles", label: "Los Angeles" },
  { href: "/search?city=san-diego", label: "San Diego" },
  { href: "/search?city=boston", label: "Boston" },
  { href: "/search?city=austin", label: "Austin" },
] as const;

// ── Social links ───────────────────────────────────────────────────────────

export type SocialLink = {
  href: string;
  icon: string;
  label: string;
};

export const SOCIAL_LINKS: readonly SocialLink[] = [
  { href: "https://facebook.com", icon: "/icons/facebook.svg", label: "Facebook" },
  { href: "https://youtube.com", icon: "/icons/youtube.svg", label: "YouTube" },
  { href: "https://dribbble.com", icon: "/icons/dribbble.svg", label: "Dribbble" },
  { href: "https://figma.com", icon: "/icons/figma.svg", label: "Figma" },
  { href: "https://whatsapp.com", icon: "/icons/whatsapp.svg", label: "WhatsApp" },
] as const;

// ── Contact information ────────────────────────────────────────────────────

export const CONTACT_INFO = {
  phone: "+1 800-123-4567",
  phoneHref: "tel:+18001234567",
  email: "info@rental.com",
  emailHref: "mailto:info@rental.com",
  address: "1234 Name Street, City, State",
} as const;

// ── Brand ──────────────────────────────────────────────────────────────────

export const BRAND_NAME = "Rental" as const;

// ── Routes ─────────────────────────────────────────────────────────────────

export const ROUTES = {
  home: "/",
  search: "/search",
  terms: "/terms",
  newsletter: "/newsletter",
  property: (id: string) => `/property/${id}`,
  booking: (id: string) => `/booking/${id}`,
  checkout: (id: string) => `/booking/${id}/checkout`,
  confirmation: (id: string) => `/booking/${id}/confirmation`,
} as const;
