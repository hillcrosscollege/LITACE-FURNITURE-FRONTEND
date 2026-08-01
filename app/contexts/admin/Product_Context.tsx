"use client";

import useAddProduct, {
  Step,
} from "@/app/_views/dashboard/product_view/add_product_view/add_product_hooks/useAddProduct";
import { ProductFormData } from "@/app/_views/dashboard/product_view/add_product_view/add_product_types";
import useProduct from "@/app/_views/dashboard/product_view/product_hook/useProduct";
import {
  Product,
  ProductAttribute,
  VariantCombination,
} from "@/app/_views/dashboard/product_view/products_data/product_types";
import {
  createContext,
  ReactNode,
  useContext,
  Dispatch,
  SetStateAction,
  ComponentType,
} from "react";
import {
  UseFormReturn,
  UseFormHandleSubmit,
  UseFormReset,
  UseFormRegister,
  FieldErrors,
} from "react-hook-form";

type SearchForm = { search: string };

export interface IProductContext {
  // add product
  form: UseFormReturn<ProductFormData, any, ProductFormData>;
  handleSubmit: UseFormHandleSubmit<ProductFormData, ProductFormData>;
  // onSubmit: (data: ProductFormData) => void;
  saveAsDraft: () => void;
  currentStep: number;
  setCurrentStep: Dispatch<SetStateAction<number>>;
  completedSteps: number[];
  CurrentStepComponent: ComponentType<any>;
  goNext: () => Promise<void>;
  goBack: () => void;
  attributes: ProductAttribute[];
  setAttributes: Dispatch<SetStateAction<ProductAttribute[]>>;
  combinations: VariantCombination[];
  setCombinations: Dispatch<SetStateAction<VariantCombination[]>>;
  // allSteps: Step[];
  onToggle: (value: boolean) => void;
  visibleSteps: Step[];
  reset: UseFormReset<ProductFormData>;

  // all product
  activeTab: string;
  setActiveTab: Dispatch<SetStateAction<string>>;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  setRowSelection: Dispatch<SetStateAction<{}>>;
  selectedCount: number;
  register: UseFormRegister<SearchForm>;
  errors: FieldErrors<SearchForm>;
  data:
    | NoInfer<{
        data: Product[];
      }>
    | undefined;
  isLoading: boolean;
  isError: boolean;
}

const ProductContext = createContext<IProductContext | null>(null);

const ProductContextProvider = ({ children }: { children: ReactNode }) => {
  const {
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
  } = useProduct();
  const {
    form,
    currentStep,
    CurrentStepComponent,
    goNext,
    goBack,
    handleSubmit,
    // onSubmit,
    saveAsDraft,
    completedSteps,
    attributes,
    setAttributes,
    combinations,
    setCombinations,
    setCurrentStep,
    // allSteps,
    onToggle,
    visibleSteps,
    reset,
  } = useAddProduct();
  return (
    <ProductContext.Provider
      value={{
        // add product
        form,
        currentStep,
        CurrentStepComponent,
        goNext,
        goBack,
        handleSubmit,
        // onSubmit,
        saveAsDraft,
        completedSteps,
        attributes,
        setAttributes,
        combinations,
        setCombinations,
        setCurrentStep,
        // allSteps,
        onToggle,
        visibleSteps,
        reset,

        // all products
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
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export default ProductContextProvider;

export const useProductContext = () => {
  const context = useContext(ProductContext);

  if (!context) {
    throw new Error(
      "useCategoryContext must be used within CategoryContextProvider",
    );
  }

  return context;
};
