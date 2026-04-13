import type { Metadata } from "next";
import ComingSoonPage from "@/components/ui/ComingSoonPage";

export const metadata: Metadata = {
  title: "Newsletter",
  description:
    "Stay up to date with our latest office listings, market insights, and exclusive offers.",
};

export default function NewsletterPage() {
  return (
    <ComingSoonPage
      eyebrow="Coming Soon"
      title="Newsletter"
      description="Stay up to date with our latest office listings, market insights, and exclusive offers. This page is currently under development."
    />
  );
}
