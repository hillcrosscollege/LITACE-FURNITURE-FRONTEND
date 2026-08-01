import { useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { createInventoryColumns } from "../inventory_data/inventory_cols";
import { InventoryProduct } from "../inventory_types";
import { useInventoryQueries } from "./useInventoryQueries";

const useInventory = () => {
  const PAGE_SIZE = 5;
  const [page, setPage] = useState(1);
  const [activeFilter, setActiveFilter] = useState("all");
  //   const [activeFilter, setActiveFilter] = useState<"all" | "low" | "out">(
  //     "all",
  //   );
  const [adjustProduct, setAdjustProduct] = useState<InventoryProduct | null>(
    null,
  );
  const [restockProduct, setRestockProduct] = useState<InventoryProduct | null>(
    null,
  );
  const [transferProduct, setTransferProduct] =
    useState<InventoryProduct | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [showExport, setShowExport] = useState(false);

  const { data, isLoading, isError } = useInventoryQueries();
  const {
    register,
    formState: { errors },
  } = useForm<{ search: string }>();

  const products = data?.products ?? [];
  const stats = data?.stats;

  const filtered = useMemo(() => {
    if (activeFilter === "low")
      return products.filter((p) => p.status === "Low Stock");
    if (activeFilter === "out")
      return products.filter((p) => p.status === "Out of Stock");
    return products;
  }, [products, activeFilter]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const startItem = (page - 1) * PAGE_SIZE + 1;
  const endItem = Math.min(page * PAGE_SIZE, filtered.length);

  const columns = useMemo(
    () =>
      createInventoryColumns(
        (p) => setAdjustProduct(p),
        (p) => setRestockProduct(p),
        (p) => setTransferProduct(p),
      ),
    [],
  );

  const statCards = stats
    ? [
        {
          title: "Total Products",
          value: stats.totalProducts.toLocaleString(),
          change: "8.5%",
          changeDirection: "up" as const,
          changeLabel: "vs last month",
        },
        {
          title: "Total Stock",
          value: stats.totalStock.toLocaleString(),
          change: "5.2%",
          changeDirection: "up" as const,
          changeLabel: "Total units in stock",
        },
        {
          title: "Available Stock",
          value: stats.availableStock.toLocaleString(),
          change: "6.1%",
          changeDirection: "up" as const,
          changeLabel: "Available for sale",
        },
        {
          title: "Low Stock",
          value: stats.lowStock.toLocaleString(),
          change: "3",
          changeDirection: "down" as const,
          changeLabel: "Below minimum level",
        },
        {
          title: "Out of Stock",
          value: stats.outOfStock.toLocaleString(),
          change: "2",
          changeDirection: "down" as const,
          changeLabel: "No available stock",
        },
        {
          title: "Inventory Value",
          value: `R${(stats.inventoryValue / 1000000).toFixed(1)}M`,
          change: "12.3%",
          changeDirection: "up" as const,
          changeLabel: "Total inventory value",
        },
      ]
    : [];
  return {
    page,
    setPage,
    activeFilter,
    setActiveFilter,
    adjustProduct,
    setAdjustProduct,
    restockProduct,
    setRestockProduct,
    transferProduct,
    setTransferProduct,
    showFilters,
    setShowFilters,
    showExport,
    setShowExport,
    isLoading,
    isError,
    register,
    errors,
    products,
    totalPages,
    startItem,
    endItem,
    columns,
    statCards,
    filtered,
  };
};

export default useInventory;
