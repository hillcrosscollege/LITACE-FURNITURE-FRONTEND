"use client";

import { useQuery } from "@tanstack/react-query";
import { shippingSettingsApi } from "../shipping_data/shipping_data";

export const SHIPPING_KEYS = {
  methods: ["shipping", "methods"] as const,
  zones: ["shipping", "zones"] as const,
  rates: ["shipping", "rates"] as const,
};

export const useShippingMethods = () =>
  useQuery({
    queryKey: SHIPPING_KEYS.methods,
    queryFn: shippingSettingsApi.getShippingMethods,
  });

export const useShippingZones = () =>
  useQuery({
    queryKey: SHIPPING_KEYS.zones,
    queryFn: shippingSettingsApi.getShippingZones,
  });

export const useShippingRates = () =>
  useQuery({
    queryKey: SHIPPING_KEYS.rates,
    queryFn: shippingSettingsApi.getShippingRates,
  });
