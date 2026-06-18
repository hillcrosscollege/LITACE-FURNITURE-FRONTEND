"use client";
import { useState, useMemo } from "react";
import { createCustomerColumns } from "../cusomer_data/customer_col";
import { useCustomers } from "./useCustomersQueries";

const useCustomersView = () => {
  const [page, setPage] = useState(1);
  const [editId, setEditId] = useState<string | null>(null);
  // const [blockId, setBlockId] = useState<string | null>(null);
  // const [deleteId, setDeleteId] = useState<string | null>(null);
  const [messageId, setMessageId] = useState<string | null>(null);

  const { data, isLoading, isError } = useCustomers();

  const customers = data?.customers ?? [];
  const stats = data?.stats;

  const editCustomer = customers.find((c) => c.id === editId) ?? null;
  // const blockCustomer = customers.find((c) => c.id === blockId) ?? null;
  // const deleteCustomer = customers.find((c) => c.id === deleteId) ?? null;

  const columns = useMemo(
    () =>
      createCustomerColumns(
        (id) => setEditId(id),
        // (id) => setBlockId(id),
        // (id) => setDeleteId(id),
        (id) => setMessageId(id),
      ),
    [],
  );

  return {
    page,
    setPage,
    editId,
    setEditId,
    messageId,
    setMessageId,
    data,
    isLoading,
    isError,
    stats,
    editCustomer,
    columns,
  };
};

export default useCustomersView;
