import type { Metadata } from "next";
import ComingSoonPage from "@/components/ui/ComingSoonPage";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with our team about renting an office.",
};

export default function ContactPage() {
  return (
    <ComingSoonPage
      eyebrow="Get in Touch"
      title="Contact Us"
      description="Get in touch with our team about renting an office or for any general inquiry. This page is currently under development."
    />
  );
}
