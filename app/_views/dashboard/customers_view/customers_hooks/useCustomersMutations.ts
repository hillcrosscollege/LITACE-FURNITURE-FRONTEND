import { useQueryClient, useMutation } from "@tanstack/react-query";
import { customersApi } from "../cusomer_data/customer_data";
import { CUSTOMER_KEYS } from "./useCustomersQueries";
import { CustomerSettings } from "../customers_types";

export const useUpdateCustomer = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<any> }) =>
      customersApi.updateCustomer(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: CUSTOMER_KEYS.lists() });
      queryClient.invalidateQueries({ queryKey: CUSTOMER_KEYS.detail(id) });
    },
  });
};

export const useBlockCustomer = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      reason,
      note,
    }: {
      id: string;
      reason: string;
      note: string;
    }) => customersApi.blockCustomer(id, reason, note),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CUSTOMER_KEYS.lists() });
    },
  });
};

export const useDeleteCustomer = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, keepHistory }: { id: string; keepHistory: boolean }) =>
      customersApi.deleteCustomer(id, keepHistory),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CUSTOMER_KEYS.lists() });
    },
  });
};

export const useSendMessage = () =>
  useMutation({
    mutationFn: ({
      customerId,
      subject,
      message,
    }: {
      customerId: string;
      subject: string;
      message: string;
    }) => customersApi.sendMessage(customerId, subject, message),
  });

export const useUpdateCustomerSettings = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      settings,
    }: {
      id: string;
      settings: Partial<CustomerSettings>;
    }) => customersApi.updateSettings(id, settings),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: CUSTOMER_KEYS.settings(id) });
    },
  });
};
