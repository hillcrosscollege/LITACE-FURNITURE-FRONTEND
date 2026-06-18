// hooks/useCreateOrderApi.ts
"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateOrderPayload } from "../order_view_types";
import { createOrderApi } from "../orders_view_data/orders_data";
import { ORDER_KEYS } from "./useOrderQueries";

export const CREATE_ORDER_KEYS = {
  customers: ["createOrder", "customers"] as const,
  searchCustomers: (q: string) => ["createOrder", "customers", q] as const,
  searchProducts: (q: string) => ["createOrder", "products", q] as const,
};

export const useOrderCustomers = () =>
  useQuery({
    queryKey: CREATE_ORDER_KEYS.customers,
    queryFn: createOrderApi.getCustomers,
    staleTime: 1000 * 60 * 5,
  });

export const useSearchCustomers = (query: string) =>
  useQuery({
    queryKey: CREATE_ORDER_KEYS.searchCustomers(query),
    queryFn: () => createOrderApi.searchCustomers(query),
    enabled: query.length > 0,
    staleTime: 1000 * 30,
  });

export const useSearchProducts = (query: string) =>
  useQuery({
    queryKey: CREATE_ORDER_KEYS.searchProducts(query),
    queryFn: () => createOrderApi.searchProducts(query),
    enabled: query.length > 0,
    staleTime: 1000 * 30,
  });

export const useSubmitOrder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateOrderPayload) =>
      createOrderApi.createOrder(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ORDER_KEYS.lists() });
    },
  });
};
