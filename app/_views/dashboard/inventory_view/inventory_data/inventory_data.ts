import {
  Package,
  PackageCheck,
  PackageMinus,
  PackageX,
  DollarSign,
} from "lucide-react";
import {
  InventoryProduct,
  InventoryLocation,
  StockHistoryEntry,
  StockMovement,
  RestockHistory,
  LowStockItem,
  InventoryStats,
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
    ],
    sku: "SOF-LS-001",
    category: "Living Room",
    brand: "FurniCasa",
    totalStock: 42,
    available: 38,
    reserved: 4,
    damaged: 0,
    lowStockLevel: 10,
    maxStockLevel: 100,
    status: "Healthy",
    locations: 3,
    unit: "Piece",
    sellingPrice: 650000,
    costPrice: 500000,
    inventoryValue: 35700000,
    lastRestocked: "12 May 2024",
    createdAt: "10 Jan 2024",
  },
  {
    id: "2",
    name: "Wooden Dining Set",
    image: "/conference_chair-2.png",
    images: ["/conference_chair-2.png", "/conference_chair-2.png"],
    sku: "DIN-WD-002",
    category: "Dining Room",
    brand: "WoodCraft",
    totalStock: 18,
    available: 15,
    reserved: 3,
    damaged: 0,
    lowStockLevel: 5,
    maxStockLevel: 50,
    status: "Low Stock",
    locations: 2,
    unit: "Set",
    sellingPrice: 180000,
    costPrice: 90000,
    inventoryValue: 3240000,
    lastRestocked: "8 May 2024",
    createdAt: "15 Jan 2024",
  },
  {
    id: "3",
    name: "Luxury Wooden Bed",
    image: "/conference_chair-2.png",
    images: ["/conference_chair-2.png", "/conference_chair-2.png"],
    sku: "BED-LX-003",
    category: "Bedroom",
    brand: "LuxeLiving",
    totalStock: 25,
    available: 22,
    reserved: 3,
    damaged: 0,
    lowStockLevel: 8,
    maxStockLevel: 60,
    status: "Healthy",
    locations: 2,
    unit: "Piece",
    sellingPrice: 350000,
    costPrice: 200000,
    inventoryValue: 8750000,
    lastRestocked: "5 May 2024",
    createdAt: "20 Jan 2024",
  },
  {
    id: "4",
    name: "Ergonomic Office Chair",
    image: "/conference_chair-2.png",
    images: ["/conference_chair-2.png"],
    sku: "CHR-ER-004",
    category: "Office",
    brand: "UrbanNest",
    totalStock: 36,
    available: 30,
    reserved: 6,
    damaged: 0,
    lowStockLevel: 10,
    maxStockLevel: 80,
    status: "Healthy",
    locations: 2,
    unit: "Piece",
    sellingPrice: 75000,
    costPrice: 35000,
    inventoryValue: 2700000,
    lastRestocked: "10 May 2024",
    createdAt: "22 Jan 2024",
  },
  {
    id: "5",
    name: "Marble Coffee Table",
    image: "/conference_chair-2.png",
    images: ["/conference_chair-2.png", "/conference_chair-2.png"],
    sku: "TAB-MB-005",
    category: "Living Room",
    brand: "ModernHome",
    totalStock: 8,
    available: 8,
    reserved: 0,
    damaged: 0,
    lowStockLevel: 3,
    maxStockLevel: 30,
    status: "Low Stock",
    locations: 1,
    unit: "Piece",
    sellingPrice: 95000,
    costPrice: 45000,
    inventoryValue: 760000,
    lastRestocked: "3 May 2024",
    createdAt: "25 Jan 2024",
  },
  {
    id: "6",
    name: "Queen Size Mattress",
    image: "/conference_chair-2.png",
    images: ["/conference_chair-2.png"],
    sku: "MAT-QS-006",
    category: "Bedroom",
    brand: "SleepWell",
    totalStock: 0,
    available: 0,
    reserved: 0,
    damaged: 0,
    lowStockLevel: 5,
    maxStockLevel: 40,
    status: "Out of Stock",
    locations: 1,
    unit: "Piece",
    sellingPrice: 120000,
    costPrice: 60000,
    inventoryValue: 0,
    lastRestocked: "20 Apr 2024",
    createdAt: "1 Feb 2024",
  },
  {
    id: "7",
    name: "Outdoor Lounge Chair",
    image: "/conference_chair-2.png",
    images: ["/conference_chair-2.png"],
    sku: "CHR-OL-007",
    category: "Outdoor",
    brand: "FurniCasa",
    totalStock: 14,
    available: 12,
    reserved: 2,
    damaged: 0,
    lowStockLevel: 5,
    maxStockLevel: 30,
    status: "Healthy",
    locations: 2,
    unit: "Piece",
    sellingPrice: 55000,
    costPrice: 28000,
    inventoryValue: 770000,
    lastRestocked: "14 May 2024",
    createdAt: "5 Feb 2024",
  },
];

export const fakeInventoryLocations: InventoryLocation[] = [
  {
    id: "1",
    store: "Main Warehouse",
    available: 20,
    reserved: 2,
    damaged: 0,
    onHold: 0,
    totalStock: 22,
    status: "Healthy",
  },
  {
    id: "2",
    store: "Lekki Showroom",
    available: 12,
    reserved: 1,
    damaged: 0,
    onHold: 0,
    totalStock: 13,
    status: "Healthy",
  },
  {
    id: "3",
    store: "Victoria Island Showroom",
    available: 6,
    reserved: 1,
    damaged: 0,
    onHold: 0,
    totalStock: 7,
    status: "Low Stock",
  },
];

export const fakeStockHistory: StockHistoryEntry[] = [
  {
    id: "1",
    date: "16 May 2024",
    quantity: -2,
    purpose: "Sold",
    reference: "ORD-10245",
    user: "John Doe",
    notes: "Order #10245",
  },
  {
    id: "2",
    date: "14 May 2024",
    quantity: 20,
    purpose: "Restocked",
    reference: "INV-0056",
    user: "Jane Smith",
    notes: "Supplier restock",
  },
  {
    id: "3",
    date: "10 May 2024",
    quantity: -1,
    purpose: "Adjusted",
    reference: "ADJ-0021",
    user: "Admin",
    notes: "Damaged item",
  },
  {
    id: "4",
    date: "8 May 2024",
    quantity: -5,
    purpose: "Transferred",
    reference: "TRF-0012",
    user: "John Doe",
    notes: "To Lekki Showroom",
  },
  {
    id: "5",
    date: "6 May 2024",
    quantity: 1,
    purpose: "Returned",
    reference: "RET-0009",
    user: "Jane Smith",
    notes: "Customer return",
  },
];

export const fakeStockMovements: StockMovement[] = [
  {
    id: "1",
    date: "16 May 2024",
    movementType: "Sale",
    quantity: -2,
    from: "Main Warehouse",
    to: "Customer",
    reference: "ORD-10245",
  },
  {
    id: "2",
    date: "14 May 2024",
    movementType: "Restock",
    quantity: 20,
    from: "Supplier",
    to: "Main Warehouse",
    reference: "INV-0056",
  },
  {
    id: "3",
    date: "10 May 2024",
    movementType: "Adjustment",
    quantity: -1,
    from: "Main Warehouse",
    to: "—",
    reference: "ADJ-0021",
  },
  {
    id: "4",
    date: "8 May 2024",
    movementType: "Transfer",
    quantity: -5,
    from: "Main Warehouse",
    to: "Lekki Showroom",
    reference: "TRF-0012",
  },
  {
    id: "5",
    date: "6 May 2024",
    movementType: "Return",
    quantity: 1,
    from: "Customer",
    to: "Main Warehouse",
    reference: "RET-0009",
  },
];

export const fakeRestockHistory: RestockHistory[] = [
  {
    id: "1",
    date: "14 May 2024",
    quantity: 20,
    supplier: "Royal Furniture Co.",
    unitCost: 520000,
    totalCost: 10400000,
    reference: "INV-0056",
  },
  {
    id: "2",
    date: "20 Apr 2024",
    quantity: 15,
    supplier: "Royal Furniture Co.",
    unitCost: 515000,
    totalCost: 7725000,
    reference: "INV-0043",
  },
  {
    id: "3",
    date: "18 Mar 2024",
    quantity: 10,
    supplier: "Interior Hub Ltd.",
    unitCost: 510000,
    totalCost: 6100000,
    reference: "INV-0031",
  },
];

export const fakeLowStockItems: LowStockItem[] = [
  {
    id: "2",
    name: "Wooden Dining Set",
    image: "/conference_chair-2.png",
    store: "Main Warehouse",
    available: 3,
    minimumLevel: 5,
    shortage: -2,
  },
  {
    id: "5",
    name: "Marble Coffee Table",
    image: "/conference_chair-2.png",
    store: "Main Warehouse",
    available: 1,
    minimumLevel: 3,
    shortage: -2,
  },
  {
    id: "3",
    name: "Luxury Wooden Bed",
    image: "/conference_chair-2.png",
    store: "Victoria Island Showroom",
    available: 2,
    minimumLevel: 2,
    shortage: -1,
  },
];

export const statIcons = [
  Package,
  PackageCheck,
  PackageMinus,
  PackageX,
  PackageX,
  DollarSign,
];

export const iconStyles = [
  { iconClassName: "text-primary", iconWrapperClassName: "bg-primary/10" },
  { iconClassName: "text-[#2e7d52]", iconWrapperClassName: "bg-[#edf7f2]" },
  { iconClassName: "text-[#3266ad]", iconWrapperClassName: "bg-[#edf2fb]" },
  { iconClassName: "text-[#c87941]", iconWrapperClassName: "bg-[#fdf0e6]" },
  { iconClassName: "text-[#c0392b]", iconWrapperClassName: "bg-[#fdecea]" },
  { iconClassName: "text-[#7048b6]", iconWrapperClassName: "bg-[#f0ebf7]" },
];

export const inventoryApi = {
  getInventory: async (): Promise<{
    products: InventoryProduct[];
    stats: InventoryStats;
  }> => {
    await delay(1100);
    return {
      products: fakeInventoryProducts,
      stats: {
        totalProducts: 128,
        totalStock: 2840,
        availableStock: 2450,
        lowStock: 28,
        outOfStock: 6,
        inventoryValue: 184250000,
      },
    };
  },
  getProductById: async (id: string): Promise<InventoryProduct> => {
    await delay(900);
    return (
      fakeInventoryProducts.find((p) => p.id === id) ?? fakeInventoryProducts[0]
    );
  },
  getLocations: async (productId: string): Promise<InventoryLocation[]> => {
    await delay(800);
    return fakeInventoryLocations;
  },
  getStockHistory: async (productId: string): Promise<StockHistoryEntry[]> => {
    await delay(800);
    return fakeStockHistory;
  },
  getStockMovements: async (productId: string): Promise<StockMovement[]> => {
    await delay(800);
    return fakeStockMovements;
  },
  getRestockHistory: async (productId: string): Promise<RestockHistory[]> => {
    await delay(800);
    return fakeRestockHistory;
  },
  getLowStock: async (): Promise<LowStockItem[]> => {
    await delay(900);
    return fakeLowStockItems;
  },
  adjustStock: async (data: any): Promise<void> => {
    await delay(700);
    console.log("Adjust:", data);
  },
  restockInventory: async (data: any): Promise<void> => {
    await delay(700);
    console.log("Restock:", data);
  },
  transferStock: async (data: any): Promise<void> => {
    await delay(700);
    console.log("Transfer:", data);
  },
  exportReport: async (data: any): Promise<void> => {
    await delay(900);
    console.log("Export:", data);
  },
};
