// types/add-product.ts
export type ProductFormData = {
  // Basic Info
  name: string;
  sku: string;
  category: string;
  brand: string;
  shortDescription: string;
  fullDescription: string;
  hasVariants: boolean;

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
  variants: VariantCombination[];

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

// lib/utils/variants.ts
export type AttributeDef = {
  id: string;
  name: string;
  values: string[];
};

export type VariantCombination = {
  id: string;
  combination: Record<string, string>; // { Size: "S", Color: "Red" }
  label: string; // "S / Red"
  sku: string;
  price: number;
  stock: number;
  included: boolean; // admin can exclude specific combos
};

export const cartesian = (
  attributes: AttributeDef[],
): Record<string, string>[] => {
  // Guard — no attributes yet
  if (!attributes.length || attributes.some((a) => !a.values.length)) return [];

  return attributes.reduce<Record<string, string>[]>((combos, attr) => {
    if (combos.length === 0) {
      return attr.values.map((v) => ({ [attr.name]: v }));
    }
    return combos.flatMap((combo) =>
      attr.values.map((v) => ({ ...combo, [attr.name]: v })),
    );
  }, []);
};

export const generateCombinations = (
  attributes: AttributeDef[],
  basePrice: number = 0,
  baseSku: string = "SKU",
): VariantCombination[] => {
  const combos = cartesian(attributes);

  return combos.map((combo, i) => {
    const values = Object.values(combo);
    const suffix = values.map((v) => v.slice(0, 3).toUpperCase()).join("-");

    return {
      id: String(i),
      combination: combo,
      label: values.join(" / "),
      sku: `${baseSku}-${suffix}`,
      price: basePrice,
      stock: 0,
      included: true,
    };
  });
};
