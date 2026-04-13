import type { Metadata } from "next";
import { getPropertyById } from "@/services/propertyService";
import ComingSoonPage from "@/components/ui/ComingSoonPage";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const property = getPropertyById(id);
  return {
    title: property ? `Book — ${property.title}` : "Book Office",
    description: property
      ? `Start your booking for ${property.title} in ${property.location}.`
      : "Start your office booking.",
  };
}

export default async function BookingPage({ params }: Props) {
  const { id } = await params;
  const property = getPropertyById(id);

  return (
    <ComingSoonPage
      eyebrow="Coming Soon"
      title={property ? `Book — ${property.title}` : "Book Office"}
      description="The booking flow is currently under development. Check back soon to reserve your workspace."
    />
  );
}
