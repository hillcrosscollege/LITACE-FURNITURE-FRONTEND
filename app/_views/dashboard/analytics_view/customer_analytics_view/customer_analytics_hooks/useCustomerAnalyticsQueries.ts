"use client";

import { useQuery, useMutation } from "@tanstack/react-query";
import { customerAnalyticsApi } from "../customer_analytics_data/customer_analytics_data";

export const useCustomerAnalytics = () =>
  useQuery({
    queryKey: ["analytics", "customers"],
    queryFn: customerAnalyticsApi.getCustomerAnalytics,
  });
