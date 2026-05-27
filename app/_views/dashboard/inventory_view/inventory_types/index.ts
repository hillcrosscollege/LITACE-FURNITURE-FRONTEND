// types/inventory.ts
export type InventoryStatus = "In Stock" | "Low Stock" | "Out of Stock";

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
