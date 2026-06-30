"use client";

import { useQuery } from "@tanstack/react-query";
import { settingsApi } from "../store_information_data/store_information_data";

export const SETTINGS_KEYS = {
  summary: ["settings", "summary"] as const,
  storeInformation: ["settings", "storeInformation"] as const,
};

export const useSystemSummary = () =>
  useQuery({
    queryKey: SETTINGS_KEYS.summary,
    queryFn: settingsApi.getSystemSummary,
  });

export const useStoreInformation = () =>
  useQuery({
    queryKey: SETTINGS_KEYS.storeInformation,
    queryFn: settingsApi.getStoreInformation,
  });
