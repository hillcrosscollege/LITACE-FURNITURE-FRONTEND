import {
  OperatingHours,
  Store,
  StoreProduct,
  StoreTransfer,
  StoreManager,
  StoreMetrics,
  AddStorePayload,
} from "../store_types";

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export const defaultHours: OperatingHours = {
  monday: "8:00 AM - 6:00 PM",
  tuesday: "8:00 AM - 6:00 PM",
  wednesday: "8:00 AM - 6:00 PM",
  thursday: "8:00 AM - 6:00 PM",
  friday: "8:00 AM - 6:00 PM",
  saturday: "9:00 AM - 4:00 PM",
  sunday: "Closed",
};

export const fakeStores: Store[] = [
  {
    id: "1",
    name: "Main Warehouse",
    image: "/conference_chair-2.png",
    storeCode: "ST-001",
    storeType: "Warehouse",
    location: "Ikeja, Lagos",
    address: "12 Warehouse Road, Ikeja, Lagos, Nigeria",
    phone: "+234 809 123 4567",
    email: "warehouse@furnicasa.com",
    manager: "Tunde Adewale",
    status: "Active",
    totalStock: 1250,
    inventoryValue: 85450000,
    lowStockItems: 8,
    outOfStockItems: 1,
    availableStock: 1180,
    reserved: 60,
    damaged: 10,
    createdAt: "10 Jan 2024",
    lastUpdated: "18 May 2024",
    operatingHours: defaultHours,
  },
  {
    id: "2",
    name: "Lekki Showroom",
    image: "/conference_chair-2.png",
    storeCode: "ST-002",
    storeType: "Showroom",
    location: "Lekki Phase 1, Lagos",
    address: "5 Admiralty Way, Lekki Phase 1, Lagos",
    phone: "+234 809 234 5678",
    email: "lekki@furnicasa.com",
    manager: "Adaeze Obi",
    status: "Active",
    totalStock: 620,
    inventoryValue: 42710000,
    lowStockItems: 6,
    outOfStockItems: 2,
    availableStock: 580,
    reserved: 35,
    damaged: 5,
    createdAt: "15 Jan 2024",
    lastUpdated: "17 May 2024",
    operatingHours: defaultHours,
  },
  {
    id: "3",
    name: "Victoria Island Showroom",
    image: "/conference_chair-2.png",
    storeCode: "ST-003",
    storeType: "Showroom",
    location: "Victoria Island, Lagos",
    address: "23 Adeola Odeku Street, Victoria Island, Lagos",
    phone: "+234 809 345 6789",
    email: "vi@furnicasa.com",
    manager: "Emeka Okafor",
    status: "Active",
    totalStock: 480,
    inventoryValue: 31600000,
    lowStockItems: 4,
    outOfStockItems: 1,
    availableStock: 445,
    reserved: 30,
    damaged: 5,
    createdAt: "20 Jan 2024",
    lastUpdated: "16 May 2024",
    operatingHours: defaultHours,
  },
  {
    id: "4",
    name: "Abuja Showroom",
    image: "/conference_chair-2.png",
    storeCode: "ST-004",
    storeType: "Showroom",
    location: "Wuse 2, Abuja",
    address: "8 Gana Street, Maitama, Abuja",
    phone: "+234 809 456 7890",
    email: "abuja@furnicasa.com",
    manager: "Halima Yusuf",
    status: "Active",
    totalStock: 490,
    inventoryValue: 24420000,
    lowStockItems: 10,
    outOfStockItems: 2,
    availableStock: 450,
    reserved: 35,
    damaged: 5,
    createdAt: "1 Feb 2024",
    lastUpdated: "15 May 2024",
    operatingHours: defaultHours,
  },
];

export const fakeStoreProducts: StoreProduct[] = [
  {
    id: "1",
    name: "Modern L-Shaped Sofa",
    image: "/conference_chair-2.png",
    sku: "SOF-LS-001",
    category: "Living Room",
    totalStock: 20,
    available: 18,
    reserved: 2,
    damaged: 0,
    status: "Healthy",
  },
  {
    id: "2",
    name: "Wooden Dining Set",
    image: "/conference_chair-2.png",
    sku: "DIN-WD-002",
    category: "Dining Room",
    totalStock: 15,
    available: 14,
    reserved: 1,
    damaged: 0,
    status: "Healthy",
  },
  {
    id: "3",
    name: "Luxury Wooden Bed",
    image: "/conference_chair-2.png",
    sku: "BED-LX-003",
    category: "Bedroom",
    totalStock: 18,
    available: 17,
    reserved: 1,
    damaged: 0,
    status: "Healthy",
  },
  {
    id: "4",
    name: "Ergonomic Office Chair",
    image: "/conference_chair-2.png",
    sku: "CHR-ER-004",
    category: "Office",
    totalStock: 25,
    available: 24,
    reserved: 1,
    damaged: 0,
    status: "Healthy",
  },
  {
    id: "5",
    name: "Marble Coffee Table",
    image: "/conference_chair-2.png",
    sku: "TAB-MB-005",
    category: "Living Room",
    totalStock: 12,
    available: 10,
    reserved: 2,
    damaged: 0,
    status: "Low Stock",
  },
];

export const fakeStoreTransfers: StoreTransfer[] = [
  {
    id: "1",
    date: "18 May 2024",
    product: "Modern L-Shaped Sofa",
    type: "Incoming",
    from: "Lekki Showroom",
    to: "Main Warehouse",
    quantity: 5,
    reference: "TRF-00165",
    status: "Completed",
  },
  {
    id: "2",
    date: "16 May 2024",
    product: "Wooden Dining Set",
    type: "Outgoing",
    from: "Main Warehouse",
    to: "Victoria Island Showroom",
    quantity: 3,
    reference: "TRF-00140",
    status: "Completed",
  },
  {
    id: "3",
    date: "15 May 2024",
    product: "Luxury Wooden Bed",
    type: "Incoming",
    from: "Abuja Showroom",
    to: "Main Warehouse",
    quantity: 2,
    reference: "TRF-00135",
    status: "Completed",
  },
  {
    id: "4",
    date: "12 May 2024",
    product: "Ergonomic Office Chair",
    type: "Outgoing",
    from: "Main Warehouse",
    to: "Lekki Showroom",
    quantity: 4,
    reference: "TRF-00130",
    status: "Completed",
  },
  {
    id: "5",
    date: "8 May 2024",
    product: "Marble Coffee Table",
    type: "Outgoing",
    from: "Main Warehouse",
    to: "Abuja Showroom",
    quantity: 2,
    reference: "TRF-00125",
    status: "Completed",
  },
];

export const fakeStoreManagers: StoreManager[] = [
  {
    id: "1",
    name: "Tunde Adewale",
    avatar: "/conference_chair-2.png",
    role: "Store Manager",
    phone: "+234 809 123 4567",
    email: "tunde@furnicasa.com",
    status: "Active",
  },
  {
    id: "2",
    name: "Bola Ahmed",
    avatar: "/conference_chair-2.png",
    role: "Assistant Manager",
    phone: "+234 803 456 7890",
    email: "bola@furnicasa.com",
    status: "Active",
  },
  {
    id: "3",
    name: "Chinedu Okeke",
    avatar: "/conference_chair-2.png",
    role: "Inventory Officer",
    phone: "+234 811 987 6543",
    email: "chinedu@furnicasa.com",
    status: "Active",
  },
];

export const fakeStoreMetrics: StoreMetrics = {
  productsStored: 156,
  totalStockUnits: 1250,
  inventoryValue: 85450000,
  avgStockTurnover: 2.4,
  lastStockUpdate: "18 May 2024",
  lastTransfer: "15 May 2024",
};

export const storesApi = {
  getStores: async (): Promise<{
    stores: Store[];
    stats: {
      totalStores: number;
      totalStock: number;
      inventoryValue: number;
      lowStockItems: number;
      outOfStockItems: number;
    };
  }> => {
    await delay(1100);
    return {
      stores: fakeStores,
      stats: {
        totalStores: 4,
        totalStock: 2840,
        inventoryValue: 184250000,
        lowStockItems: 28,
        outOfStockItems: 6,
      },
    };
  },
  getStoreById: async (id: string): Promise<Store> => {
    await delay(900);
    return fakeStores.find((s) => s.id === id) ?? fakeStores[0];
  },
  getStoreProducts: async (id: string): Promise<StoreProduct[]> => {
    await delay(800);
    return fakeStoreProducts;
  },
  getStoreTransfers: async (id: string): Promise<StoreTransfer[]> => {
    await delay(800);
    return fakeStoreTransfers;
  },
  getStoreManagers: async (id: string): Promise<StoreManager[]> => {
    await delay(800);
    return fakeStoreManagers;
  },
  getStoreMetrics: async (id: string): Promise<StoreMetrics> => {
    await delay(700);
    return fakeStoreMetrics;
  },
  addStore: async (payload: AddStorePayload): Promise<Store> => {
    await delay(900);
    return {
      ...fakeStores[0],
      id: String(Date.now()),
      name: payload.name,
      storeCode: `ST-00${fakeStores.length + 1}`,
    };
  },
  updateStore: async (
    id: string,
    payload: Partial<AddStorePayload>,
  ): Promise<Store> => {
    await delay(800);
    return { ...fakeStores.find((s) => s.id === id)!, ...payload } as Store;
  },
  deleteStore: async (id: string): Promise<void> => {
    await delay(800);
    console.log("Delete store:", id);
  },
  transferStock: async (data: any): Promise<void> => {
    await delay(700);
    console.log("Transfer stock:", data);
  },
  adjustStock: async (data: any): Promise<void> => {
    await delay(700);
    console.log("Adjust stock:", data);
  },
  addManager: async (storeId: string, data: any): Promise<void> => {
    await delay(700);
    console.log("Add manager:", { storeId, data });
  },
  updateStoreSettings: async (id: string, data: any): Promise<void> => {
    await delay(700);
    console.log("Update store settings:", { id, data });
  },
};
