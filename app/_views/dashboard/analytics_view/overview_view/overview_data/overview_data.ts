import { DollarSign, ShoppingBag, TrendingUp, Target } from "lucide-react";
import {
  OverviewStats,
  RevenueTrendPoint,
  OrderStatusBreakdown,
  TopProductPreview,
  DateRangePreset,
} from "../overview_types";

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export const fakeOverviewStats: OverviewStats = {
  totalRevenue: { value: 1845000, change: 12.9, direction: "up" },
  totalOrders: { value: 1248, change: 8.5, direction: "up" },
  avgOrderValue: { value: 14800, change: 3.8, direction: "up" },
  conversionRate: { value: 3.4, change: 0.6, direction: "up" },
};

export const fakeRevenueTrend: RevenueTrendPoint[] = [
  { date: "1 May", revenue: 52000, orders: 38 },
  { date: "4 May", revenue: 61000, orders: 42 },
  { date: "7 May", revenue: 48000, orders: 35 },
  { date: "10 May", revenue: 70000, orders: 51 },
  { date: "13 May", revenue: 65000, orders: 47 },
  { date: "16 May", revenue: 82000, orders: 58 },
  { date: "18 May", revenue: 78000, orders: 55 },
];

export const fakeOrderStatusBreakdown: OrderStatusBreakdown[] = [
  { status: "Completed", count: 842, color: "#2e7d52" },
  { status: "Pending", count: 156, color: "#c87941" },
  { status: "Cancelled", count: 68, color: "#c0392b" },
  { status: "Returned", count: 32, color: "#7048b6" },
];

export const fakeTopProductsPreview: TopProductPreview[] = [
  {
    id: "1",
    name: "Modern L-Shaped Sofa",
    image: "/conference_chair-2.png",
    revenue: 245000,
    unitsSold: 128,
  },
  {
    id: "2",
    name: "Wooden Dining Set",
    image: "/conference_chair-2.png",
    revenue: 186000,
    unitsSold: 96,
  },
  {
    id: "3",
    name: "Luxury Wooden Bed",
    image: "/conference_chair-2.png",
    revenue: 165000,
    unitsSold: 72,
  },
  {
    id: "4",
    name: "Ergonomic Office Chair",
    image: "/conference_chair-2.png",
    revenue: 95000,
    unitsSold: 54,
  },
  {
    id: "5",
    name: "Marble Coffee Table",
    image: "/conference_chair-2.png",
    revenue: 75000,
    unitsSold: 48,
  },
];

export const fakeSectionPreviews = {
  orders: {
    label: "Total Orders",
    value: "1,248",
    change: 8.5,
    direction: "up" as const,
  },
  revenue: {
    label: "Total Revenue",
    value: "R1,845,000",
    change: 12.9,
    direction: "up" as const,
  },
  products: {
    label: "Active Products",
    value: "142",
    change: 4.2,
    direction: "up" as const,
  },
  customers: {
    label: "Total Customers",
    value: "1,248",
    change: 10.5,
    direction: "up" as const,
  },
};

export const analyticsOverviewApi = {
  getOverview: async (
    range: DateRangePreset = "30d",
  ): Promise<{
    stats: OverviewStats;
    trend: RevenueTrendPoint[];
    statusBreakdown: OrderStatusBreakdown[];
    topProducts: TopProductPreview[];
    sectionPreviews: typeof fakeSectionPreviews;
  }> => {
    await delay(1100);
    return {
      stats: fakeOverviewStats,
      trend: fakeRevenueTrend,
      statusBreakdown: fakeOrderStatusBreakdown,
      topProducts: fakeTopProductsPreview,
      sectionPreviews: fakeSectionPreviews,
    };
  },

  exportReport: async (format: string, includes: string[]): Promise<void> => {
    await delay(900);
    console.log("Export overview report:", { format, includes });
  },
};

// types/analytics-shared.ts
export type DateRangeValue = {
  preset: string;
  label: string;
  from: string;
  to: string;
};

export const dateRangePresets = [
  { key: "today", label: "Today" },
  { key: "yesterday", label: "Yesterday" },
  { key: "7d", label: "Last 7 Days" },
  { key: "30d", label: "Last 30 Days" },
  { key: "90d", label: "Last 90 Days" },
  { key: "month", label: "This Month" },
  { key: "lastMonth", label: "Last Month" },
  { key: "custom", label: "Custom Range" },
];

export const defaultDateRange: DateRangeValue = {
  preset: "30d",
  label: "12 May – 18 May 2024",
  from: "2024-05-12",
  to: "2024-05-18",
};

export const formatCurrency = (value: number) => `R${value.toLocaleString()}`;

export const formatDateSA = (isoOrLabel: string) => {
  // expects a label already formatted like "18 May 2024" in fake data
  return isoOrLabel;
};

export const chartConfig = {
  revenue: { label: "Revenue", color: "#8f3d90" },
};

export const exportOptions = [
  { id: "summary", label: "Summary" },
  { id: "trend", label: "Revenue Trend" },
  { id: "products", label: "Top Products" },
  { id: "status", label: "Order Status" },
];

export const sectionLinks = [
  {
    key: "revenue",
    label: "Revenue Analytics",
    icon: DollarSign,
    path: "revenue-analytics",
    color: "text-[#2e7d52]",
    bg: "bg-[#edf7f2]",
  },
  {
    key: "orders",
    label: "Orders Analytics",
    icon: ShoppingBag,
    path: "orders-analytics",
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    key: "products",
    label: "Product Performance",
    icon: TrendingUp,
    path: "product-performance",
    color: "text-[#3266ad]",
    bg: "bg-[#edf2fb]",
  },
  {
    key: "customers",
    label: "Customer Analytics",
    icon: Target,
    path: "customer-analytics",
    color: "text-[#c87941]",
    bg: "bg-[#fdf0e6]",
  },
];

export const statsAnalytics = (stats: OverviewStats) => [
  {
    label: "Total Revenue",
    icon: DollarSign,
    data: stats.totalRevenue,
    format: (v: number) => formatCurrency(v),
    color: "text-[#2e7d52]",
    bg: "bg-[#edf7f2]",
  },
  {
    label: "Total Orders",
    icon: ShoppingBag,
    data: stats.totalOrders,
    format: (v: number) => v.toLocaleString(),
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    label: "Avg Order Value",
    icon: Target,
    data: stats.avgOrderValue,
    format: (v: number) => formatCurrency(v),
    color: "text-[#3266ad]",
    bg: "bg-[#edf2fb]",
  },
  {
    label: "Conversion Rate",
    icon: TrendingUp,
    data: stats.conversionRate,
    format: (v: number) => `${v}%`,
    color: "text-[#c87941]",
    bg: "bg-[#fdf0e6]",
  },
];
