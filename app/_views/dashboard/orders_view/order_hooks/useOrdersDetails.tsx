"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import {
  useCancelOrder,
  useRefundOrder,
  useUpdateOrderStatus,
} from "./useOrderMutation";
import { useOrderDetail } from "./useOrderQueries";
import Tab_Order_Items from "../order_details_view/order_details_components/Tab_Order_Items";
import Tab_Order_Notes from "../order_details_view/order_details_components/Tab_Order_Notes";
import Tab_Order_Overview from "../order_details_view/order_details_components/Tab_Order_Overview";
import Tab_Order_Payments from "../order_details_view/order_details_components/Tab_Order_Payments";
import Tab_Order_Shipping from "../order_details_view/order_details_components/Tab_Order_Shipping";
import Tab_Order_Timeline from "../order_details_view/order_details_components/Tab_Order_Timeline";

type Modal = "cancel" | "refund" | "update" | null;

export const useOrdersDetails = () => {
  const params = useParams();
  const id = params.id as string;

  const [active, setActive] = useState("Overview");
  const [showCancel, setShowCancel] = useState(false);
  const [showRefund, setShowRefund] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [showInvoice, setShowInvoice] = useState(false);

  // React Query
  const {
    data: order,
    isLoading: isOrderDetailLoading,
    isError: isOrderDetailError,
  } = useOrderDetail(id);
  const { mutate: cancelOrder, isPending: isOrderDetailCancel } =
    useCancelOrder();
  const { mutate: refundOrder, isPending: isOrderDetailRefund } =
    useRefundOrder();
  const { mutate: updateStatus, isPending: isOrderDetailUpdate } =
    useUpdateOrderStatus();

  const renderTab = () => {
    if (!order) return null;
    switch (active) {
      case "Overview":
        return <Tab_Order_Overview />;
      case "Items":
        return <Tab_Order_Items />;
      case "Shipping":
        return <Tab_Order_Shipping />;
      case "Payments":
        return <Tab_Order_Payments />;
      case "Timeline":
        return <Tab_Order_Timeline />;
      case "Notes":
        return <Tab_Order_Notes />;
      default:
        return null;
    }
  };

  return {
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
  };
};
