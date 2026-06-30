"use client";
import { useMutation } from "@tanstack/react-query";
import { revenueAnalyticsApi } from "../revenue_analytics_data/revenue_analytics_data";

export const useExportRevenueReport = () =>
  useMutation({
    mutationFn: ({
      format,
      includes,
    }: {
      format: string;
      includes: string[];
    }) => revenueAnalyticsApi.exportReport(format, includes),
  });

export const useComparePeriod = () =>
  useMutation({
    mutationFn: ({
      compareWith,
      previousRange,
      currentRange,
    }: {
      compareWith: string;
      previousRange: string;
      currentRange: string;
    }) =>
      revenueAnalyticsApi.comparePeriod(
        compareWith,
        previousRange,
        currentRange,
      ),
  });
