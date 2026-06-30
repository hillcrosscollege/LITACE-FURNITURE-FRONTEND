"use client";
import { useMutation } from "@tanstack/react-query";
import { analyticsOverviewApi } from "../overview_data/overview_data";

export const useExportOverviewReport = () =>
  useMutation({
    mutationFn: ({
      format,
      includes,
    }: {
      format: string;
      includes: string[];
    }) => analyticsOverviewApi.exportReport(format, includes),
  });
