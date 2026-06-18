import {
  InventoryProduct,
  InventoryLocation,
  StockMovement,
  LowStockAlert,
  InventoryStats,
  AdjustmentType,
  InventoryStatus,
  InventoryItem,
} from "../inventory_types";

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export const fakeInventoryProducts: InventoryProduct[] = [
  {
    id: "1",
    name: "Modern L-Shaped Sofa",
    image: "/conference_chair-2.png",
    images: [
      "/conference_chair-2.png",
      "/conference_chair-2.png",
      "/conference_chair-2.png",
      "/conference_chair-2.png",
    ],
    sku: "FC-SOFA-001",
    category: "Living Room",
    stock: 12,
    reserved: 2,
    available: 10,
    status: "In Stock",
    location: "Lagos Warehouse",
    lastUpdated: "May 20, 2024 10:30 AM",
    brand: "FurniCasa",
    supplier: "FurniCasa Furnitures",
    weight: "65 kg",
    dimensions: "200 × 140 × 85 cm",
    warranty: "2 Years",
    costPrice: 150000,
    sellingPrice: 250000,
    lowStockAlert: 5,
    reorderLevel: 5,
    description:
      "Premium quality L-shaped sofa with high density foam and hardwood frame. Perfect for modern living rooms.",
  },
  {
    id: "2",
    name: "Wooden Dining Set",
    image: "/conference_chair-2.png",
    images: ["/conference_chair-2.png", "/conference_chair-2.png"],
    sku: "FC-DIN-002",
    category: "Dining Room",
    stock: 4,
    reserved: 1,
    available: 3,
    status: "Low Stock",
    location: "Lagos Warehouse",
    lastUpdated: "May 19, 2024 02:15 PM",
    brand: "WoodCraft",
    supplier: "WoodCraft Ltd",
    weight: "45 kg",
    dimensions: "180 × 90 × 75 cm",
    warranty: "1 Year",
    costPrice: 90000,
    sellingPrice: 180000,
    lowStockAlert: 5,
    reorderLevel: 5,
    description: "Wooden dining set with 6 chairs.",
  },
  {
    id: "3",
    name: "Luxury Wooden Bed",
    image: "/conference_chair-2.png",
    images: ["/conference_chair-2.png", "/conference_chair-2.png"],
    sku: "FC-BED-003",
    category: "Bedroom",
    stock: 2,
    reserved: 0,
    available: 2,
    status: "Low Stock",
    location: "Abuja Warehouse",
    lastUpdated: "May 18, 2024 11:45 AM",
    brand: "LuxeLiving",
    supplier: "LuxeLiving Co",
    weight: "80 kg",
    dimensions: "200 × 160 × 120 cm",
    warranty: "2 Years",
    costPrice: 200000,
    sellingPrice: 350000,
    lowStockAlert: 5,
    reorderLevel: 5,
    description: "Luxury wooden bed with premium mattress support.",
  },
  {
    id: "4",
    name: "Ergonomic Office Chair",
    image: "/conference_chair-2.png",
    images: ["/conference_chair-2.png"],
    sku: "FC-CHAIR-004",
    category: "Office",
    stock: 20,
    reserved: 5,
    available: 15,
    status: "In Stock",
    location: "Lagos Warehouse",
    lastUpdated: "May 18, 2024 09:20 AM",
    brand: "UrbanNest",
    supplier: "UrbanNest Supplies",
    weight: "15 kg",
    dimensions: "65 × 65 × 120 cm",
    warranty: "1 Year",
    costPrice: 35000,
    sellingPrice: 75000,
    lowStockAlert: 5,
    reorderLevel: 10,
    description: "Ergonomic office chair with lumbar support.",
  },
  {
    id: "5",
    name: "Marble Coffee Table",
    image: "/conference_chair-2.png",
    images: ["/conference_chair-2.png", "/conference_chair-2.png"],
    sku: "FC-TABLE-005",
    category: "Living Room",
    stock: 6,
    reserved: 1,
    available: 5,
    status: "Low Stock",
    location: "Port Harcourt Warehouse",
    lastUpdated: "May 17, 2024 04:10 PM",
    brand: "ModernHome",
    supplier: "ModernHome Ltd",
    weight: "30 kg",
    dimensions: "120 × 60 × 45 cm",
    warranty: "1 Year",
    costPrice: 45000,
    sellingPrice: 95000,
    lowStockAlert: 5,
    reorderLevel: 5,
    description: "Marble top coffee table with steel base.",
  },
  {
    id: "6",
    name: "Outdoor Patio Set",
    image: "/conference_chair-2.png",
    images: ["/conference_chair-2.png"],
    sku: "FC-OUT-006",
    category: "Outdoor",
    stock: 0,
    reserved: 0,
    available: 0,
    status: "Out of Stock",
    location: "Lagos Warehouse",
    lastUpdated: "May 16, 2024 03:30 PM",
    brand: "FurniCasa",
    supplier: "FurniCasa Furnitures",
    weight: "50 kg",
    dimensions: "200 × 150 × 75 cm",
    warranty: "1 Year",
    costPrice: 60000,
    sellingPrice: 120000,
    lowStockAlert: 5,
    reorderLevel: 5,
    description: "Weather-resistant outdoor patio set.",
  },
  {
    id: "7",
    name: "Bookshelf Unit",
    image: "/conference_chair-2.png",
    images: ["/conference_chair-2.png", "/conference_chair-2.png"],
    sku: "FC-SHELF-007",
    category: "Office",
    stock: 15,
    reserved: 3,
    available: 12,
    status: "In Stock",
    location: "Abuja Warehouse",
    lastUpdated: "May 16, 2024 10:05 AM",
    brand: "WoodCraft",
    supplier: "WoodCraft Ltd",
    weight: "25 kg",
    dimensions: "80 × 30 × 180 cm",
    warranty: "1 Year",
    costPrice: 25000,
    sellingPrice: 55000,
    lowStockAlert: 5,
    reorderLevel: 5,
    description: "5-shelf bookshelf unit with adjustable shelves.",
  },
];

export const fakeInventoryLocations: InventoryLocation[] = [
  {
    id: "1",
    name: "Lagos Warehouse",
    address: "12 Furniture Street, Lagos",
    manager: "John Manager",
    inStock: 8,
    reserved: 1,
    available: 7,
    notes: "Main warehouse",
  },
  {
    id: "2",
    name: "Abuja Warehouse",
    address: "5 Wuse Zone 4, Abuja",
    manager: "Sarah Admin",
    inStock: 2,
    reserved: 1,
    available: 1,
    notes: "Secondary warehouse",
  },
  {
    id: "3",
    name: "Port Harcourt Warehouse",
    address: "3 Trans Amadi, Port Harcourt",
    manager: "Mike Lead",
    inStock: 1,
    reserved: 0,
    available: 1,
    notes: "",
  },
  {
    id: "4",
    name: "Kano Warehouse",
    address: "8 Bompai Road, Kano",
    manager: "Ali Manager",
    inStock: 1,
    reserved: 0,
    available: 1,
    notes: "",
  },
];

export const fakeStockMovements: StockMovement[] = [
  {
    id: "1",
    type: "Restock",
    quantity: +20,
    from: "Supplier",
    to: "Lagos Warehouse",
    date: "May 20, 2024",
    note: "Regular restock",
    reference: "PO-#1876",
  },
  {
    id: "2",
    type: "Sale",
    quantity: -3,
    from: "Lagos Warehouse",
    to: "Customer",
    date: "May 18, 2024",
    note: "Order #FC12345",
    reference: "ORD-12345",
  },
  {
    id: "3",
    type: "Transfer",
    quantity: -2,
    from: "Lagos Warehouse",
    to: "Abuja Warehouse",
    date: "May 15, 2024",
    note: "Stock rebalancing",
    reference: "TRF-001",
  },
  {
    id: "4",
    type: "Adjustment",
    quantity: -1,
    from: "Lagos Warehouse",
    to: "—",
    date: "May 14, 2024",
    note: "Damaged unit",
    reference: "ADJ-001",
  },
  {
    id: "5",
    type: "Return",
    quantity: +1,
    from: "Customer",
    to: "Lagos Warehouse",
    date: "May 10, 2024",
    note: "Customer return #FC12340",
    reference: "RET-001",
  },
];

export const fakeLowStockAlerts: LowStockAlert[] = [
  {
    id: "1",
    name: "Wooden Dining Set",
    image: "/conference_chair-2.png",
    sku: "FC-DIN-002",
    available: 3,
    reorderLevel: 5,
  },
  {
    id: "2",
    name: "Luxury Wooden Bed",
    image: "/conference_chair-2.png",
    sku: "FC-BED-003",
    available: 2,
    reorderLevel: 5,
  },
  {
    id: "3",
    name: "Marble Coffee Table",
    image: "/conference_chair-2.png",
    sku: "FC-TABLE-005",
    available: 5,
    reorderLevel: 5,
  },
  {
    id: "4",
    name: "Bookshelf Unit",
    image: "/conference_chair-2.png",
    sku: "FC-SHELF-007",
    available: 3,
    reorderLevel: 5,
  },
];

export const inventoryApi = {
  getInventory: async (): Promise<{
    products: InventoryProduct[];
    stats: InventoryStats;
  }> => {
    await delay(1200);
    return {
      products: fakeInventoryProducts,
      stats: {
        totalProducts: 142,
        inStock: 89,
        lowStock: 23,
        outOfStock: 30,
        totalInventoryValue: 18450000,
      },
    };
  },

  getProductById: async (id: string): Promise<InventoryProduct> => {
    await delay(1000);
    const product = fakeInventoryProducts.find((p) => p.id === id);
    if (!product) throw new Error("Product not found");
    return product;
  },

  getLocations: async (): Promise<InventoryLocation[]> => {
    await delay(900);
    return fakeInventoryLocations;
  },

  getStockMovements: async (productId: string): Promise<StockMovement[]> => {
    await delay(800);
    return fakeStockMovements;
  },

  getLowStockAlerts: async (): Promise<LowStockAlert[]> => {
    await delay(800);
    return fakeLowStockAlerts;
  },

  adjustStock: async (
    productId: string,
    type: AdjustmentType,
    qty: number,
    reason: string,
    note: string,
  ): Promise<void> => {
    await delay(700);
    console.log("Adjust stock:", { productId, type, qty, reason, note });
  },

  addStock: async (
    productId: string,
    supplier: string,
    qty: number,
    unitCost: number,
    reference: string,
    note: string,
  ): Promise<void> => {
    await delay(700);
    console.log("Add stock:", {
      productId,
      supplier,
      qty,
      unitCost,
      reference,
      note,
    });
  },

  transferStock: async (
    productId: string,
    from: string,
    to: string,
    qty: number,
    note: string,
  ): Promise<void> => {
    await delay(700);
    console.log("Transfer stock:", { productId, from, to, qty, note });
  },

  addLocation: async (
    name: string,
    address: string,
    manager: string,
    notes: string,
  ): Promise<void> => {
    await delay(700);
    console.log("Add location:", { name, address, manager, notes });
  },

  exportInventory: async (
    format: string,
    includes: string[],
  ): Promise<void> => {
    await delay(800);
    console.log("Export:", { format, includes });
  },
};

export const inventoryItems: InventoryItem[] = [
  {
    id: "1",
    name: "Modern L-Shaped Sofa",
    image: "/conference_chair-2.png",
    sku: "FC-SOFA-001",
    category: "Living Room",
    stock: 12,
    status: "In Stock",
    lastUpdated: "May 20, 2024\n10:30 AM",
  },
  {
    id: "2",
    name: "Wooden Dining Set",
    image: "/conference_chair-2.png",
    sku: "FC-DIN-002",
    category: "Dining Room",
    stock: 4,
    status: "Low Stock",
    lastUpdated: "May 19, 2024\n02:15 PM",
  },
  {
    id: "3",
    name: "Luxury Wooden Bed",
    image: "/conference_chair-2.png",
    sku: "FC-BED-003",
    category: "Bedroom",
    stock: 2,
    status: "Low Stock",
    lastUpdated: "May 18, 2024\n11:45 AM",
  },
  {
    id: "4",
    name: "Ergonomic Office Chair",
    image: "/conference_chair-2.png",
    sku: "FC-CHAIR-004",
    category: "Office",
    stock: 20,
    status: "In Stock",
    lastUpdated: "May 18, 2024\n09:20 AM",
  },
  {
    id: "5",
    name: "Marble Coffee Table",
    image: "/conference_chair-2.png",
    sku: "FC-TABLE-005",
    category: "Living Room",
    stock: 6,
    status: "Low Stock",
    lastUpdated: "May 17, 2024\n04:10 PM",
  },
  {
    id: "6",
    name: "Outdoor Patio Set",
    image: "/conference_chair-2.png",
    sku: "FC-OUT-006",
    category: "Outdoor",
    stock: 0,
    status: "Out of Stock",
    lastUpdated: "May 16, 2024\n03:30 PM",
  },
  {
    id: "7",
    name: "Bookshelf Unit",
    image: "/conference_chair-2.png",
    sku: "FC-SHELF-007",
    category: "Office",
    stock: 15,
    status: "In Stock",
    lastUpdated: "May 16, 2024\n10:05 AM",
  },
];

export const inventoryStats = [
  {
    title: "Total Products",
    value: "142",
    subLabel: "All products in store",
    iconClassName: "text-[#7048b6]",
    iconWrapperClassName: "bg-[#f0ebf7]",
  },
  {
    title: "In Stock",
    value: "89",
    subLabel: "Products in stock",
    iconClassName: "text-[#2e7d52]",
    iconWrapperClassName: "bg-[#edf7f2]",
  },
  {
    title: "Low Stock",
    value: "23",
    subLabel: "Products low on stock",
    iconClassName: "text-[#c87941]",
    iconWrapperClassName: "bg-[#fdf0e6]",
  },
  {
    title: "Out of Stock",
    value: "30",
    subLabel: "Products out of stock",
    iconClassName: "text-[#c0392b]",
    iconWrapperClassName: "bg-[#fdecea]",
  },
];

export const inventoryStatusStyles: Record<InventoryStatus, string> = {
  "In Stock": "bg-[#e8fdf0] text-[#157a45]",
  "Low Stock": "bg-[#fdf5e0] text-[#8a6300]",
  "Out of Stock": "bg-[#fdecea] text-[#a32020]",
};
