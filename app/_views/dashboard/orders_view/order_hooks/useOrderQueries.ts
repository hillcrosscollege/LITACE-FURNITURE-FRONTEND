"use client";

import { useQuery } from "@tanstack/react-query";
import { ordersApi } from "../orders_view_data/orders_data";
import { OrderDetail } from "../order_view_types";

export const ORDER_KEYS = {
  all: ["orders"] as const,
  lists: () => [...ORDER_KEYS.all, "list"] as const,
  detail: (id: string) => [...ORDER_KEYS.all, "detail", id] as const,
};

export const useOrders = () =>
  useQuery({
    queryKey: ORDER_KEYS.lists(),
    queryFn: ordersApi.getOrders,
  });

export const useOrderDetail = (id: string) =>
  useQuery({
    queryKey: ORDER_KEYS.detail(id),
    queryFn: () => ordersApi.getOrderById(id),
    enabled: !!id,
  });
