/**
 * Spotlight card configuration for OfficeSpotlightSection.
 * Text (eyebrow, title, body, cta) is intentionally absent — sourced from
 * translations using the `id` as namespace key, e.g.:
 *   t(`${card.id}.eyebrow`), t(`${card.id}.title`), etc.
 */

export type SplitCard = {
  id: string;
  layout: "text-image" | "image-text";
  image: {
    src: string;
    alt: string;
    imagePosition?: string;
  };
};

export const spotlights: readonly SplitCard[] = [
  {
    id: "primeLocations",
    layout: "text-image",
    image: {
      src: "/images/building6.png",
      alt: "Modern office building exterior",
      imagePosition: "center 60%",
    },
  },
  {
    id: "futureOffice",
    layout: "image-text",
    image: {
      src: "/images/office0.png",
      alt: "Modern open office workspace",
      imagePosition: "center center",
    },
  },
] as const;
