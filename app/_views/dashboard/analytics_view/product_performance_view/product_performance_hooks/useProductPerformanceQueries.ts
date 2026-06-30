"use client";

import { useQuery } from "@tanstack/react-query";
import { productPerformanceApi } from "../product_performance_data/product_performance_data";

export const useProductPerformance = () =>
  useQuery({
    queryKey: ["analytics", "productPerformance"],
    queryFn: productPerformanceApi.getProductPerformance,
  });

export const useProductPerfDetail = (id: string) =>
  useQuery({
    queryKey: ["analytics", "productPerformance", "detail", id],
    queryFn: () => productPerformanceApi.getProductDetail(id),
    enabled: !!id,
  });
