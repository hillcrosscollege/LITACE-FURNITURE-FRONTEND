import {
  CancellationReason,
  OrdersAnalyticsStats,
  OrdersSummaryRow,
  RecentOrder,
  TopCity,
} from "../order_analytics_types";

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export const fakeOrdersAnalyticsStats: OrdersAnalyticsStats = {
  completedOrders: { value: 842, change: 10.8, direction: "up" },
  pendingOrders: { value: 156, change: 13.3, direction: "down" },
  cancelledOrders: { value: 68, change: 17.1, direction: "down" },
  returnedOrders: { value: 32, change: 14.3, direction: "up" },
};

export const fakeOrdersSummary: OrdersSummaryRow[] = [
  {
    metric: "Total Orders",
    thisPeriod: "1,248",
    previousPeriod: "1,150",
    change: "↑ 8.5%",
    direction: "up",
  },
  {
    metric: "Completed Orders",
    thisPeriod: "842",
    previousPeriod: "760",
    change: "↑ 10.8%",
    direction: "up",
  },
  {
    metric: "Pending Orders",
    thisPeriod: "156",
    previousPeriod: "180",
    change: "↓ 13.3%",
    direction: "down",
  },
  {
    metric: "Cancelled Orders",
    thisPeriod: "68",
    previousPeriod: "82",
    change: "↓ 17.1%",
    direction: "down",
  },
  {
    metric: "Returned Orders",
    thisPeriod: "32",
    previousPeriod: "28",
    change: "↑ 14.3%",
    direction: "up",
  },
  {
    metric: "Completion Rate",
    thisPeriod: "67.6%",
    previousPeriod: "66.1%",
    change: "↑ 1.5%",
    direction: "up",
  },
];

export const fakeTopCities: TopCity[] = [
  { city: "Johannesburg", orders: 512, revenue: 725000 },
  { city: "Cape Town", orders: 214, revenue: 318000 },
  { city: "Durban", orders: 98, revenue: 149000 },
  { city: "Pretoria", orders: 76, revenue: 96000 },
  { city: "Port Elizabeth", orders: 54, revenue: 72000 },
];

export const fakeCancellationReasons: CancellationReason[] = [
  { reason: "Customer changed mind", count: 22, revenueLost: 450000 },
  { reason: "Delivery too slow", count: 18, revenueLost: 320000 },
  { reason: "Product unavailable", count: 12, revenueLost: 210000 },
  { reason: "Payment issue", count: 10, revenueLost: 180000 },
  { reason: "Other", count: 6, revenueLost: 90000 },
];

export const fakeRecentOrders: RecentOrder[] = [
  {
    id: "#FC12435",
    customer: "John Doe",
    status: "Completed",
    date: "18 May 2024",
    amount: 250000,
  },
  {
    id: "#FC12434",
    customer: "Jane Smith",
    status: "Pending",
    date: "18 May 2024",
    amount: 180000,
  },
  {
    id: "#FC12433",
    customer: "Michael Brown",
    status: "Completed",
    date: "17 May 2024",
    amount: 420000,
  },
  {
    id: "#FC12432",
    customer: "Emily Davis",
    status: "Cancelled",
    date: "17 May 2024",
    amount: 95000,
  },
  {
    id: "#FC12431",
    customer: "Daniel Wilson",
    status: "Returned",
    date: "16 May 2024",
    amount: 210000,
  },
];

export const ordersAnalyticsApi = {
  getOrdersAnalytics: async () => {
    await delay(1100);
    return {
      stats: fakeOrdersAnalyticsStats,
      summary: fakeOrdersSummary,
      topCities: fakeTopCities,
      cancellationReasons: fakeCancellationReasons,
      recentOrders: fakeRecentOrders,
    };
  },

  exportReport: async (format: string, includes: string[]): Promise<void> => {
    await delay(900);
    console.log("Export orders analytics:", { format, includes });
  },
};
