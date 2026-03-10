export type Logo = {
  src: string;
  alt: string;
};

export const logos: readonly Logo[] = [
  { src: "/google-logo.svg", alt: "Google" },
  { src: "/amazon-logo.svg", alt: "Amazon" },
  { src: "/logitech-logo.svg", alt: "Logitech" },
  { src: "/spotify-logo.svg", alt: "Spotify" },
  { src: "/samsung-logo.svg", alt: "Samsung" },
  { src: "/netflix-logo.svg", alt: "Netflix" },
] as const;
