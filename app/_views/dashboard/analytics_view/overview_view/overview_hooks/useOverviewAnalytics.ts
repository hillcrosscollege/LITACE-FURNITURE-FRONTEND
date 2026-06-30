"use client";
import { useState } from "react";
import {
  DateRangeValue,
  defaultDateRange,
} from "../overview_data/overview_data";
import { useAnalyticsOverview } from "./useOverviewQueries";
import { useExportOverviewReport } from "./useOverviewMutation";

const useOverviewAnalytics = () => {
  //  const router = useRouter();
  const [dateRange, setDateRange] = useState<DateRangeValue>(defaultDateRange);

  const { data, isLoading, isError } = useAnalyticsOverview();
  const { mutate: exportReport, isPending: isExporting } =
    useExportOverviewReport();

  const stats = data?.stats;
  const trend = data?.trend ?? [];
  const statusBreakdown = data?.statusBreakdown ?? [];
  const topProducts = data?.topProducts ?? [];
  const sectionPreviews = data?.sectionPreviews;

  const totalOrders = statusBreakdown.reduce((s, x) => s + x.count, 0);
  return {
    dateRange,
    setDateRange,
    stats,
    trend,
    topProducts,
    sectionPreviews,
    totalOrders,
    isLoading,
    isError,
    exportReport,
    isExporting,
    statusBreakdown,
  };
};

export default useOverviewAnalytics;
