export type InventoryStatus = "In Stock" | "Low Stock" | "Out of Stock";
export type AdjustmentType = "Increase Stock" | "Decrease Stock";

export type InventoryItem = {
  id: string;
  name: string;
  image: string;
  sku: string;
  category: string;
  stock: number;
  status: InventoryStatus;
  lastUpdated: string;
};

export type InventoryProduct = {
  id: string;
  name: string;
  image: string;
  images: string[];
  sku: string;
  category: string;
  stock: number;
  reserved: number;
  available: number;
  status: InventoryStatus;
  location: string;
  lastUpdated: string;
  brand: string;
  supplier: string;
  weight: string;
  dimensions: string;
  warranty: string;
  costPrice: number;
  sellingPrice: number;
  lowStockAlert: number;
  reorderLevel: number;
  description: string;
};

export type InventoryLocation = {
  id: string;
  name: string;
  address: string;
  manager: string;
  inStock: number;
  reserved: number;
  available: number;
  notes: string;
};

export type StockMovement = {
  id: string;
  type: "Restock" | "Sale" | "Adjustment" | "Transfer" | "Return";
  quantity: number;
  from: string;
  to: string;
  date: string;
  note: string;
  reference: string;
};

export type InventoryStats = {
  totalProducts: number;
  inStock: number;
  lowStock: number;
  outOfStock: number;
  totalInventoryValue: number;
};

export type LowStockAlert = {
  id: string;
  name: string;
  image: string;
  sku: string;
  available: number;
  reorderLevel: number;
};
