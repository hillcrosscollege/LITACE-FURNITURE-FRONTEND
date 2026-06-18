// types/product-details.ts
export type ProductTab = {
  label: string;
  count?: number;
};

// types/variants.ts
export type Variant = {
  id: string;
  image: string;
  name: string;
  attributes: string;
  price: number;
  stock: number;
  sku: string;
};

export type VariantAttribute = {
  id: string;
  name: string;
  values: string[];
};
