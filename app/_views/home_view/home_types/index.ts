import { StaticImageData } from "next/image";

export interface IProduct {
  id: string;

  // Basic Info
  name: string;
  description: string;
  category: string;
  subCategory?: string;

  // Pricing
  price: number;
  originalPrice?: number;
  currency?: string;

  // Product Media
  image: string;
  images?: string[];
  tag?: string;

  // Product Status
  inStock?: boolean;
  featured?: boolean;
  badge?: string;

  // Ratings
  rating?: number;
  reviews?: number;

  // Product Details
  colors?: string[];
  tags?: string[];

  // Specifications
  specs?: {
    material?: string;
    frame?: string;
    shape?: string;
    weight?: string;
    height?: string;
    size?: string;
    weightCapacity?: string;
    stackable?: boolean;
    adjustable?: boolean;
    swivel?: boolean;
    foldable?: boolean;
    [key: string]: string | number | boolean | undefined;
  };

  // Product Variants
  variants?: {
    label: string;
    price: number;
  }[];

  // Dates
  createdAt?: string;
  updatedAt?: string;
}
