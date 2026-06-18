import { ProductTab, Variant, VariantAttribute } from "../product_details_type";

export const productTabs: ProductTab[] = [
  { label: "Overview" },
  { label: "Variants", count: 3 },
  { label: "Inventory" },
  { label: "Media", count: 6 },
  { label: "Reviews", count: 12 },
  { label: "Sales" },
  { label: "Activity" },
];

export const productDetail = {
  id: "1",
  name: "Modern L-Shaped Sofa",
  sku: "FC-SOFA-001",
  category: "Living Room",
  status: "In Stock" as const,
  images: [
    "/conference_chair-2.png",
    "/conference_chair-2.png",
    "/conference_chair-2.png",
    "/conference_chair-2.png",
    "/conference_chair-2.png",
  ],
  stats: {
    stock: { label: "Stock", value: "12 Units" },
    sold: { label: "Sold", value: "48 Units" },
    revenue: { label: "Total Revenue", value: "₦12,000,000" },
    created: { label: "Created", value: "May 10, 2024" },
  },
  information: {
    Brand: "FurniCasa",
    Weight: "46 kg",
    Dimensions: "200 × 140 × 85 cm",
    Warranty: "2 Years",
    SKU: "FC-SOFA-001",
  },
  pricing: {
    Price: "₦250,000",
    "Compare at Price": "₦300,000",
    "Cost Price": "₦150,000",
    "Profit Margin": "40%",
  },
  shipping: {
    "Shipping Weight": "50 kg",
    "Shipping Class": "Bulky",
    "Delivery Time": "3 - 7 days",
    "Return Policy": "7 days return",
  },
  description:
    "Premium quality L-shaped sofa with high density foam and hardwood frame. Perfect for modern living rooms.",
};

export const quickActions = [
  {
    label: "Manage Inventory",
    icon: "Archive",
    href: "inventory",
    danger: false,
  },
  { label: "Add Variant", icon: "Layers", href: "variants", danger: false },
  { label: "Add Images", icon: "ImagePlus", href: "media", danger: false },
  { label: "View Reviews", icon: "Star", href: "reviews", danger: false },
  {
    label: "Duplicate Product",
    icon: "Copy",
    href: "duplicate",
    danger: false,
  },
  { label: "Delete Product", icon: "Trash2", href: "delete", danger: true },
];

export const variants: Variant[] = [
  {
    id: "1",
    image: "/conference_chair-2.png",
    name: "Beige, Left Facing",
    attributes: "Color: Beige · Orientation: Left",
    price: 250000,
    stock: 5,
    sku: "FC-SOFA-001-BGL",
  },
  {
    id: "2",
    image: "/conference_chair-2.png",
    name: "Beige, Right Facing",
    attributes: "Color: Beige · Orientation: Right",
    price: 250000,
    stock: 4,
    sku: "FC-SOFA-001-BGR",
  },
  {
    id: "3",
    image: "/conference_chair-2.png",
    name: "Grey, Left Facing",
    attributes: "Color: Grey · Orientation: Left",
    price: 250000,
    stock: 2,
    sku: "FC-SOFA-001-GRL",
  },
];

export const variantAttributes: VariantAttribute[] = [
  { id: "1", name: "Color", values: ["Beige", "Grey"] },
  { id: "2", name: "Orientation", values: ["Left Facing", "Right Facing"] },
];

// types/product-inventory.ts
export type WarehouseStatus = "Active" | "Inactive";

export type WarehouseStock = {
  id: string;
  warehouse: string;
  inStock: number;
  reserved: number;
  available: number;
  status: WarehouseStatus;
};

export type StockHistoryItem = {
  id: string;
  date: string;
  type: "Restock" | "Sale" | "Adjustment" | "Return";
  quantity: number;
  note: string;
};

export type LowStockAlert = {
  id: string;
  warehouse: string;
  available: number;
  threshold: number;
};

export const warehouseStock: WarehouseStock[] = [
  {
    id: "1",
    warehouse: "Lagos Warehouse",
    inStock: 8,
    reserved: 2,
    available: 6,
    status: "Active",
  },
  {
    id: "2",
    warehouse: "Abuja Warehouse",
    inStock: 2,
    reserved: 0,
    available: 2,
    status: "Active",
  },
  {
    id: "3",
    warehouse: "Port Harcourt Warehouse",
    inStock: 2,
    reserved: 0,
    available: 2,
    status: "Active",
  },
];

export const stockHistory: StockHistoryItem[] = [
  {
    id: "1",
    date: "May 20, 2024",
    type: "Restock",
    quantity: +20,
    note: "Regular restock from supplier",
  },
  {
    id: "2",
    date: "May 18, 2024",
    type: "Sale",
    quantity: -3,
    note: "Order #FC12345",
  },
  {
    id: "3",
    date: "May 15, 2024",
    type: "Adjustment",
    quantity: -1,
    note: "Damaged unit removed from stock",
  },
  {
    id: "4",
    date: "May 10, 2024",
    type: "Return",
    quantity: +1,
    note: "Customer return — Order #FC12340",
  },
];

export const lowStockAlerts: LowStockAlert[] = [
  { id: "1", warehouse: "Abuja Warehouse", available: 2, threshold: 5 },
  { id: "2", warehouse: "Port Harcourt Warehouse", available: 2, threshold: 5 },
];

export const inventoryTabs = [
  "Current Stock",
  "Stock History",
  "Low Stock Alerts",
];

export const warehouseStatusStyles: Record<WarehouseStatus, string> = {
  Active: "bg-[#e8fdf0] text-[#157a45]",
  Inactive: "bg-[#fdecea] text-[#a32020]",
};

export const stockTypeStyles: Record<StockHistoryItem["type"], string> = {
  Restock: "bg-[#edf2fb] text-[#1a56c4]",
  Sale: "bg-[#fdf5e0] text-[#8a6300]",
  Adjustment: "bg-[#f5f0fa] text-[#7048b6]",
  Return: "bg-[#e8fdf0] text-[#157a45]",
};

// types/product-media.ts
export type MediaItem = {
  id: string;
  url: string;
  type: "image" | "video";
  isCover: boolean;
};

export const mediaItems: MediaItem[] = [
  { id: "1", url: "/conference_chair-2.png", type: "image", isCover: true },
  { id: "2", url: "/conference_chair-2.png", type: "image", isCover: false },
  { id: "3", url: "/conference_chair-2.png", type: "image", isCover: false },
  { id: "4", url: "/conference_chair-2.png", type: "image", isCover: false },
  { id: "5", url: "/conference_chair-2.png", type: "image", isCover: false },
  { id: "6", url: "/conference_chair-2.png", type: "image", isCover: false },
];
