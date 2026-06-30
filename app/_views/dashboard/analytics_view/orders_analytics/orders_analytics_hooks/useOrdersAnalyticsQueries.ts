"use client";

import { useQuery, useMutation } from "@tanstack/react-query";
import { ordersAnalyticsApi } from "../orders_analytics_data/orders_analytics_data";

export const useOrdersAnalytics = () =>
  useQuery({
    queryKey: ["analytics", "orders"],
    queryFn: ordersAnalyticsApi.getOrdersAnalytics,
  });
