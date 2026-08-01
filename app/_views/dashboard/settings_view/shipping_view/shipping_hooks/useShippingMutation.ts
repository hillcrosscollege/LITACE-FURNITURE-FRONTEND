"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { shippingSettingsApi } from "../shipping_data/shipping_data";
import {
  AddShippingMethodPayload,
  AddShippingZonePayload,
} from "../shipping_types";

export const SHIPPING_KEYS = {
  methods: ["shipping", "methods"] as const,
  zones: ["shipping", "zones"] as const,
  rates: ["shipping", "rates"] as const,
};

export const useAddShippingMethod = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: AddShippingMethodPayload) =>
      shippingSettingsApi.addShippingMethod(payload),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: SHIPPING_KEYS.methods }),
  });
};

export const useToggleMethodStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      status,
    }: {
      id: string;
      status: "Active" | "Inactive";
    }) => shippingSettingsApi.toggleMethodStatus(id, status),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: SHIPPING_KEYS.methods }),
  });
};

export const useDeleteShippingMethod = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => shippingSettingsApi.deleteMethod(id),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: SHIPPING_KEYS.methods }),
  });
};

export const useAddShippingZone = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: AddShippingZonePayload) =>
      shippingSettingsApi.addShippingZone(payload),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: SHIPPING_KEYS.zones }),
  });
};
