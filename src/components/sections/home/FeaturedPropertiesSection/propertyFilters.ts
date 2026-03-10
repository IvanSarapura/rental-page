export type FilterId = "near-me" | "top" | "all" | "city";

export type PropertyFilter = {
  id: FilterId;
  label: string;
  variant: "primary" | "outline" | "ghost";
  icon?: string;
};

export const propertyFilters: readonly PropertyFilter[] = [
  { id: "near-me", label: "Locations near me", variant: "primary" },
  { id: "top",     label: "Top locations",     variant: "outline" },
  { id: "all",     label: "See all",            variant: "ghost"   },
  { id: "city",    label: "Select city",        variant: "ghost", icon: "/icons/arrow-down.svg" },
] as const;
