"use client";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { inventoryApi } from "../inventory_data/inventory_data";
import { INV_KEYS } from "./useInventoryQueries";

const invalidateAll = (qc: any) =>
  qc.invalidateQueries({ queryKey: INV_KEYS.all });

export const useAdjustStock = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: inventoryApi.adjustStock,
    onSuccess: () => invalidateAll(qc),
  });
};
export const useRestockInventory = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: inventoryApi.restockInventory,
    onSuccess: () => invalidateAll(qc),
  });
};
export const useTransferStock = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: inventoryApi.transferStock,
    onSuccess: () => invalidateAll(qc),
  });
};
export const useExportInventory = () =>
  useMutation({ mutationFn: inventoryApi.exportReport });
