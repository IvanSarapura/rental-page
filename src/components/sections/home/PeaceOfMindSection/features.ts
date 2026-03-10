export type Feature = {
  id: string;
  icon: string;
  iconAlt: string;
  title: string;
  body: string;
};

export const features: readonly Feature[] = [
  {
    id: "easy-booking",
    icon: "/icons/notepad.svg",
    iconAlt: "Notepad icon",
    title: "Easy Booking Process",
    body: "Renting an office with us is simple and hassle-free. Our user-friendly online platform allows you to book your ideal workspace in just a few clicks.",
  },
  {
    id: "community",
    icon: "/icons/house.svg",
    iconAlt: "House icon",
    title: "Community and Networking",
    body: "Join a vibrant community of professionals and entrepreneurs. Network, collaborate, and exchange ideas in an environment that fosters innovation and growth.",
  },
  {
    id: "amenities",
    icon: "/icons/star-stick.svg",
    iconAlt: "Star icon",
    title: "Modern Amenities",
    body: "Enjoy a comfortable and productive work environment with state-of-the-art facilities. High-speed internet, meeting rooms, ergonomic furniture.",
  },
  {
    id: "best-price",
    icon: "/icons/tag-price.svg",
    iconAlt: "Price tag icon",
    title: "Best Price",
    body: "Not sure what you should be charging for your property? Let us do the numbers for you—contact us today for a free rental appraisal on your home.",
  },
  {
    id: "location",
    icon: "/icons/earth-globe.svg",
    iconAlt: "Globe icon",
    title: "Strategic Location",
    body: "Located in the city center close to the shopping center. Very good for areas surrounded by international education centers, start-up office centers.",
  },
  {
    id: "transparency",
    icon: "/icons/like.svg",
    iconAlt: "Like icon",
    title: "Transparency",
    body: "We believe in transparency. Our pricing is straightforward, and there are no hidden fees. What you see is what you get, so you can budget with confidence.",
  },
] as const;
