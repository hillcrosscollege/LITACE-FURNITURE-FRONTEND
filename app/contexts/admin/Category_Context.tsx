"use client";

import { categoryListStats } from "@/app/_views/dashboard/categories_view/categories_data/categories_data";
import useCategories from "@/app/_views/dashboard/categories_view/categories_hooks/useCategories";
import useCategoriesDetails from "@/app/_views/dashboard/categories_view/categories_hooks/useCategoriesDetails";
import {
  Category,
  CategoryStatus,
} from "@/app/_views/dashboard/categories_view/categories_types";
import { createContext, ReactNode, useContext, JSX } from "react";

export interface ICategoryContext {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  isLoading: boolean;
  isError: boolean;
  data:
    | NoInfer<{
        categories: Category[];
        stats: typeof categoryListStats;
      }>
    | undefined;
  showAdd: boolean;
  setShowAdd: React.Dispatch<React.SetStateAction<boolean>>;
  name: string;
  image: string;
  description: string;
  status: CategoryStatus;
  products: number;
  subcategories: number;
  sortOrder: number;
  createdAt: string;
  renderTab: () => JSX.Element | null;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
  activeTab: string;
  setShowEdit: React.Dispatch<React.SetStateAction<boolean>>;
  showEdit: boolean;
  showDelete: boolean;
  setShowDelete: React.Dispatch<React.SetStateAction<boolean>>;
  showMore: boolean;
  setShowMore: React.Dispatch<React.SetStateAction<boolean>>;
}

const CategoryContext = createContext<ICategoryContext | null>(null);

const CategoryContextProvider = ({ children }: { children: ReactNode }) => {
  const { data, isLoading, isError, page, setPage, showAdd, setShowAdd } =
    useCategories();
  const {
    name,
    image,
    description,
    status,
    products,
    subcategories,
    sortOrder,
    createdAt,
    renderTab,
    setActiveTab,
    activeTab,
    setShowEdit,
    showEdit,
    showDelete,
    setShowDelete,
    showMore,
    setShowMore,
  } = useCategoriesDetails();
  return (
    <CategoryContext.Provider
      value={{
        data,
        isLoading,
        isError,
        page,
        setPage,
        showAdd,
        setShowAdd,
        name,
        image,
        description,
        status,
        products,
        subcategories,
        sortOrder,
        createdAt,
        renderTab,
        setActiveTab,
        activeTab,
        setShowEdit,
        showEdit,
        showDelete,
        setShowDelete,
        showMore,
        setShowMore,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};

export default CategoryContextProvider;

export const useCategoryContext = () => {
  const context = useContext(CategoryContext);

  if (!context) {
    throw new Error(
      "useCategoryContext must be used within CategoryContextProvider",
    );
  }

  return context;
};
