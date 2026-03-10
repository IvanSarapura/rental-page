import Image from "next/image";
import { Link } from "@/i18n/navigation";
import Container from "@/components/ui/Container";
import styles from "./Footer.module.css";

const quickLinks = [
  { href: "/",        label: "Home"                },
  { href: "/#about",  label: "About"               },
  { href: "/search",  label: "Listings"            },
  { href: "/terms",   label: "Terms and Conditions"},
] as const;

const discoverLinks = [
  { href: "/search?city=new-york",    label: "New York City" },
  { href: "/search?city=chicago",     label: "Chicago"       },
  { href: "/search?city=los-angeles", label: "Los Angeles"   },
  { href: "/search?city=san-diego",   label: "San Diego"     },
  { href: "/search?city=boston",      label: "Boston"        },
] as const;

const socialLinks = [
  { href: "https://facebook.com",  icon: "/icons/facebook.svg",  label: "Facebook"  },
  { href: "https://youtube.com",   icon: "/icons/youtube.svg",   label: "YouTube"   },
  { href: "https://dribbble.com",  icon: "/icons/dribbble.svg",  label: "Dribbble"  },
  { href: "https://figma.com",     icon: "/icons/figma.svg",     label: "Figma"     },
  { href: "https://whatsapp.com",  icon: "/icons/whatsapp.svg",  label: "WhatsApp"  },
] as const;

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <Container>
        <div className={styles.grid}>

          {/* ── Columna 1: Brand ─────────────────────────── */}
          <div className={styles.brandCol}>
            <Link href="/" className={styles.logo}>RENTAL</Link>
            <ul className={styles.contactList}>
              <li className={styles.contactItem}>
                <a href="tel:+18001234567">+1 800-123-4567</a>
              </li>
              <li className={styles.contactItem}>
                <a href="mailto:info@luxuryrental.com">info@luxuryrental.com</a>
              </li>
              <li className={styles.contactItem}>
                1234 Name Street,<br />City, State
              </li>
            </ul>
          </div>

          {/* ── Columna 2: Quick Links ───────────────────── */}
          <div className={styles.linksCol}>
            <h3 className={styles.colTitle}>Quick Links</h3>
            <ul className={styles.linkList}>
              {quickLinks.map(({ href, label }) => (
                <li key={href} className={styles.linkItem}>
                  <Link href={href}>{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Columna 3: Discover ──────────────────────── */}
          <div className={styles.linksCol}>
            <h3 className={styles.colTitle}>Discover</h3>
            <ul className={styles.linkList}>
              {discoverLinks.map(({ href, label }) => (
                <li key={href} className={styles.linkItem}>
                  <Link href={href}>{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Columna 4: Newsletter + Follow Us ───────── */}
          <div className={styles.newsletterCol}>
            <div className={styles.newsletterBlock}>
              <h3 className={styles.newsletterTitle}>Subscribe to our Newsletter!</h3>
              <form className={styles.newsletterForm} action="#" method="post">
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  className={styles.newsletterInput}
                  autoComplete="email"
                  aria-label="Email Address"
                />
                <button type="submit" className={styles.newsletterBtn}>
                  Subscribe
                </button>
              </form>
            </div>

            <div className={styles.socialBlock}>
              <h3 className={styles.socialTitle}>Follow Us</h3>
              <div className={styles.socialRow}>
                {socialLinks.map(({ href, icon, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Follow us on ${label}`}
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
          <p className={styles.copyright}>
            © {new Date().getFullYear()} Rental. All rights reserved.
          </p>
        </Container>
      </div>
    </footer>
  );
}
