import type { Metadata } from "next";
import ComingSoonPage from "@/components/ui/ComingSoonPage";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "Our terms and conditions are currently being prepared.",
};

export default function TermsPage() {
  return (
    <ComingSoonPage
      eyebrow="Legal"
      title="Terms & Conditions"
      description="Our terms and conditions are currently being prepared. Please check back soon for the full legal documentation."
    />
  );
}
