"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { settingsApi } from "../store_information_data/store_information_data";
import { StoreDetails, BusinessInfo } from "../store_information_types";

export const SETTINGS_KEYS = {
  summary: ["settings", "summary"] as const,
  storeInformation: ["settings", "storeInformation"] as const,
};

export const useUpdateStoreDetails = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: StoreDetails) => settingsApi.updateStoreDetails(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: SETTINGS_KEYS.storeInformation,
      });
    },
  });
};

export const useUpdateBusinessInfo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: BusinessInfo) => settingsApi.updateBusinessInfo(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: SETTINGS_KEYS.storeInformation,
      });
    },
  });
};
