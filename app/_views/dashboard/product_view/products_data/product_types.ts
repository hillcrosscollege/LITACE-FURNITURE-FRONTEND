// types/products.ts
export type ProductStatus = "Published" | "Draft" | "Trash";
export type StockStatus = "In Stock" | "Low Stock" | "Out of Stock";

export type Product = {
  id: string;
  name: string;
  sku: string;
  image: string;
  category: string;
  price: number;
  originalPrice?: number;
  stock: number;
  stockStatus: StockStatus;
  status: ProductStatus;
  createdAt: string;
};

export const products: Product[] = [
  {
    id: "1",
    name: "Modern L-Shaped Sofa",
    sku: "FC-SOFA-001",
    image: "/conference_chair-2.png",
    category: "Living Room",
    price: 250000,
    originalPrice: 300000,
    stock: 12,
    stockStatus: "In Stock",
    status: "Published",
    createdAt: "May 20, 2024\n10:30 AM",
  },
  {
    id: "2",
    name: "Wooden Dining Set",
    sku: "FC-DIN-002",
    image: "/conference_chair-2.png",
    category: "Dining Room",
    price: 180000,
    stock: 4,
    stockStatus: "Low Stock",
    status: "Published",
    createdAt: "May 19, 2024\n02:15 PM",
  },
  {
    id: "3",
    name: "Luxury Wooden Bed",
    sku: "FC-BED-003",
    image: "/conference_chair-2.png",
    category: "Bedroom",
    price: 420000,
    originalPrice: 500000,
    stock: 2,
    stockStatus: "Low Stock",
    status: "Published",
    createdAt: "May 18, 2024\n11:45 AM",
  },
  {
    id: "4",
    name: "Ergonomic Office Chair",
    sku: "FC-CHAIR-004",
    image: "/conference_chair-2.png",
    category: "Office",
    price: 75000,
    stock: 20,
    stockStatus: "In Stock",
    status: "Published",
    createdAt: "May 18, 2024\n09:20 AM",
  },
  {
    id: "5",
    name: "Marble Coffee Table",
    sku: "FC-TABLE-005",
    image: "/conference_chair-2.png",
    category: "Living Room",
    price: 95000,
    stock: 6,
    stockStatus: "Low Stock",
    status: "Published",
    createdAt: "May 17, 2024\n04:10 PM",
  },
];

export const productTabs = [
  { label: "All Products", count: 142 },
  { label: "Published", count: 128 },
  { label: "Draft", count: 14 },
  { label: "Trash", count: 0 },
];

export const categoryStyles: Record<string, string> = {
  "Living Room": "bg-[#fdf5e0] text-[#8a6300]",
  "Dining Room": "bg-[#edf2fb] text-[#1a56c4]",
  Bedroom: "bg-[#f5f0fa] text-[#7048b6]",
  Office: "bg-[#edf7f2] text-[#1e6e3e]",
  Outdoor: "bg-[#e8fdf0] text-[#157a45]",
  Decor: "bg-[#fdecea] text-[#a32020]",
};

export const stockStatusStyles: Record<StockStatus, string> = {
  "In Stock": "text-[#2e7d52]",
  "Low Stock": "text-[#c0392b]",
  "Out of Stock": "text-[#888]",
};
