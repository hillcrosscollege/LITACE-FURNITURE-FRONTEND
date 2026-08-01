"use client";

import { useQuery } from "@tanstack/react-query";
import { inventoryApi } from "../inventory_data/inventory_data";

export const INV_KEYS = {
  all: ["inventory"] as const,
  list: () => [...INV_KEYS.all, "list"] as const,
  detail: (id: string) => [...INV_KEYS.all, "detail", id] as const,
  locations: (id: string) => [...INV_KEYS.all, "locations", id] as const,
  history: (id: string) => [...INV_KEYS.all, "history", id] as const,
  movements: (id: string) => [...INV_KEYS.all, "movements", id] as const,
  restock: (id: string) => [...INV_KEYS.all, "restock", id] as const,
  lowStock: () => [...INV_KEYS.all, "lowStock"] as const,
};

export const useInventoryQueries = () =>
  useQuery({ queryKey: INV_KEYS.list(), queryFn: inventoryApi.getInventory });
export const useInventoryDetail = (id: string) =>
  useQuery({
    queryKey: INV_KEYS.detail(id),
    queryFn: () => inventoryApi.getProductById(id),
    enabled: !!id,
  });
export const useInventoryLocations = (id: string) =>
  useQuery({
    queryKey: INV_KEYS.locations(id),
    queryFn: () => inventoryApi.getLocations(id),
    enabled: !!id,
  });
export const useStockHistory = (id: string) =>
  useQuery({
    queryKey: INV_KEYS.history(id),
    queryFn: () => inventoryApi.getStockHistory(id),
    enabled: !!id,
  });
export const useStockMovements = (id: string) =>
  useQuery({
    queryKey: INV_KEYS.movements(id),
    queryFn: () => inventoryApi.getStockMovements(id),
    enabled: !!id,
  });
export const useRestockHistory = (id: string) =>
  useQuery({
    queryKey: INV_KEYS.restock(id),
    queryFn: () => inventoryApi.getRestockHistory(id),
    enabled: !!id,
  });
export const useLowStock = () =>
  useQuery({
    queryKey: INV_KEYS.lowStock(),
    queryFn: inventoryApi.getLowStock,
  });
