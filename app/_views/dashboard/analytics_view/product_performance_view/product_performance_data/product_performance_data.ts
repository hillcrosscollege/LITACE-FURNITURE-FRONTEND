import {
  ProductPerfStats,
  TopPerformingProduct,
  LowPerformingProduct,
  AllProductPerf,
  CategoryPerf,
  ProductInsight,
  ProductDetail,
} from "../product_performance_types";

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export const fakeProductPerfStats: ProductPerfStats = {
  totalProducts: { value: 128, change: 8.5, direction: "up" },
  topSellingProduct: {
    value: "Modern L-Shaped Sofa",
    subLabel: "R2,450,000 Revenue",
  },
  productsSold: { value: 568, change: 12.3, direction: "up" },
  lowPerformingProducts: { value: 12, change: 4, direction: "down" },
  outOfStockProducts: { value: 7, subLabel: "View inventory" },
};

export const fakeTopPerformingProducts: TopPerformingProduct[] = [
  {
    id: "1",
    rank: 1,
    name: "Modern L-Shaped Sofa",
    image: "/conference_chair-2.png",
    category: "Living Room",
    revenue: 2450000,
    orders: 128,
    unitsSold: 128,
    profit: 980000,
  },
  {
    id: "2",
    rank: 2,
    name: "Wooden Dining Set",
    image: "/conference_chair-2.png",
    category: "Dining Room",
    revenue: 1860000,
    orders: 96,
    unitsSold: 96,
    profit: 720000,
  },
  {
    id: "3",
    rank: 3,
    name: "Luxury Wooden Bed",
    image: "/conference_chair-2.png",
    category: "Bedroom",
    revenue: 1660000,
    orders: 72,
    unitsSold: 72,
    profit: 610000,
  },
  {
    id: "4",
    rank: 4,
    name: "Ergonomic Office Chair",
    image: "/conference_chair-2.png",
    category: "Office",
    revenue: 950000,
    orders: 54,
    unitsSold: 54,
    profit: 380000,
  },
  {
    id: "5",
    rank: 5,
    name: "Marble Coffee Table",
    image: "/conference_chair-2.png",
    category: "Living Room",
    revenue: 750000,
    orders: 48,
    unitsSold: 48,
    profit: 300000,
  },
];

export const fakeLowPerformingProducts: LowPerformingProduct[] = [
  {
    id: "6",
    name: "Outdoor Lounge Chair",
    image: "/conference_chair-2.png",
    category: "Outdoor",
    views: 120,
    orders: 1,
    conversion: 0.83,
    revenue: 25000,
  },
  {
    id: "7",
    name: "Wall Mirror (Round)",
    image: "/conference_chair-2.png",
    category: "Decor",
    views: 98,
    orders: 1,
    conversion: 1.02,
    revenue: 30000,
  },
  {
    id: "8",
    name: "Bookshelf Unit",
    image: "/conference_chair-2.png",
    category: "Office",
    views: 110,
    orders: 1,
    conversion: 0.91,
    revenue: 18000,
  },
  {
    id: "9",
    name: "Bar Stool",
    image: "/conference_chair-2.png",
    category: "Dining Room",
    views: 95,
    orders: 0,
    conversion: 0,
    revenue: 0,
  },
  {
    id: "10",
    name: "Patio Coffee Table",
    image: "/conference_chair-2.png",
    category: "Outdoor",
    views: 80,
    orders: 0,
    conversion: 0,
    revenue: 0,
  },
];

export const fakeAllProductsPerf: AllProductPerf[] = [
  {
    id: "1",
    name: "Modern L-Shaped Sofa",
    image: "/conference_chair-2.png",
    category: "Living Room",
    revenue: 2450000,
    orders: 128,
    unitsSold: 128,
    views: 1250,
    conversionRate: 10.24,
    avgPrice: 191406,
    status: "Active",
  },
  {
    id: "2",
    name: "Wooden Dining Set",
    image: "/conference_chair-2.png",
    category: "Dining Room",
    revenue: 1860000,
    orders: 96,
    unitsSold: 96,
    views: 980,
    conversionRate: 9.8,
    avgPrice: 186000,
    status: "Active",
  },
  {
    id: "3",
    name: "Luxury Wooden Bed",
    image: "/conference_chair-2.png",
    category: "Bedroom",
    revenue: 1660000,
    orders: 72,
    unitsSold: 72,
    views: 820,
    conversionRate: 8.78,
    avgPrice: 230556,
    status: "Active",
  },
  {
    id: "4",
    name: "Ergonomic Office Chair",
    image: "/conference_chair-2.png",
    category: "Office",
    revenue: 950000,
    orders: 54,
    unitsSold: 54,
    views: 610,
    conversionRate: 8.85,
    avgPrice: 175926,
    status: "Active",
  },
  {
    id: "5",
    name: "Marble Coffee Table",
    image: "/conference_chair-2.png",
    category: "Living Room",
    revenue: 750000,
    orders: 48,
    unitsSold: 48,
    views: 540,
    conversionRate: 8.89,
    avgPrice: 93750,
    status: "Active",
  },
];

export const fakeCategoryPerf: CategoryPerf[] = [
  { category: "Living Room", revenue: 7380000, pctOfTotal: 40.0 },
  { category: "Bedroom", revenue: 4610000, pctOfTotal: 25.0 },
  { category: "Dining Room", revenue: 3230000, pctOfTotal: 17.5 },
  { category: "Office", revenue: 2120000, pctOfTotal: 11.5 },
  { category: "Outdoor", revenue: 1110000, pctOfTotal: 6.0 },
];

export const fakeProductInsights: ProductInsight[] = [
  {
    id: "1",
    type: "top",
    title: "Modern L-Shaped Sofa is your top seller",
    detail: "R2,450,000 in revenue.",
  },
  {
    id: "2",
    type: "warning",
    title: "12 products are underperforming",
    detail: "Consider improving visibility or reviewing prices.",
  },
  {
    id: "3",
    type: "info",
    title: "Living Room category generates the most revenue",
    detail: "Consider expanding this category.",
  },
];

export const fakeProductDetail: ProductDetail = {
  id: "1",
  name: "Modern L-Shaped Sofa",
  sku: "PRD-00124",
  category: "Living Room",
  image: "/conference_chair-2.png",
  revenue: 2450000,
  orders: 128,
  unitsSold: 128,
  profit: 980000,
  avgPrice: 19140,
  views: 12240,
  conversionRate: 1.05,
  returns: 2,
  status: "Active",
  salesHistory: [
    { date: "18 May 2024", orders: 20, unitsSold: 20, revenue: 382812 },
    { date: "17 May 2024", orders: 18, unitsSold: 18, revenue: 344531 },
    { date: "16 May 2024", orders: 22, unitsSold: 22, revenue: 421093 },
    { date: "15 May 2024", orders: 16, unitsSold: 16, revenue: 306250 },
    { date: "14 May 2024", orders: 24, unitsSold: 24, revenue: 459375 },
    { date: "13 May 2024", orders: 16, unitsSold: 16, revenue: 306250 },
    { date: "12 May 2024", orders: 12, unitsSold: 12, revenue: 229687 },
  ],
};

export const productPerformanceApi = {
  getProductPerformance: async () => {
    await delay(1100);
    return {
      stats: fakeProductPerfStats,
      topPerforming: fakeTopPerformingProducts,
      lowPerforming: fakeLowPerformingProducts,
      allProducts: fakeAllProductsPerf,
      categoryPerf: fakeCategoryPerf,
      insights: fakeProductInsights,
    };
  },

  getProductDetail: async (id: string): Promise<ProductDetail> => {
    await delay(800);
    return fakeProductDetail;
  },

  exportReport: async (format: string, includes: string[]): Promise<void> => {
    await delay(900);
    console.log("Export product performance:", { format, includes });
  },
};
