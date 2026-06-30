export type ProductPerfStat = {
  value: number | string;
  change?: number;
  direction?: "up" | "down";
  subLabel?: string;
};

export type ProductPerfStats = {
  totalProducts: ProductPerfStat;
  topSellingProduct: ProductPerfStat;
  productsSold: ProductPerfStat;
  lowPerformingProducts: ProductPerfStat;
  outOfStockProducts: ProductPerfStat;
};

export type TopPerformingProduct = {
  id: string;
  rank: number;
  name: string;
  image: string;
  category: string;
  revenue: number;
  orders: number;
  unitsSold: number;
  profit: number;
};

export type LowPerformingProduct = {
  id: string;
  name: string;
  image: string;
  category: string;
  views: number;
  orders: number;
  conversion: number;
  revenue: number;
};

export type AllProductPerf = {
  id: string;
  name: string;
  image: string;
  category: string;
  revenue: number;
  orders: number;
  unitsSold: number;
  views: number;
  conversionRate: number;
  avgPrice: number;
  status: "Active" | "Inactive";
};

export type CategoryPerf = {
  category: string;
  revenue: number;
  pctOfTotal: number;
};

export type ProductInsight = {
  id: string;
  type: "top" | "warning" | "info";
  title: string;
  detail: string;
};

export type ProductDetail = {
  id: string;
  name: string;
  sku: string;
  category: string;
  image: string;
  revenue: number;
  orders: number;
  unitsSold: number;
  profit: number;
  avgPrice: number;
  views: number;
  conversionRate: number;
  returns: number;
  status: "Active" | "Inactive";
  salesHistory: {
    date: string;
    orders: number;
    unitsSold: number;
    revenue: number;
  }[];
};
