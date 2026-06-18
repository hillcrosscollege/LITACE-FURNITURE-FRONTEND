"use client";
import { useAddCustomer } from "@/app/_views/dashboard/customers_view/customers_hooks/useAddCustomer";
import useCustomerDetailView from "@/app/_views/dashboard/customers_view/customers_hooks/useCustomerDetailsView";
import useCustomersView from "@/app/_views/dashboard/customers_view/customers_hooks/useCustomersView";
import {
  AddCustomerStep,
  AdditionalInfoForm,
  AddressInfoForm,
  BasicInfoForm,
  CustomerDetail,
} from "@/app/_views/dashboard/customers_view/customers_types";
import { createContext, JSX, ReactNode } from "react";
import { useContext } from "react";
import { UseFormReturn } from "react-hook-form";

export interface ICustomerContext {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  editId: string | null;
  setEditId: React.Dispatch<React.SetStateAction<string | null>>;
  columns: any;
  data: any;
  isLoading: boolean;
  isError: boolean;
  stats: any;
  editCustomer: any;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
  showEdit: boolean;
  setShowEdit: React.Dispatch<React.SetStateAction<boolean>>;
  setShowBlock: React.Dispatch<React.SetStateAction<boolean>>;
  showBlock: boolean;
  showDelete: boolean;
  setShowDelete: React.Dispatch<React.SetStateAction<boolean>>;
  showMsg: boolean;
  setShowMsg: React.Dispatch<React.SetStateAction<boolean>>;
  singleCustomerLoading: boolean;
  singleCustomerError: boolean;
  renderTab: () => JSX.Element | null;
  activeTab: string;
  customer: NoInfer<CustomerDetail> | undefined;
  id: string;
  currentStep: AddCustomerStep;
  completedSteps: number[];
  goNext: () => Promise<void>;
  goBack: () => void;
  goToStep: (step: number) => void;
  basicForm: UseFormReturn<BasicInfoForm, any, BasicInfoForm>;
  addressForm: UseFormReturn<AddressInfoForm, any, AddressInfoForm>;
  additionalForm: UseFormReturn<AdditionalInfoForm, any, AdditionalInfoForm>;
  handleSave: () => void;
  isPending: boolean;
  isSuccess: boolean;
  createdCustomer: any;
  handleAddAnother: () => void;
  handleViewCustomer: () => void;
  renderStep: () => JSX.Element;
}

const CustomerContext = createContext<ICustomerContext | null>(null);

const CustomerContextProvider = ({ children }: { children: ReactNode }) => {
  const {
    page,
    setPage,
    editId,
    setEditId,
    columns,
    data,
    isLoading,
    isError,
    stats,
    editCustomer,
  } = useCustomersView();

  const {
    setActiveTab,
    showEdit,
    setShowEdit,
    setShowBlock,
    showBlock,
    showDelete,
    setShowDelete,
    showMsg,
    setShowMsg,
    singleCustomerLoading,
    singleCustomerError,
    renderTab,
    activeTab,
    customer,
    id,
  } = useCustomerDetailView();

  const {
    currentStep,
    completedSteps,
    goNext,
    goBack,
    goToStep,
    basicForm,
    addressForm,
    additionalForm,
    handleSave,
    isPending,
    isSuccess,
    createdCustomer,
    handleAddAnother,
    handleViewCustomer,
    renderStep,
  } = useAddCustomer();

  return (
    <CustomerContext.Provider
      value={{
        page,
        setPage,
        editId,
        setEditId,
        columns,
        data,
        isLoading,
        isError,
        stats,
        editCustomer,
        setActiveTab,
        showEdit,
        setShowEdit,
        setShowBlock,
        showBlock,
        showDelete,
        setShowDelete,
        showMsg,
        setShowMsg,
        singleCustomerLoading,
        singleCustomerError,
        renderTab,
        activeTab,
        customer,
        id,
        currentStep,
        completedSteps,
        goNext,
        goBack,
        goToStep,
        basicForm,
        addressForm,
        additionalForm,
        handleSave,
        isPending,
        isSuccess,
        createdCustomer,
        handleAddAnother,
        handleViewCustomer,
        renderStep,
      }}
    >
      {children}
    </CustomerContext.Provider>
  );
};

export default CustomerContextProvider;

export const useCustomerContext = () => {
  const context = useContext(CustomerContext);

  if (!context) {
    throw new Error(
      "useCustomerContext must be used within CustomerContextProvider",
    );
  }

  return context;
};
