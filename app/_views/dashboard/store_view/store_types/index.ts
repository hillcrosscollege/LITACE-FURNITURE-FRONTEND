export type StoreStatus = "Active" | "Inactive";
export type StoreType = "Warehouse" | "Showroom" | "Retail";

export type OperatingHours = {
  monday: string;
  tuesday: string;
  wednesday: string;
  thursday: string;
  friday: string;
  saturday: string;
  sunday: string;
};

export type Store = {
  id: string;
  name: string;
  image: string;
  storeCode: string;
  storeType: StoreType;
  location: string;
  address: string;
  phone: string;
  email: string;
  manager: string;
  status: StoreStatus;
  totalStock: number;
  inventoryValue: number;
  lowStockItems: number;
  outOfStockItems: number;
  availableStock: number;
  reserved: number;
  damaged: number;
  createdAt: string;
  lastUpdated: string;
  operatingHours: OperatingHours;
};

export type StoreProduct = {
  id: string;
  name: string;
  image: string;
  sku: string;
  category: string;
  totalStock: number;
  available: number;
  reserved: number;
  damaged: number;
  status: "Healthy" | "Low Stock" | "Out of Stock";
};

export type StoreTransfer = {
  id: string;
  date: string;
  product: string;
  type: "Incoming" | "Outgoing";
  from: string;
  to: string;
  quantity: number;
  reference: string;
  status: "Completed" | "Pending" | "Cancelled";
};

export type StoreManager = {
  id: string;
  name: string;
  avatar: string;
  role: string;
  phone: string;
  email: string;
  status: StoreStatus;
};

export type StoreMetrics = {
  productsStored: number;
  totalStockUnits: number;
  inventoryValue: number;
  avgStockTurnover: number;
  lastStockUpdate: string;
  lastTransfer: string;
};

export type AddStorePayload = {
  name: string;
  storeType: string;
  address: string;
  phone: string;
  email: string;
  managerId: string;
  operatingHours: OperatingHours;
};
