export type SplitCard = {
  id: string;
  layout: "text-image" | "image-text";
  text: {
    eyebrow: string;
    title: string;
    body: string;
    cta: string;
  };
  image: {
    src: string;
    alt: string;
    imagePosition?: string;
  };
};

export const highlights: readonly SplitCard[] = [
  {
    id: "prime-locations",
    layout: "text-image",
    text: {
      eyebrow: "CHECKOUT OUR",
      title: "Prime Locations",
      body: "Our offices are strategically located in the heart of the city, putting you right where the action is. Impress clients, attract talent, and network with industry peers, all from your prestigious address.",
      cta: "See more",
    },
    image: {
      src: "/images/building6.png",
      alt: "Modern office building exterior",
      imagePosition: "center 60%",
    },
  },
  {
    id: "future-office",
    layout: "image-text",
    text: {
      eyebrow: "EXPERIENCE",
      title: "The Future of Office Space",
      body: "Discover a new way to work – one that prioritizes flexibility, convenience, and community. Your success is our priority, and we're here to provide the workspace you need to thrive.",
      cta: "See more",
    },
    image: {
      src: "/images/office0.png",
      alt: "Modern open office workspace",
      imagePosition: "center center",
    },
  },
] as const;
