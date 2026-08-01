import api from "@/lib/axios";
import {
  ProductAttribute,
  VariantCombination,
  AttributeOption,
  Product,
} from "./product_types";
import { ProductFormData } from "../add_product_view/add_product_types";

export const predefinedAttributes = [
  "Size",
  "Color",
  "Material",
  "Finish",
  "Weight",
  "Dimensions",
  "Frame Type",
  "Custom",
];

// Cartesian product helper
// export const generateCombinations = (
//   attributes: ProductAttribute[],
// ): VariantCombination[] => {
//   if (attributes.length === 0) return [];

//   // Filter out attributes with no options
//   const filled = attributes.filter((a) => a.options.length > 0 && a.name);
//   if (filled.length === 0) return [];

//   const cartesian = (arrays: AttributeOption[][]): AttributeOption[][] => {
//     return arrays.reduce<AttributeOption[][]>(
//       (acc, curr) => acc.flatMap((a) => curr.map((b) => [...a, b])),
//       [[]],
//     );
//   };

//   const optionArrays = filled.map((a) => a.options);
//   const combos = cartesian(optionArrays);

//   return combos.map((combo, i) => {
//     const attributeMap: Record<string, string> = {};
//     combo.forEach((opt, j) => {
//       attributeMap[filled[j].name] = opt.value;
//     });

//     return {
//       id: `variant-${i}`,
//       attributes: attributeMap,
//       label: combo.map((o) => o.value).join(" / "),
//       price: 0,
//       stock: 0,
//       sku: "",
//       enabled: true,
//     };
//   });
// };

//  Promise<{
//  data: {
//  id: string;
//  name: string;
//  image: string;
//  category: any;
//  price: number;
//  originalPrice: number | undefined;
//  stock: number;
//  stockStatus: StockStatus;
//  status: "Published" | "Draft" | "Trash";
//  createdAt: string;
//  }[];
//  total: number;
//  page: number;
//  limit: number;
// }>
export const productApi = {
  getProducts: async (): Promise<{
    data: Product[];
    // stats: { total: number; active: number; inactive: number };
  }> => {
    const response = await api.get("/admin/products");
    return response.data;
  },

  // getCategoryById: async (id: string) => {
  //   await delay(1000);
  //   const category = categoriesList.find((c) => c.id === id);
  //   if (!category) throw new Error("Category not found");
  //   return {
  //     ...category,
  //     subcategories_list: subcategories,
  //     products: categoryProducts,
  //     activity: categoryActivity,
  //     media: categoryMedia,
  //     seo: categorySEO,
  //   };
  // },

  addProduct: async (payload: ProductFormData): Promise<any> => {
    const response = await api.post("/admin/products", payload);
    return response.data;
  },

  uploadProductImage: async (payload: any): Promise<any> => {
    const response = await api.post("/admin/products/upload-images", payload);
    return response.data;
  },

  // updateCategory: async (
  //   id: string,
  //   payload: Partial<AddCategoryPayload>,
  // ): Promise<Category> => {
  //   await delay(800);
  //   const category = categoriesList.find((c) => c.id === id);
  //   if (!category) throw new Error("Category not found");
  //   return {
  //     ...category,
  //     name: payload.name ?? category.name,
  //     description: payload.description ?? category.description,
  //     status:
  //       payload.status !== undefined
  //         ? payload.status
  //           ? "Active"
  //           : "Inactive"
  //         : category.status,
  //   };
  // },

  // deleteCategory: async (
  //   id: string,
  //   reassign: boolean,
  //   targetId?: string,
  // ): Promise<void> => {
  //   await delay(800);
  //   console.log("Delete category:", { id, reassign, targetId });
  // },
};
