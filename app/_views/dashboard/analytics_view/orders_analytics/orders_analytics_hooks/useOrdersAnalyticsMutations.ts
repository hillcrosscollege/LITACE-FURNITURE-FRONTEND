"use client";

import { useMutation } from "@tanstack/react-query";
import { ordersAnalyticsApi } from "../orders_analytics_data/orders_analytics_data";

export const useExportOrdersReport = () =>
  useMutation({
    mutationFn: ({
      format,
      includes,
    }: {
      format: string;
      includes: string[];
    }) => ordersAnalyticsApi.exportReport(format, includes),
  });
