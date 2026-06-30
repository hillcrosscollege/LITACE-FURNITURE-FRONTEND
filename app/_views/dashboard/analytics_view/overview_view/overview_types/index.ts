export type DateRangePreset =
  | "today"
  | "yesterday"
  | "7d"
  | "30d"
  | "90d"
  | "month"
  | "lastMonth"
  | "custom";

export type OverviewStats = {
  totalRevenue: { value: number; change: number; direction: "up" | "down" };
  totalOrders: { value: number; change: number; direction: "up" | "down" };
  avgOrderValue: { value: number; change: number; direction: "up" | "down" };
  conversionRate: { value: number; change: number; direction: "up" | "down" };
};

export type RevenueTrendPoint = {
  date: string;
  revenue: number;
  orders: number;
};

export type OrderStatusBreakdown = {
  status: string;
  count: number;
  color: string;
};

export type TopProductPreview = {
  id: string;
  name: string;
  image: string;
  revenue: number;
  unitsSold: number;
};

export type SectionPreview = {
  label: string;
  value: string;
  change: number;
  direction: "up" | "down";
};
