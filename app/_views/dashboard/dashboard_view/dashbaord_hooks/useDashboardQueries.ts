"use client";

import { useQuery } from "@tanstack/react-query";
import { dashboardApi } from "../dash_data/dash_data";

export const useDashboard = () =>
  useQuery({
    queryKey: ["dashboard"],
    queryFn: dashboardApi.getDashboard,
    staleTime: 1000 * 60 * 5,
  });
