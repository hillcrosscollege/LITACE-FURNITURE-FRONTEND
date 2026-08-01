"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { productApi } from "../products_data/product_data";

export const PRODUCT_KEYS = {
  all: ["products"] as const,
  lists: () => [...PRODUCT_KEYS.all, "list"] as const,
  detail: (id: string) => [...PRODUCT_KEYS.all, "detail", id] as const,
};

// ── Queries ──────────────────────────────────────────────
export const useProductQuery = () =>
  useQuery({
    queryKey: PRODUCT_KEYS.lists(),
    queryFn: productApi.getProducts,
  });

// export const useProductDetail = (id: string) =>
//   useQuery({
//     queryKey: PRODUCT_KEYS.detail(id),
//     queryFn: () => productApi.getCategoryById(id),
//     enabled: !!id,
//   });
