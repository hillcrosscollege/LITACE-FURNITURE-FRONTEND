"use client";

import { useQuery } from "@tanstack/react-query";
import { storesApi } from "../store_data/store_data";

export const STORE_KEYS = {
  all: ["stores"] as const,
  list: () => [...STORE_KEYS.all, "list"] as const,
  detail: (id: string) => [...STORE_KEYS.all, "detail", id] as const,
  products: (id: string) => [...STORE_KEYS.all, "products", id] as const,
  transfers: (id: string) => [...STORE_KEYS.all, "transfers", id] as const,
  managers: (id: string) => [...STORE_KEYS.all, "managers", id] as const,
  metrics: (id: string) => [...STORE_KEYS.all, "metrics", id] as const,
};

export const useStoresQueries = () =>
  useQuery({ queryKey: STORE_KEYS.list(), queryFn: storesApi.getStores });
export const useStoreDetail = (id: string) =>
  useQuery({
    queryKey: STORE_KEYS.detail(id),
    queryFn: () => storesApi.getStoreById(id),
    enabled: !!id,
  });
export const useStoreProducts = (id: string) =>
  useQuery({
    queryKey: STORE_KEYS.products(id),
    queryFn: () => storesApi.getStoreProducts(id),
    enabled: !!id,
  });
export const useStoreTransfers = (id: string) =>
  useQuery({
    queryKey: STORE_KEYS.transfers(id),
    queryFn: () => storesApi.getStoreTransfers(id),
    enabled: !!id,
  });
export const useStoreManagers = (id: string) =>
  useQuery({
    queryKey: STORE_KEYS.managers(id),
    queryFn: () => storesApi.getStoreManagers(id),
    enabled: !!id,
  });
export const useStoreMetrics = (id: string) =>
  useQuery({
    queryKey: STORE_KEYS.metrics(id),
    queryFn: () => storesApi.getStoreMetrics(id),
    enabled: !!id,
  });
