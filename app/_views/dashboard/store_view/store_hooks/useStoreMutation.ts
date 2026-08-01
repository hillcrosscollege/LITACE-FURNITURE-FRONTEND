"use client";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { storesApi } from "../store_data/store_data";
import { AddStorePayload } from "../store_types";
import { STORE_KEYS } from "./useStoreQueries";

const inv = (qc: any) => qc.invalidateQueries({ queryKey: STORE_KEYS.all });

export const useAddStore = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (p: AddStorePayload) => storesApi.addStore(p),
    onSuccess: () => inv(qc),
  });
};
export const useUpdateStore = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, p }: { id: string; p: Partial<AddStorePayload> }) =>
      storesApi.updateStore(id, p),
    onSuccess: () => inv(qc),
  });
};
export const useDeleteStore = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => storesApi.deleteStore(id),
    onSuccess: () => inv(qc),
  });
};
export const useTransferStock = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: storesApi.transferStock,
    onSuccess: () => inv(qc),
  });
};
export const useAdjustStock = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: storesApi.adjustStock,
    onSuccess: () => inv(qc),
  });
};
export const useAddManager = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ storeId, data }: { storeId: string; data: any }) =>
      storesApi.addManager(storeId, data),
    onSuccess: () => inv(qc),
  });
};
export const useUpdateStoreSettings = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      storesApi.updateStoreSettings(id, data),
    onSuccess: () => inv(qc),
  });
};
