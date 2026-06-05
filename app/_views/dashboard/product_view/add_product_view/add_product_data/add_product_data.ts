import { Step } from "../add_product_types";

export const categories = [
  "Living Room",
  "Dining Room",
  "Bedroom",
  "Office",
  "Outdoor",
  "Decor",
];

export const brands = [
  "FurniCasa",
  "WoodCraft",
  "ModernHome",
  "LuxeLiving",
  "UrbanNest",
];

export const shippingClasses = ["Standard", "Bulky", "Fragile", "Express"];

export const steps: Step[] = [
  {
    id: 1,
    label: "Basic Information",
    description: "Product name, category & description",
  },
  {
    id: 2,
    label: "Pricing & Inventory",
    description: "Price, cost & stock settings",
  },
  { id: 3, label: "Variants", description: "Colors, sizes & materials" },
  { id: 4, label: "Images & Media", description: "Product photos & videos" },
  {
    id: 5,
    label: "Shipping",
    description: "Weight, dimensions & shipping class",
  },
  {
    id: 6,
    label: "SEO & Settings",
    description: "Meta tags, slug & visibility",
  },
];
