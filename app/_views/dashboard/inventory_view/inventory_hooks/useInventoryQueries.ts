"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { inventoryApi } from "../inventory_data/inventory_data";
import { AdjustmentType } from "../inventory_types";

export const INVENTORY_KEYS = {
  all: ["inventory"] as const,
  lists: () => [...INVENTORY_KEYS.all, "list"] as const,
  detail: (id: string) => [...INVENTORY_KEYS.all, "detail", id] as const,
  movements: (id: string) => [...INVENTORY_KEYS.all, "movements", id] as const,
  locations: () => [...INVENTORY_KEYS.all, "locations"] as const,
  lowStock: () => [...INVENTORY_KEYS.all, "lowStock"] as const,
};

export const useInventory = () =>
  useQuery({
    queryKey: INVENTORY_KEYS.lists(),
    queryFn: inventoryApi.getInventory,
  });

export const useInventoryProduct = (id: string) =>
  useQuery({
    queryKey: INVENTORY_KEYS.detail(id),
    queryFn: () => inventoryApi.getProductById(id),
    enabled: !!id,
  });

export const useInventoryLocations = () =>
  useQuery({
    queryKey: INVENTORY_KEYS.locations(),
    queryFn: inventoryApi.getLocations,
  });

export const useStockMovements = (productId: string) =>
  useQuery({
    queryKey: INVENTORY_KEYS.movements(productId),
    queryFn: () => inventoryApi.getStockMovements(productId),
    enabled: !!productId,
  });

export const useLowStockAlerts = () =>
  useQuery({
    queryKey: INVENTORY_KEYS.lowStock(),
    queryFn: inventoryApi.getLowStockAlerts,
  });

export const useAdjustStock = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      productId,
      type,
      qty,
      reason,
      note,
    }: {
      productId: string;
      type: AdjustmentType;
      qty: number;
      reason: string;
      note: string;
    }) => inventoryApi.adjustStock(productId, type, qty, reason, note),
    onSuccess: (_, { productId }) => {
      queryClient.invalidateQueries({ queryKey: INVENTORY_KEYS.lists() });
      queryClient.invalidateQueries({
        queryKey: INVENTORY_KEYS.detail(productId),
      });
      queryClient.invalidateQueries({ queryKey: INVENTORY_KEYS.lowStock() });
    },
  });
};

export const useAddStock = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      productId,
      supplier,
      qty,
      unitCost,
      reference,
      note,
    }: {
      productId: string;
      supplier: string;
      qty: number;
      unitCost: number;
      reference: string;
      note: string;
    }) =>
      inventoryApi.addStock(
        productId,
        supplier,
        qty,
        unitCost,
        reference,
        note,
      ),
    onSuccess: (_, { productId }) => {
      queryClient.invalidateQueries({ queryKey: INVENTORY_KEYS.lists() });
      queryClient.invalidateQueries({
        queryKey: INVENTORY_KEYS.detail(productId),
      });
    },
  });
};

export const useTransferStock = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      productId,
      from,
      to,
      qty,
      note,
    }: {
      productId: string;
      from: string;
      to: string;
      qty: number;
      note: string;
    }) => inventoryApi.transferStock(productId, from, to, qty, note),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: INVENTORY_KEYS.lists() });
      queryClient.invalidateQueries({ queryKey: INVENTORY_KEYS.locations() });
    },
  });
};

export const useAddLocation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      name,
      address,
      manager,
      notes,
    }: {
      name: string;
      address: string;
      manager: string;
      notes: string;
    }) => inventoryApi.addLocation(name, address, manager, notes),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: INVENTORY_KEYS.locations() });
    },
  });
};

export const useExportInventory = () =>
  useMutation({
    mutationFn: ({
      format,
      includes,
    }: {
      format: string;
      includes: string[];
    }) => inventoryApi.exportInventory(format, includes),
  });
