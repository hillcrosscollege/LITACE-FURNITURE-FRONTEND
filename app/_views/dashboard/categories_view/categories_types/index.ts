export type CategoryStatus = "Active" | "Inactive";

export type Category = {
  id: string;
  name: string;
  image: string;
  description: string;
  products: number;
  status: CategoryStatus;
  sortOrder: number;
  createdAt: string;
  slug: string;
  parentCategory?: string;
  showInMenu: boolean;
  subcategories: number;
};

export type CategoryTab = { label: string; count?: number };

// Subcategories
export type Subcategory = {
  id: string;
  name: string;
  products: number;
  status: CategoryStatus;
  sortOrder: number;
};

// Category products
export type CategoryProduct = {
  id: string;
  name: string;
  image: string;
  sku: string;
  price: number;
  stock: number;
  status: "Active" | "Inactive";
};

// Activity log
export type ActivityItem = {
  id: string;
  avatar: string;
  user: string;
  action: string;
  date: string;
};

// SEO
export type CategorySEO = {
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
  urlSlug: string;
};

// Media
export type CategoryMedia = {
  id: string;
  url: string;
  type: "image" | "video";
};

export type AddCategoryPayload = {
  name: string;
  // parentCategory: string;
  description: string;
  status: boolean;
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
  urlSlug?: string;
};

export type ReorderPayload = { ids: string[] };

export type CategoryForm = {
  name: string;
  // parentCategory: string;
  description: string;
  status: boolean;
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
  urlSlug: string;
};
