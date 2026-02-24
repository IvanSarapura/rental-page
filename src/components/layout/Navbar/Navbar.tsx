"use client";

import { Link } from "@/i18n/navigation";
import styles from "./Navbar.module.css";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/search", label: "Offices" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

export default function Navbar() {
  return (
    <header className={styles.navbar}>
      <Link href="/" className={styles.logo}>
        RENTAL
      </Link>
      <nav className={styles.nav}>
        {navItems.map(({ href, label }) => (
          <Link key={href} href={href} className={styles.navLink}>
            {label}
          </Link>
        ))}
      </nav>
      <Link href="/contact" className={styles.cta}>
        Get in touch
      </Link>
    </header>
  );
}
