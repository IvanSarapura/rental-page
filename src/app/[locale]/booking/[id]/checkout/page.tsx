import type { Metadata } from "next";
import ComingSoonPage from "@/components/ui/ComingSoonPage";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  return {
    title: `Checkout — Booking #${id}`,
    description: "Complete your office booking payment.",
  };
}

export default async function CheckoutPage({ params: _params }: Props) {
  return (
    <ComingSoonPage
      eyebrow="Coming Soon"
      title="Checkout"
      description="Secure payment for your office reservation is currently under development."
    />
  );
}
