// types/revenue-analytics-api.ts
export type RevenueStat = {
  value: number;
  change: number;
  direction: "up" | "down";
};

export type RevenueStats = {
  totalRevenue: RevenueStat;
  netRevenue: RevenueStat;
  avgOrderValue: RevenueStat;
  grossMargin: RevenueStat;
  refunds: RevenueStat;
  discountsGiven: RevenueStat;
};

export type RevenueSummaryRow = {
  metric: string;
  thisPeriod: string;
  previousPeriod: string;
  change: string;
  direction: "up" | "down";
};

export type RevenueSource = {
  source: string;
  revenue: number;
  orders: number;
  pctOfTotal: number;
  change: number;
  direction: "up" | "down";
};

export type DailyRevenue = {
  date: string;
  orders: number;
  grossRevenue: number;
  discounts: number;
  refunds: number;
  shippingRevenue: number;
  netRevenue: number;
  // order-level breakdown for the detail modal
  orderRows: {
    id: string;
    customer: string;
    amount: number;
    discount: number;
    refund: number;
    shipping: number;
    net: number;
  }[];
};

export type TopRevenueProduct = {
  id: string;
  name: string;
  image: string;
  revenue: number;
  orders: number;
  unitsSold: number;
  pctOfTotal: number;
  // detail breakdown
  performance: {
    metric: string;
    thisPeriod: string;
    previousPeriod: string;
    change: string;
    direction: "up" | "down";
  }[];
};

export type RevenueComparison = {
  thisLabel: string;
  thisValue: number;
  lastLabel: string;
  lastValue: number;
  changePct: number;
};

export type Insight = {
  id: string;
  type: "up" | "down";
  title: string;
  detail: string;
};
