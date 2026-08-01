import api from "@/lib/axios";
import {
  Category,
  CategoryStatus,
  CategoryTab,
  Subcategory,
  CategoryProduct,
  ActivityItem,
  CategorySEO,
  CategoryMedia,
  AddCategoryPayload,
  ReorderPayload,
} from "../categories_types";
import { useMemo } from "react";

export const categoriesList: Category[] = [
  {
    id: "1",
    name: "Living Room",
    image: "/conference_chair-2.png",
    description: "Sofas, chairs, tables and more for your living room.",
    products: 28,
    status: "Active",
    sortOrder: 1,
    createdAt: "May 10, 2024",
    slug: "living-room",
    showInMenu: true,
    subcategories: 5,
  },
];

export const categoryListStats = [
  {
    title: "Total Categories",
    value: "24",
    subLabel: "All categories",
    iconClassName: "text-[#7048b6]",
    iconWrapperClassName: "bg-[#f0ebf7]",
  },
  {
    title: "Active Categories",
    value: "21",
    subLabel: "87.5% of total",
    iconClassName: "text-[#2e7d52]",
    iconWrapperClassName: "bg-[#edf7f2]",
  },
  {
    title: "Empty Categories",
    value: "3",
    subLabel: "No products",
    iconClassName: "text-[#c0392b]",
    iconWrapperClassName: "bg-[#fdecea]",
  },
  {
    title: "Total Products",
    value: "142",
    subLabel: "Across all categories",
    iconClassName: "text-[#3266ad]",
    iconWrapperClassName: "bg-[#edf2fb]",
  },
];

export const categoryStatusStyles: Record<CategoryStatus, string> = {
  Active: "bg-[#e8fdf0] text-[#157a45]",
  Inactive: "bg-[#fdecea] text-[#a32020]",
};

// Category details
export const categoryDetail: Category = categoriesList[0];

export const categoryDetailTabs: CategoryTab[] = [
  { label: "Overview" },
  // { label: "Products", count: 28 },
  // { label: "Subcategories", count: 5 },
  { label: "Activity" },
];

export const subcategories: Subcategory[] = [
  { id: "1", name: "Sofas", products: 12, status: "Active", sortOrder: 1 },
  {
    id: "2",
    name: "Coffee Tables",
    products: 6,
    status: "Active",
    sortOrder: 2,
  },
  { id: "3", name: "TV Units", products: 5, status: "Active", sortOrder: 3 },
  {
    id: "4",
    name: "Accent Chairs",
    products: 3,
    status: "Active",
    sortOrder: 4,
  },
  { id: "5", name: "Side Tables", products: 2, status: "Active", sortOrder: 5 },
];

export const categoryProducts: CategoryProduct[] = [
  {
    id: "1",
    name: "Modern L-Shaped Sofa",
    image: "/conference_chair-2.png",
    sku: "FC-SOFA-001",
    price: 250000,
    stock: 12,
    status: "Active",
  },
  {
    id: "2",
    name: "Wooden Coffee Table",
    image: "/conference_chair-2.png",
    sku: "FC-TABLE-005",
    price: 95000,
    stock: 6,
    status: "Active",
  },
  {
    id: "3",
    name: "TV Console Unit",
    image: "/conference_chair-2.png",
    sku: "FC-TV-003",
    price: 180000,
    stock: 8,
    status: "Active",
  },
  {
    id: "4",
    name: "Accent Armchair",
    image: "/conference_chair-2.png",
    sku: "FC-CHAIR-008",
    price: 120000,
    stock: 5,
    status: "Active",
  },
  {
    id: "5",
    name: "Floor Lamp",
    image: "/conference_chair-2.png",
    sku: "FC-LAMP-002",
    price: 45000,
    stock: 10,
    status: "Active",
  },
];

export const categoryActivity: ActivityItem[] = [
  {
    id: "1",
    avatar: "/conference_chair-2.png",
    user: "John Doe",
    action: "updated the category details",
    date: "May 20, 2024 at 10:32 AM",
  },
  {
    id: "2",
    avatar: "/conference_chair-2.png",
    user: "Jane Smith",
    action: "added 2 new products",
    date: "May 19, 2024 at 02:15 PM",
  },
  {
    id: "3",
    avatar: "/conference_chair-2.png",
    user: "Michael Brown",
    action: "changed the category image",
    date: "May 16, 2024 at 11:45 AM",
  },
  {
    id: "4",
    avatar: "/conference_chair-2.png",
    user: "System",
    action: "imported products to this category",
    date: "May 14, 2024 at 09:20 AM",
  },
  {
    id: "5",
    avatar: "/conference_chair-2.png",
    user: "Emily Davis",
    action: "created this category",
    date: "May 10, 2024 at 02:10 PM",
  },
];

export const categorySEO: CategorySEO = {
  metaTitle: "Living Room Furniture | Sofas, Chairs, Tables & More | FurniCasa",
  metaDescription:
    "Discover premium living room furniture at FurniCasa. Explore sofas, coffee tables, TV units and more to create the perfect modern space.",
  metaKeywords:
    "living room furniture, sofas, coffee tables, TV units, chairs, furnicasa",
  urlSlug: "living-room",
};

export const categoryMedia: CategoryMedia[] = [
  { id: "1", url: "/conference_chair-2.png", type: "image" },
  { id: "2", url: "/conference_chair-2.png", type: "image" },
  { id: "3", url: "/conference_chair-2.png", type: "image" },
  { id: "4", url: "/conference_chair-2.png", type: "image" },
  { id: "5", url: "/conference_chair-2.png", type: "image" },
  { id: "6", url: "/conference_chair-2.png", type: "image" },
];

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export const categoriesApi = {
  getCategories: async (): Promise<{
    categories: Category[];
    stats: { total: number; active: number; inactive: number };
  }> => {
    const response = await api.get("/admin/categories");
    return response.data;
  },
  // getCategories: async (): Promise<{
  //   categories: Category[];
  //   stats: typeof categoryListStats;
  // }> => {
  //   await delay(1200);
  //   return { categories: categoriesList, stats: categoryListStats };
  // },

  getCategoryById: async (id: string) => {
    await delay(1000);
    const category = categoriesList.find((c) => c.id === id);
    if (!category) throw new Error("Category not found");
    return {
      ...category,
      subcategories_list: subcategories,
      products: categoryProducts,
      activity: categoryActivity,
      media: categoryMedia,
      seo: categorySEO,
    };
  },

  addCategory: async (payload: AddCategoryPayload): Promise<Category> => {
    const response = await api.post("/admin/categories", payload);
    return response.data;
  },
  // addCategory: async (payload: AddCategoryPayload): Promise<Category> => {
  //   await delay(900);
  //   return {
  //     id: String(Date.now()),
  //     name: payload.name,
  //     image: "/conference_chair-2.png",
  //     description: payload.description,
  //     products: 0,
  //     status: payload.status ? "Active" : "Inactive",
  //     sortOrder: categoriesList.length + 1,
  //     createdAt: new Date().toLocaleDateString("en-US", {
  //       month: "long",
  //       day: "numeric",
  //       year: "numeric",
  //     }),
  //     slug: payload.name.toLowerCase().replace(/\s+/g, "-"),
  //     showInMenu: true,
  //     subcategories: 0,
  //   };
  // },

  updateCategory: async (
    id: string,
    payload: Partial<AddCategoryPayload>,
  ): Promise<Category> => {
    await delay(800);
    const category = categoriesList.find((c) => c.id === id);
    if (!category) throw new Error("Category not found");
    return {
      ...category,
      name: payload.name ?? category.name,
      description: payload.description ?? category.description,
      status:
        payload.status !== undefined
          ? payload.status
            ? "Active"
            : "Inactive"
          : category.status,
    };
  },

  deleteCategory: async (
    id: string,
    reassign: boolean,
    targetId?: string,
  ): Promise<void> => {
    await delay(800);
    console.log("Delete category:", { id, reassign, targetId });
  },

  // reorderCategories: async (payload: ReorderPayload): Promise<void> => {
  //   await delay(700);
  //   console.log("Reorder:", payload.ids);
  // },

  exportCategories: async (
    format: string,
    includes: string[],
  ): Promise<void> => {
    await delay(800);
    console.log("Export categories:", { format, includes });
  },

  updateSEO: async (id: string, seo: CategorySEO): Promise<CategorySEO> => {
    await delay(700);
    return seo;
  },

  addSubcategory: async (
    categoryId: string,
    name: string,
  ): Promise<Subcategory> => {
    await delay(700);
    return {
      id: String(Date.now()),
      name,
      products: 0,
      status: "Active",
      sortOrder: subcategories.length + 1,
    };
  },

  deleteSubcategory: async (id: string): Promise<void> => {
    await delay(600);
    console.log("Delete subcategory:", id);
  },

  addMedia: async (categoryId: string, file: File): Promise<CategoryMedia> => {
    await delay(800);
    return {
      id: String(Date.now()),
      url: URL.createObjectURL(file),
      type: file.type.startsWith("video") ? "video" : "image",
    };
  },

  deleteMedia: async (categoryId: string, mediaId: string): Promise<void> => {
    await delay(600);
    console.log("Delete media:", { categoryId, mediaId });
  },
};
