import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import Container from "@/components/ui/Container";
import {
  FOOTER_QUICK_LINKS,
  FOOTER_DISCOVER_LINKS,
  SOCIAL_LINKS,
  CONTACT_INFO,
  BRAND_NAME,
} from "@/lib/constants";
import styles from "./Footer.module.css";

export default async function Footer() {
  const t = await getTranslations("Footer");

  return (
    <footer className={styles.footer}>
      <Container>
        <div className={styles.grid}>
          {/* ── Columna 1: Brand ─────────────────────────── */}
          <div className={styles.brandCol}>
            <Link href="/" className={styles.logo}>
              {BRAND_NAME}
            </Link>
            <ul className={styles.contactList}>
              <li className={styles.contactItem}>
                <a href={CONTACT_INFO.phoneHref}>{CONTACT_INFO.phone}</a>
              </li>
              <li className={styles.contactItem}>
                <a href={CONTACT_INFO.emailHref}>{CONTACT_INFO.email}</a>
              </li>
              <li className={styles.contactItem}>{CONTACT_INFO.address}</li>
            </ul>
          </div>

          {/* ── Columna 2: Quick Links ───────────────────── */}
          <div className={styles.linksCol}>
            <h3 className={styles.colTitle}>{t("quickLinks")}</h3>
            <ul className={`${styles.linkList} ${styles.quickLinksList}`}>
              {FOOTER_QUICK_LINKS.map(({ href, label }) => (
                <li key={href} className={styles.linkItem}>
                  <Link href={href}>{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Columna 3: Discover ──────────────────────── */}
          <div className={styles.linksCol}>
            <h3 className={styles.colTitle}>{t("discover")}</h3>
            <ul className={`${styles.linkList} ${styles.discoverList}`}>
              {FOOTER_DISCOVER_LINKS.map(({ href, label }) => (
                <li key={href} className={styles.linkItem}>
                  <Link href={href}>{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Columna 4: Newsletter + Follow Us ───────── */}
          <div className={styles.newsletterCol}>
            <div className={styles.newsletterBlock}>
              <h3 className={styles.newsletterTitle}>{t("newsletterTitle")}</h3>
              <form className={styles.newsletterForm} action="#" method="post">
                <input
                  type="email"
                  name="email"
                  placeholder={t("emailPlaceholder")}
                  className={styles.newsletterInput}
                  autoComplete="email"
                  aria-label={t("emailPlaceholder")}
                />
                <button type="submit" className={styles.newsletterBtn}>
                  {t("subscribe")}
                </button>
              </form>
            </div>

            <div className={styles.socialBlock}>
              <h3 className={styles.socialTitle}>{t("followUs")}</h3>
              <div className={styles.socialRow}>
                {SOCIAL_LINKS.map(({ href, icon, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={t("followUsOn", { platform: label })}
                    className={styles.socialLink}
                  >
                    <Image
                      src={icon}
                      alt=""
                      width={24}
                      height={24}
                      aria-hidden
                      className={styles.socialIcon}
                    />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* ── Barra de copyright ─────────────────────────────── */}
      <div className={styles.bottom}>
        <Container>
          <p className={styles.copyright}>{t("copyright", { year: new Date().getFullYear() })}</p>
        </Container>
      </div>
    </footer>
  );
}
