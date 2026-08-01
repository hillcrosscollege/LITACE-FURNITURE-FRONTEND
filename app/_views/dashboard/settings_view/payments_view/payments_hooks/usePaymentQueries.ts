"use client";

import { useQuery } from "@tanstack/react-query";
import { paymentMethodsApi } from "../payments_data/payments_data";

export const PAYMENT_METHODS_KEY = ["settings", "paymentMethods"] as const;

export const usePaymentMethods = () =>
  useQuery({
    queryKey: PAYMENT_METHODS_KEY,
    queryFn: paymentMethodsApi.getPaymentMethods,
  });
