import { useQueryClient, useMutation } from "@tanstack/react-query";
import { ordersApi } from "../orders_view_data/orders_data";
import { ORDER_KEYS } from "./useOrderQueries";

export const useUpdateOrderStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      status,
      note,
    }: {
      id: string;
      status: string;
      note: string;
    }) => ordersApi.updateOrderStatus(id, status, note),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ORDER_KEYS.lists() });
      queryClient.invalidateQueries({ queryKey: ORDER_KEYS.detail(id) });
    },
  });
};

export const useCancelOrder = () => {
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
    }) => ordersApi.cancelOrder(id, reason, note),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ORDER_KEYS.lists() });
      queryClient.invalidateQueries({ queryKey: ORDER_KEYS.detail(id) });
    },
  });
};

export const useRefundOrder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      method,
      amount,
      note,
    }: {
      id: string;
      method: string;
      amount: number;
      note: string;
    }) => ordersApi.refundOrder(id, method, amount, note),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ORDER_KEYS.lists() });
      queryClient.invalidateQueries({ queryKey: ORDER_KEYS.detail(id) });
    },
  });
};
