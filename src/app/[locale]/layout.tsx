import type { ReactNode } from "react";
import Navbar from "@/components/layout/Navbar";

type LocaleLayoutProps = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children }: LocaleLayoutProps) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
