"use client";

import Image from "next/image";
import { useState, useCallback, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ROUTES, SOCIAL_LINKS, BRAND_NAME } from "@/lib/constants";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const t = useTranslations("Navbar");
  const pathname = usePathname();
  // Homepage: "/" or "/<locale>" — at most 1 path segment after filtering empty strings
  const isHome = pathname.split("/").filter(Boolean).length <= 1;

  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = useCallback(() => setMenuOpen(false), []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const navItems = [
    { href: ROUTES.home, label: t("home") },
    { href: "/#offices", label: t("offices") },
    { href: "/#about", label: t("about") },
    { href: "/#contact", label: t("contact") },
  ] as const;

  return (
    <header className={`${styles.navbar} ${!isHome ? styles.navbarSolid : ""}`}>
      <div className={styles.navbarInner}>
        <Link href="/" className={styles.logo} onClick={closeMenu}>
          {BRAND_NAME}
        </Link>

        <button
          type="button"
          className={styles.menuButton}
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-controls="nav-menu"
          aria-label={t("openMenu")}
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
            <Link href="/" className={styles.navHeaderLogo} onClick={closeMenu}>
              {BRAND_NAME}
            </Link>
            <button
              type="button"
              className={styles.navHeaderClose}
              onClick={closeMenu}
              aria-label={t("closeMenu")}
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
                <Link key={href} href={href} className={styles.navLink} onClick={closeMenu}>
                  {label}
                </Link>
              ))}

              {/* Solo mobile: link extra debajo de Contact */}
              <Link
                href={ROUTES.newsletter}
                className={`${styles.navLink} ${styles.mobileOnlyNavLink}`}
                onClick={closeMenu}
              >
                {t("newsletter")}
              </Link>
            </nav>
          </div>

          <div className={styles.navFooter}>
            <p className={styles.followTitle}>{t("followUs")}</p>
            <div className={styles.socialRow}>
              {SOCIAL_LINKS.map(({ icon, label }) => (
                <Image
                  key={label}
                  src={icon}
                  alt={label}
                  width={24}
                  height={24}
                  className={styles.socialIcon}
                />
              ))}
            </div>
          </div>

          <Link href={ROUTES.newsletter} className={styles.cta} onClick={closeMenu}>
            {t("visitNewsletter")}
          </Link>
        </div>
      </div>
    </header>
  );
}
