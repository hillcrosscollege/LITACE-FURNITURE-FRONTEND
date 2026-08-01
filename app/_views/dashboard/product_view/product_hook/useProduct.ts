"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useProductQuery } from "./useProductQueries";

type SearchForm = { search: string };

const useProduct = () => {
  const [activeTab, setActiveTab] = useState("All Products");
  const [page, setPage] = useState(1);
  const [rowSelection, setRowSelection] = useState({});
  const {
    register,
    formState: { errors },
  } = useForm<SearchForm>();

  const selectedCount = Object.keys(rowSelection).length;

  const { data, isLoading, error, isError } = useProductQuery();

  return {
    activeTab,
    setActiveTab,
    page,
    setPage,
    setRowSelection,
    selectedCount,
    register,
    errors,
    data,
    isLoading,
    isError,
  };
};

export default useProduct;
