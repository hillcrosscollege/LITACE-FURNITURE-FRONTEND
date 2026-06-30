"use client";

import { useMutation } from "@tanstack/react-query";
import { customerAnalyticsApi } from "../customer_analytics_data/customer_analytics_data";

export const useExportCustomerReport = () =>
  useMutation({
    mutationFn: ({
      format,
      includes,
    }: {
      format: string;
      includes: string[];
    }) => customerAnalyticsApi.exportReport(format, includes),
  });
