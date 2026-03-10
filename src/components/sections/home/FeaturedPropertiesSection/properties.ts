export type Property = {
  id: string;
  title: string;
  location: string;
  price: number;
  currency: string;
  period: string;
  rating: number;
  reviewCount: number;
  area: number;
  capacity: number;
  image: string;
  tag?: string;
};

export const featuredProperties: readonly Property[] = [
  {
    id: "1",
    title: "Modern Executive Suite",
    location: "New York, NY",
    price: 1200,
    currency: "$",
    period: "mo",
    rating: 4.8,
    reviewCount: 32,
    area: 45,
    capacity: 6,
    image: "",
    tag: "Featured",
  },
  {
    id: "2",
    title: "Creative Studio Space",
    location: "San Francisco, CA",
    price: 980,
    currency: "$",
    period: "mo",
    rating: 4.6,
    reviewCount: 18,
    area: 38,
    capacity: 4,
    image: "",
  },
  {
    id: "3",
    title: "Downtown Cowork Office",
    location: "Chicago, IL",
    price: 750,
    currency: "$",
    period: "mo",
    rating: 4.5,
    reviewCount: 24,
    area: 30,
    capacity: 5,
    image: "",
    tag: "New",
  },
  {
    id: "4",
    title: "Premium Corner Office",
    location: "Austin, TX",
    price: 1050,
    currency: "$",
    period: "mo",
    rating: 4.9,
    reviewCount: 41,
    area: 52,
    capacity: 8,
    image: "",
  },
  {
    id: "5",
    title: "Minimalist Business Hub",
    location: "Seattle, WA",
    price: 890,
    currency: "$",
    period: "mo",
    rating: 4.7,
    reviewCount: 15,
    area: 40,
    capacity: 6,
    image: "",
  },
  {
    id: "6",
    title: "Startup Open Space",
    location: "Boston, MA",
    price: 670,
    currency: "$",
    period: "mo",
    rating: 4.4,
    reviewCount: 29,
    area: 35,
    capacity: 10,
    image: "",
    tag: "Popular",
  },
  {
    id: "7",
    title: "Luxury Glass Office",
    location: "Miami, FL",
    price: 1400,
    currency: "$",
    period: "mo",
    rating: 4.9,
    reviewCount: 11,
    area: 60,
    capacity: 8,
    image: "",
  },
  {
    id: "8",
    title: "Riverside Work Suite",
    location: "Portland, OR",
    price: 820,
    currency: "$",
    period: "mo",
    rating: 4.6,
    reviewCount: 20,
    area: 42,
    capacity: 6,
    image: "",
  },
] as const;
