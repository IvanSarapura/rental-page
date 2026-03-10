export type NavItem = {
  href: string;
  label: string;
};

export const navItems: readonly NavItem[] = [
  { href: "/",        label: "Home"    },
  { href: "/#offices", label: "Offices" },
  { href: "/#about",   label: "About"   },
  { href: "/#contact", label: "Contact" },
] as const;
