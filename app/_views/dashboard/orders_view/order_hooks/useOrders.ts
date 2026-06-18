"use client";
import { useState, useMemo } from "react";
import { createOrderColumns } from "../orders_view_data/orders_col";
import { useOrders } from "./useOrderQueries";

export const useOrder = () => {
  const [page, setPage] = useState(1);
  const [activeTab, setActiveTab] = useState("All Orders");
  const [cancelId, setCancelId] = useState<string | null>(null);
  const [refundId, setRefundId] = useState<string | null>(null);
  const [updateId, setUpdateId] = useState<string | null>(null);

  // React Query
  const { data, isLoading, isError } = useOrders();

  const orders = data?.orders ?? [];
  const stats = data?.stats ?? [];
  const totalCount = data?.totalCount ?? 0;

  const columns = useMemo(
    () =>
      createOrderColumns(
        (id) => setCancelId(id),
        // (id) => setRefundId(id),
        // (id) => setUpdateId(id),
      ),
    [],
  );

  return {
    page,
    setPage,
    activeTab,
    setActiveTab,
    setRefundId,
    setUpdateId,
    columns,
    stats,
    totalCount,
    isLoading,
    isError,
    cancelId,
    refundId,
    updateId,
    orders,
  };
};
