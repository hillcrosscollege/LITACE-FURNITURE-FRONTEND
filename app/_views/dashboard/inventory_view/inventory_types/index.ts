// types/inventory-api.ts
export type InventoryStatus = "Healthy" | "Low Stock" | "Out of Stock";

export type InventoryProduct = {
  id: string;
  name: string;
  image: string;
  images: string[];
  sku: string;
  category: string;
  brand: string;
  totalStock: number;
  available: number;
  reserved: number;
  damaged: number;
  lowStockLevel: number;
  maxStockLevel: number;
  status: InventoryStatus;
  locations: number;
  unit: string;
  sellingPrice: number;
  costPrice: number;
  inventoryValue: number;
  lastRestocked: string;
  createdAt: string;
};

export type InventoryLocation = {
  id: string;
  store: string;
  available: number;
  reserved: number;
  damaged: number;
  onHold: number;
  totalStock: number;
  status: InventoryStatus;
};

export type StockHistoryEntry = {
  id: string;
  date: string;
  quantity: number;
  purpose: string;
  reference: string;
  user: string;
  notes: string;
};

export type StockMovement = {
  id: string;
  date: string;
  movementType: string;
  quantity: number;
  from: string;
  to: string;
  reference: string;
};

export type RestockHistory = {
  id: string;
  date: string;
  quantity: number;
  supplier: string;
  unitCost: number;
  totalCost: number;
  reference: string;
};

export type LowStockItem = {
  id: string;
  name: string;
  image: string;
  store: string;
  available: number;
  minimumLevel: number;
  shortage: number;
};

export type InventoryStats = {
  totalProducts: number;
  totalStock: number;
  availableStock: number;
  lowStock: number;
  outOfStock: number;
  inventoryValue: number;
};
