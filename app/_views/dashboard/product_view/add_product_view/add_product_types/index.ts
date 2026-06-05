// types/add-product.ts
export type ProductFormData = {
  // Basic Info
  name: string;
  sku: string;
  category: string;
  brand: string;
  shortDescription: string;
  fullDescription: string;

  // Pricing & Inventory
  price: number;
  comparePrice: number;
  costPrice: number;
  profitMargin: number;
  trackInventory: boolean;
  quantity: number;
  lowStockThreshold: number;
  allowBackorders: boolean;

  // Variants
  hasVariants: boolean;

  // Shipping
  weight: number;
  length: number;
  width: number;
  height: number;
  shippingClass: string;
  freeShipping: boolean;

  // SEO
  metaTitle: string;
  metaDescription: string;
  slug: string;
};

export type Step = {
  id: number;
  label: string;
  description: string;
};
