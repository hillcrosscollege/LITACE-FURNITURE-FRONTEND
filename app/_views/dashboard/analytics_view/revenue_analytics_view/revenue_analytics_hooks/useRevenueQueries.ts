"use client";

import { useQuery } from "@tanstack/react-query";
import { revenueAnalyticsApi } from "../revenue_analytics_data/revenue_analytics_data";

export const useRevenueAnalytics = () =>
  useQuery({
    queryKey: ["analytics", "revenue"],
    queryFn: revenueAnalyticsApi.getRevenueAnalytics,
  });
