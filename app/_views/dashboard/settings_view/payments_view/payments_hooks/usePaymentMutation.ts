"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { paymentMethodsApi } from "../payments_data/payments_data";
import { AddPaymentMethodPayload } from "../payments_types";

export const PAYMENT_METHODS_KEY = ["settings", "paymentMethods"] as const;

export const useAddPaymentMethod = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: AddPaymentMethodPayload) =>
      paymentMethodsApi.addPaymentMethod(payload),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: PAYMENT_METHODS_KEY }),
  });
};

export const useTogglePaymentMethod = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: boolean }) =>
      paymentMethodsApi.toggleStatus(id, status),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: PAYMENT_METHODS_KEY }),
  });
};

export const useDeletePaymentMethod = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => paymentMethodsApi.deleteMethod(id),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: PAYMENT_METHODS_KEY }),
  });
};
