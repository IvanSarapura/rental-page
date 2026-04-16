import type { ReactNode } from "react";
import { getTranslations } from "next-intl/server";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

type LocaleLayoutProps = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children }: LocaleLayoutProps) {
  const t = await getTranslations("common");

  return (
    <>
      {/* Skip-to-content: visible solo al recibir foco por teclado */}
      <a href="#main-content" className="skip-to-content">
        {t("skipToContent")}
      </a>
      <Navbar />
      <main id="main-content" style={{ paddingTop: "var(--navbar-height)" }}>
        {children}
      </main>
      <Footer />
    </>
  );
}
