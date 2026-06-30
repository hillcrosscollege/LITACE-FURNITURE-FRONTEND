"use client";
import { useMutation } from "@tanstack/react-query";
import { productPerformanceApi } from "../product_performance_data/product_performance_data";

export const useExportProductPerfReport = () =>
  useMutation({
    mutationFn: ({
      format,
      includes,
    }: {
      format: string;
      includes: string[];
    }) => productPerformanceApi.exportReport(format, includes),
  });
