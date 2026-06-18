"use client";
import { useOrder } from "@/app/_views/dashboard/orders_view/order_hooks/useOrders";
import { useOrdersDetails } from "@/app/_views/dashboard/orders_view/order_hooks/useOrdersDetails";
import {
  Order,
  OrderDetail,
} from "@/app/_views/dashboard/orders_view/order_view_types";
import { UseMutateFunction } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { createContext, JSX, ReactNode, useContext } from "react";

export interface IOrderContext {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
  setRefundId: React.Dispatch<React.SetStateAction<string | null>>;
  setUpdateId: React.Dispatch<React.SetStateAction<string | null>>;
  columns: ColumnDef<Order>[];
  totalCount: number;
  isLoading: boolean;
  isError: boolean;
  cancelId: string | null;
  refundId: string | null;
  updateId: string | null;
  orders: Order[];
  // order details
  active: string;
  setActive: React.Dispatch<React.SetStateAction<string>>;
  showCancel: boolean;
  setShowCancel: React.Dispatch<React.SetStateAction<boolean>>;
  showRefund: boolean;
  setShowRefund: React.Dispatch<React.SetStateAction<boolean>>;
  showUpdate: boolean;
  setShowUpdate: React.Dispatch<React.SetStateAction<boolean>>;
  setShowInvoice: React.Dispatch<React.SetStateAction<boolean>>;
  renderTab: () => JSX.Element | null;

  cancelOrder: UseMutateFunction<
    void,
    Error,
    {
      id: string;
      reason: string;
      note: string;
    },
    unknown
  >;
  refundOrder: UseMutateFunction<
    void,
    Error,
    {
      id: string;
      method: string;
      amount: number;
      note: string;
    },
    unknown
  >;
  updateStatus: UseMutateFunction<
    void,
    Error,
    {
      id: string;
      status: string;
      note: string;
    },
    unknown
  >;
  isOrderDetailError: boolean;
  isOrderDetailLoading: boolean;
  order: NoInfer<OrderDetail> | undefined;
}

const OrderContext = createContext<IOrderContext | null>(null);

const OrderContextProvider = ({ children }: { children: ReactNode }) => {
  const {
    page,
    setPage,
    activeTab,
    columns,
    totalCount,
    isLoading,
    isError,
    cancelId,
    updateId,
    refundId,
    setActiveTab,
    orders,
    setRefundId,
    setUpdateId,
  } = useOrder();

  const {
    active,
    setActive,
    showCancel,
    setShowCancel,
    showRefund,
    setShowRefund,
    showUpdate,
    setShowUpdate,
    setShowInvoice,
    renderTab,
    cancelOrder,
    refundOrder,
    updateStatus,
    isOrderDetailError,
    isOrderDetailLoading,
    order,
  } = useOrdersDetails();

  return (
    <OrderContext.Provider
      value={{
        page,
        setPage,
        activeTab,
        columns,
        totalCount,
        isLoading,
        isError,
        cancelId,
        updateId,
        refundId,
        setActiveTab,
        setRefundId,
        setUpdateId,
        orders,
        // orders detail
        active,
        setActive,
        showCancel,
        setShowCancel,
        showRefund,
        setShowRefund,
        showUpdate,
        setShowUpdate,
        setShowInvoice,
        renderTab,
        cancelOrder,
        refundOrder,
        updateStatus,
        isOrderDetailError,
        isOrderDetailLoading,
        order,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export default OrderContextProvider;

export const useOrderContext = () => {
  const context = useContext(OrderContext);

  if (!context) {
    throw new Error("useOrderContext must be used within OrderContextProvider");
  }

  return context;
};
