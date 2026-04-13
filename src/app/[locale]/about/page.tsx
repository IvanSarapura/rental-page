import type { Metadata } from "next";
import ComingSoonPage from "@/components/ui/ComingSoonPage";

export const metadata: Metadata = {
  title: "About",
  description: "Learn more about Rental and how we help you find the right office.",
};

export default function AboutPage() {
  return (
    <ComingSoonPage
      eyebrow="Our Story"
      title="About Rental"
      description="Learn more about Rental and how we help businesses of all sizes find their ideal workspace. This page is currently under development."
    />
  );
}
