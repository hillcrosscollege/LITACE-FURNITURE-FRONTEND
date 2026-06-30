// types/orders-analytics-api.ts
export type OrdersAnalyticsStats = {
  completedOrders: { value: number; change: number; direction: "up" | "down" };
  pendingOrders: { value: number; change: number; direction: "up" | "down" };
  cancelledOrders: { value: number; change: number; direction: "up" | "down" };
  returnedOrders: { value: number; change: number; direction: "up" | "down" };
};

export type OrdersSummaryRow = {
  metric: string;
  thisPeriod: string;
  previousPeriod: string;
  change: string;
  direction: "up" | "down";
};

export type TopCity = {
  city: string;
  orders: number;
  revenue: number;
};

export type CancellationReason = {
  reason: string;
  count: number;
  revenueLost: number;
};

export type RecentOrder = {
  id: string;
  customer: string;
  status: "Completed" | "Pending" | "Cancelled" | "Returned";
  date: string;
  amount: number;
};
