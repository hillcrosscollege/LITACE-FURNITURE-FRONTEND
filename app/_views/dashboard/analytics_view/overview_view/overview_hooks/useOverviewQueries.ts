"use client";

import { useQuery } from "@tanstack/react-query";
import { DateRangePreset } from "../overview_types";
import { analyticsOverviewApi } from "../overview_data/overview_data";

export const ANALYTICS_OVERVIEW_KEYS = {
  all: (range: string) => ["analytics", "overview", range] as const,
};

export const useAnalyticsOverview = (range: DateRangePreset = "30d") =>
  useQuery({
    queryKey: ANALYTICS_OVERVIEW_KEYS.all(range),
    queryFn: () => analyticsOverviewApi.getOverview(range),
  });
