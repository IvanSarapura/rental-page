export type NavItem = {
  href: string;
  label: string;
};

export const navItems: readonly NavItem[] = [
  { href: "/", label: "Home" },
  { href: "/search", label: "Offices" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

