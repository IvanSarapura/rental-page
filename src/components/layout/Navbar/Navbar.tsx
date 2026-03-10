"use client";

import Image from "next/image";
import { useState, useCallback, useEffect } from "react";
import { Link } from "@/i18n/navigation";
import styles from "./Navbar.module.css";
import { navItems } from "./navItems";

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
          aria-label="Abrir menú"
        >
          <span className={styles.menuIcon} aria-hidden>
            ☰
          </span>
        </button>

        <div
          id="nav-menu"
          className={`${styles.navWrapper} ${menuOpen ? styles.navWrapperOpen : ""}`}
          data-open={menuOpen}
        >
          <div className={styles.navHeader}>
            <Link
              href="/"
              className={styles.navHeaderLogo}
              onClick={closeMenu}
            >
              RENTAL
            </Link>
            <button
              type="button"
              className={styles.navHeaderClose}
              onClick={closeMenu}
              aria-label="Cerrar menú"
            >
              <Image
                src="/icons/x.svg"
                alt=""
                width={24}
                height={24}
                className={styles.navHeaderCloseIcon}
                aria-hidden
              />
            </button>
          </div>

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

          <div className={styles.navFooter}>
            <p className={styles.followTitle}>Follow Us</p>
            <div className={styles.socialRow}>
              <Image
                src="/icons/facebook.svg"
                alt="Follow on Facebook"
                width={24}
                height={24}
                className={styles.socialIcon}
              />
              <Image
                src="/icons/youtube.svg"
                alt="Follow on YouTube"
                width={24}
                height={24}
                className={styles.socialIcon}
              />
              <Image
                src="/icons/dribbble.svg"
                alt="Follow on Dribbble"
                width={24}
                height={24}
                className={styles.socialIcon}
              />
              <Image
                src="/icons/figma.svg"
                alt="Follow on Figma"
                width={24}
                height={24}
                className={styles.socialIcon}
              />
              <Image
                src="/icons/whatsapp.svg"
                alt="Contact on WhatsApp"
                width={24}
                height={24}
                className={styles.socialIcon}
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
