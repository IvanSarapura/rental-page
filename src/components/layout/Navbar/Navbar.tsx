"use client";

import Image from "next/image";
import { useState, useCallback, useEffect } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link, useRouter, usePathname } from "@/i18n/navigation";
import { ROUTES, SOCIAL_LINKS, BRAND_NAME } from "@/lib/constants";
import styles from "./Navbar.module.css";

// ── Inline SVG icons ─────────────────────────────────────────────────────────

function IconHamburger({ className }: { className?: string }) {
  return (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M3 6h18M3 12h18M3 18h18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconClose({ className }: { className?: string }) {
  return (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

// ── Component ────────────────────────────────────────────────────────────────

export default function Navbar() {
  const t = useTranslations("Navbar");
  const pathname = usePathname();
  const locale = useLocale();
  const router = useRouter();

  // Homepage: "/" or "/<locale>" — at most 1 path segment after filtering empty strings
  const isHome = pathname.split("/").filter(Boolean).length <= 1;

  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  // ── Scroll detection (solo aplica en la home page) ──
  useEffect(() => {
    if (!isHome) return;

    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll(); // check initial position
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  // ── Prevent body scroll when drawer is open ──
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // ── Language switcher ──
  // Reads window.location.pathname directly at click time to avoid stale React
  // state during locale transitions (useLocale and usePathname can update in
  // different render cycles, causing /es/es/ URL duplication if we rely on them).
  // No-ops if the selected locale is already active.
  const handleLocaleSelect = useCallback(
    (selected: "es" | "en") => {
      const currentPath = window.location.pathname;
      const match = currentPath.match(/^\/(es|en)(\/.*)?$/);
      if (!match || match[1] === selected) return;
      const strippedPath = match[2] || "/";
      router.replace(strippedPath, { locale: selected });
    },
    [router]
  );

  const navItems = [
    { href: ROUTES.home, label: t("home") },
    { href: "/#offices", label: t("offices") },
    { href: "/#about", label: t("about") },
    { href: "/#contact", label: t("contact") },
  ] as const;

  // Navbar class: transparent on home (unless scrolled), solid everywhere else
  const isSolid = !isHome || scrolled;

  return (
    <header
      className={[
        styles.navbar,
        isSolid ? styles.navbarSolid : "",
        scrolled && isHome ? styles.navbarScrolled : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className={styles.navbarInner}>
        {/* Logo */}
        <Link href="/" className={styles.logo} onClick={closeMenu}>
          {BRAND_NAME}
        </Link>

        {/* Mobile: hamburger */}
        <button
          type="button"
          className={styles.menuButton}
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-controls="nav-menu"
          aria-label={t("openMenu")}
        >
          <IconHamburger className={styles.menuIcon} />
        </button>

        {/* Nav drawer (mobile) / horizontal nav (desktop) */}
        <div
          id="nav-menu"
          className={`${styles.navWrapper} ${menuOpen ? styles.navWrapperOpen : ""}`}
        >
          {/* Mobile drawer header */}
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
              <IconClose />
            </button>
          </div>

          {/* Nav links */}
          <div className={styles.navCenter}>
            <nav className={styles.nav} aria-label="Main navigation">
              {navItems.map(({ href, label }) => {
                const isActive = pathname === href || (href !== "/" && pathname.startsWith(href));
                return (
                  <Link
                    key={href}
                    href={href}
                    className={`${styles.navLink} ${isActive ? styles.navLinkActive : ""}`}
                    onClick={closeMenu}
                  >
                    {label}
                  </Link>
                );
              })}

              {/* Mobile only: newsletter link */}
              <Link
                href={ROUTES.newsletter}
                className={`${styles.navLink} ${styles.mobileOnlyNavLink}`}
                onClick={closeMenu}
              >
                {t("newsletter")}
              </Link>
            </nav>
          </div>

          {/* Mobile drawer footer */}
          <div className={styles.navFooter}>
            <p className={styles.followTitle}>{t("followUs")}</p>
            <div className={styles.socialRow}>
              {SOCIAL_LINKS.map(({ href, icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className={styles.socialLink}
                >
                  <Image
                    src={icon}
                    alt=""
                    width={24}
                    height={24}
                    className={styles.socialIcon}
                    aria-hidden
                  />
                </a>
              ))}
            </div>
          </div>

          {/* Desktop: language switcher + CTA */}
          <div className={styles.desktopActions}>
            {/* Segmented control: sliding pill indicator */}
            <div
              className={`${styles.langSwitch} ${locale === "en" ? styles.langSwitchRight : ""}`}
              role="group"
              aria-label={t("switchLanguage")}
            >
              <span className={styles.langIndicator} aria-hidden />
              <button
                type="button"
                className={`${styles.langOption} ${locale === "es" ? styles.langOptionActive : ""}`}
                onClick={() => handleLocaleSelect("es")}
                aria-pressed={locale === "es"}
              >
                ES
              </button>
              <button
                type="button"
                className={`${styles.langOption} ${locale === "en" ? styles.langOptionActive : ""}`}
                onClick={() => handleLocaleSelect("en")}
                aria-pressed={locale === "en"}
              >
                EN
              </button>
            </div>

            <Link href={ROUTES.newsletter} className={styles.cta} onClick={closeMenu}>
              {t("visitNewsletter")}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
