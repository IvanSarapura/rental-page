import type { Metadata } from "next";
import ComingSoonPage from "@/components/ui/ComingSoonPage";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  return {
    title: `Confirmation — Booking #${id}`,
    description: "Your office booking has been confirmed.",
  };
}

export default async function ConfirmationPage({ params: _params }: Props) {
  return (
    <ComingSoonPage
      eyebrow="Booking Confirmed"
      title="You're all set!"
      description="Your booking confirmation details will be shown here. This page is currently under development."
    />
  );
}
