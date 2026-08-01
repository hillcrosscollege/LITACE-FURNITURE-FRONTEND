"use client";
import useInventory from "@/app/_views/dashboard/inventory_view/inventory_hooks/useInventory";
import {
  InventoryProduct,
  InventoryStats,
} from "@/app/_views/dashboard/inventory_view/inventory_types";
import { ColumnDef } from "@tanstack/react-table";
import {
  createContext,
  Dispatch,
  JSX,
  ReactNode,
  SetStateAction,
  useContext,
} from "react";
import { UseFormRegister, FieldErrors } from "react-hook-form";

export interface IInventoryContext {
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  activeFilter: string;
  setActiveFilter: Dispatch<SetStateAction<string>>;
  adjustProduct: InventoryProduct | null;
  setAdjustProduct: Dispatch<SetStateAction<InventoryProduct | null>>;
  restockProduct: InventoryProduct | null;
  setRestockProduct: Dispatch<SetStateAction<InventoryProduct | null>>;
  transferProduct: InventoryProduct | null;
  setTransferProduct: Dispatch<SetStateAction<InventoryProduct | null>>;
  showFilters: boolean;
  setShowFilters: Dispatch<SetStateAction<boolean>>;
  showExport: boolean;
  setShowExport: Dispatch<SetStateAction<boolean>>;
  isLoading: boolean;
  isError: boolean;
  register: UseFormRegister<{
    search: string;
  }>;
  errors: FieldErrors<{
    search: string;
  }>;
  products: InventoryProduct[];
  totalPages: number;
  startItem: number;
  endItem: number;
  columns: ColumnDef<InventoryProduct>[];
  statCards: (
    | {
        title: string;
        value: string;
        change: string;
        changeDirection: "up";
        changeLabel: string;
      }
    | {
        title: string;
        value: string;
        change: string;
        changeDirection: "down";
        changeLabel: string;
      }
  )[];
  filtered: InventoryProduct[];
}

const InventoryContext = createContext<IInventoryContext | null>(null);

const InventoryContextProvider = ({ children }: { children: ReactNode }) => {
  const {
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
  } = useInventory();

  return (
    <InventoryContext.Provider
      value={{
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
      }}
    >
      {children}
    </InventoryContext.Provider>
  );
};

export default InventoryContextProvider;

export const useInventoryContext = () => {
  const context = useContext(InventoryContext);

  if (!context) {
    throw new Error(
      "useInventoryContext must be used within InventoryContextProvider",
    );
  }

  return context;
};
