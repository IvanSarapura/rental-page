import type { Metadata } from "next";
import ComingSoonPage from "@/components/ui/ComingSoonPage";

export const metadata: Metadata = {
  title: "Office Listings",
  description: "Browse and filter our full catalog of premium office spaces.",
};

export default function SearchPage() {
  return (
    <ComingSoonPage
      eyebrow="Coming Soon"
      title="Office Listings"
      description="Browse and filter our full catalog of premium office spaces. This page is currently under development."
    />
  );
}
