// types/customer-analytics-api.ts
export type CustomerAnalyticsStat = {
  value: number | string;
  change?: number;
  direction?: "up" | "down";
  subLabel?: string;
};

export type CustomerAnalyticsStats = {
  totalCustomers: CustomerAnalyticsStat;
  newCustomers: CustomerAnalyticsStat;
  returningCustomers: CustomerAnalyticsStat;
  lifetimeValue: CustomerAnalyticsStat;
  churnRate: CustomerAnalyticsStat;
};

export type GrowthPoint = {
  date: string;
  newCust: number;
  returning: number;
};

export type TopCustomer = {
  id: string;
  name: string;
  avatar: string;
  email: string;
  orders: number;
  totalSpent: number;
  avgOrder: number;
  lastOrder: string;
};

export type CustomerSegment = {
  segment: string;
  count: number;
  pct: number;
  color: string;
};

export type PurchaseFrequency = {
  band: string;
  customers: number;
  pctOfTotal: number;
};

export type CustomerInsight = {
  id: string;
  type: "top" | "warning" | "info";
  title: string;
  detail: string;
};
