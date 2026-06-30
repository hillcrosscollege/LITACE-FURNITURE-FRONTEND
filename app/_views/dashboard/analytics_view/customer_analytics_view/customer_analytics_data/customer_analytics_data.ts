import {
  CustomerAnalyticsStats,
  GrowthPoint,
  TopCustomer,
  CustomerSegment,
  PurchaseFrequency,
  CustomerInsight,
} from "../customer_analytics_types";

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export const fakeCustomerStats: CustomerAnalyticsStats = {
  totalCustomers: { value: 1248, change: 10.5, direction: "up" },
  newCustomers: { value: 156, change: 15.6, direction: "up" },
  returningCustomers: { value: 692, change: 6.2, direction: "up" },
  lifetimeValue: { value: 284000, change: 4.8, direction: "up" },
  churnRate: { value: "4.2%", change: 0.6, direction: "down" },
};

export const fakeGrowthTrend: GrowthPoint[] = [
  { date: "1 May", newCust: 18, returning: 42 },
  { date: "4 May", newCust: 22, returning: 48 },
  { date: "7 May", newCust: 15, returning: 39 },
  { date: "10 May", newCust: 28, returning: 55 },
  { date: "13 May", newCust: 24, returning: 51 },
  { date: "16 May", newCust: 32, returning: 60 },
  { date: "18 May", newCust: 29, returning: 58 },
];

export const fakeTopCustomers: TopCustomer[] = [
  {
    id: "1",
    name: "John Doe",
    avatar: "/conference_chair-2.png",
    email: "johndoe@email.com",
    orders: 8,
    totalSpent: 1250000,
    avgOrder: 156250,
    lastOrder: "20 May 2024",
  },
  {
    id: "3",
    name: "Michael Brown",
    avatar: "/conference_chair-2.png",
    email: "michaelb@email.com",
    orders: 12,
    totalSpent: 2100000,
    avgOrder: 175000,
    lastOrder: "15 May 2024",
  },
  {
    id: "5",
    name: "Daniel Wilson",
    avatar: "/conference_chair-2.png",
    email: "danielw@email.com",
    orders: 7,
    totalSpent: 980000,
    avgOrder: 140000,
    lastOrder: "8 May 2024",
  },
  {
    id: "2",
    name: "Jane Smith",
    avatar: "/conference_chair-2.png",
    email: "janesmith@email.com",
    orders: 5,
    totalSpent: 750000,
    avgOrder: 150000,
    lastOrder: "18 May 2024",
  },
  {
    id: "6",
    name: "Sarah Johnson",
    avatar: "/conference_chair-2.png",
    email: "sarahj@email.com",
    orders: 4,
    totalSpent: 540000,
    avgOrder: 135000,
    lastOrder: "5 May 2024",
  },
];

export const fakeCustomerSegments: CustomerSegment[] = [
  { segment: "New Customers", count: 156, pct: 12.5, color: "#3266ad" },
  { segment: "Returning Customers", count: 692, pct: 55.4, color: "#2e7d52" },
  { segment: "VIP Customers", count: 98, pct: 7.9, color: "#8f3d90" },
  { segment: "At Risk", count: 302, pct: 24.2, color: "#c87941" },
];

export const fakePurchaseFrequency: PurchaseFrequency[] = [
  { band: "1 order", customers: 412, pctOfTotal: 33.0 },
  { band: "2 - 3 orders", customers: 386, pctOfTotal: 30.9 },
  { band: "4 - 6 orders", customers: 248, pctOfTotal: 19.9 },
  { band: "7 - 10 orders", customers: 142, pctOfTotal: 11.4 },
  { band: "10+ orders", customers: 60, pctOfTotal: 4.8 },
];

export const fakeCustomerInsights: CustomerInsight[] = [
  {
    id: "1",
    type: "top",
    title: "Michael Brown is your top customer",
    detail: "R2,100,000 in total spend across 12 orders.",
  },
  {
    id: "2",
    type: "warning",
    title: "302 customers are at risk of churning",
    detail:
      "No purchase in the last 60 days. Consider a re-engagement campaign.",
  },
  {
    id: "3",
    type: "info",
    title: "Returning customers drive 55% of revenue",
    detail: "Focus retention efforts to sustain growth.",
  },
];

export const customerAnalyticsApi = {
  getCustomerAnalytics: async () => {
    await delay(1100);
    return {
      stats: fakeCustomerStats,
      growthTrend: fakeGrowthTrend,
      topCustomers: fakeTopCustomers,
      segments: fakeCustomerSegments,
      purchaseFrequency: fakePurchaseFrequency,
      insights: fakeCustomerInsights,
    };
  },

  exportReport: async (format: string, includes: string[]): Promise<void> => {
    await delay(900);
    console.log("Export customer analytics:", { format, includes });
  },
};
