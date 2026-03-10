"use client";

import { useState, useCallback, useEffect } from "react";
import { Link } from "@/i18n/navigation";
import styles from "./Navbar.module.css";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/search", label: "Offices" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header className={styles.navbar}>
      <div className={styles.navbarInner}>
        <Link href="/" className={styles.logo} onClick={closeMenu}>
          RENTAL
        </Link>

        <button
          type="button"
          className={styles.menuButton}
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-controls="nav-menu"
          aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
        >
          <span className={styles.menuIcon} aria-hidden>
            {menuOpen ? "✕" : "☰"}
          </span>
        </button>

        <div
          id="nav-menu"
          className={`${styles.navWrapper} ${menuOpen ? styles.navWrapperOpen : ""}`}
          data-open={menuOpen}
        >
          <div className={styles.navCenter}>
            <nav className={styles.nav}>
              {navItems.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className={styles.navLink}
                  onClick={closeMenu}
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>
          <Link
            href="/contact"
            className={styles.cta}
            onClick={closeMenu}
          >
            Get in touch
          </Link>
        </div>
      </div>
    </header>
  );
}
