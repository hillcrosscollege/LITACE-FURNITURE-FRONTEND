"use client";

import { useQuery } from "@tanstack/react-query";
import { customersApi } from "../cusomer_data/customer_data";

export const CUSTOMER_KEYS = {
  all: ["customers"] as const,
  lists: () => [...CUSTOMER_KEYS.all, "list"] as const,
  detail: (id: string) => [...CUSTOMER_KEYS.all, "detail", id] as const,
  receipts: (id: string) => [...CUSTOMER_KEYS.all, "receipts", id] as const,
  messages: (id: string) => [...CUSTOMER_KEYS.all, "messages", id] as const,
  settings: (id: string) => [...CUSTOMER_KEYS.all, "settings", id] as const,
  orderDetail: (orderId: string) =>
    [...CUSTOMER_KEYS.all, "orderDetail", orderId] as const,
};

export const useCustomers = () =>
  useQuery({
    queryKey: CUSTOMER_KEYS.lists(),
    queryFn: customersApi.getCustomers,
  });

export const useCustomerDetail = (id: string) =>
  useQuery({
    queryKey: CUSTOMER_KEYS.detail(id),
    queryFn: () => customersApi.getCustomerById(id),
    enabled: !!id,
  });

export const useCustomerReceipts = (customerId: string) =>
  useQuery({
    queryKey: CUSTOMER_KEYS.receipts(customerId),
    queryFn: () => customersApi.getReceipts(customerId),
    enabled: !!customerId,
  });

export const useCustomerMessages = (customerId: string) =>
  useQuery({
    queryKey: CUSTOMER_KEYS.messages(customerId),
    queryFn: () => customersApi.getMessages(customerId),
    enabled: !!customerId,
  });

export const useCustomerSettings = (customerId: string) =>
  useQuery({
    queryKey: CUSTOMER_KEYS.settings(customerId),
    queryFn: () => customersApi.getSettings(customerId),
    enabled: !!customerId,
  });

export const useCustomerOrderDetail = (orderId: string) =>
  useQuery({
    queryKey: CUSTOMER_KEYS.orderDetail(orderId),
    queryFn: () => customersApi.getOrderDetail(orderId),
    enabled: !!orderId,
  });
