"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import App_Text from "@/components/app_ui/App_Text";
import Cancel_Order_Modal from "../order_modals/Cancel_Order_Modal";
import Refund_Order_Modal from "../order_modals/Refund_Order_Modal";
import Update_Status_Modal from "../order_modals/Update_Status_Modal";
import {
  Skeleton_Order_Detail_Header,
  Skeleton_Order_Tab_Content,
} from "../orders_view_components/Order_Skeleton";
import { orderStatusStyles } from "../orders_view_data/orders_data";
import { useOrderContext } from "@/app/contexts/admin/Orders_Context";
import App_Tabs from "@/components/app_ui/App_Tabs";
import More_Drop_Down from "./order_details_components/More_Drop_Down";

const detailTabs = [
  { label: "Overview" },
  { label: "Items", count: 3 },
  { label: "Shipping" },
  { label: "Payments" },
  { label: "Timeline" },
  { label: "Notes" },
];

const OrderDetailsPage = () => {
  const {
    active,
    setActive,
    showCancel,
    setShowCancel,
    showRefund,
    setShowRefund,
    showUpdate,
    setShowUpdate,
    renderTab,
    isOrderDetailError,
    isOrderDetailLoading,
    order,
  } = useOrderContext();

  if (isOrderDetailError)
    return (
      <div className="p-6 flex items-center justify-center">
        <App_Text variant="tableCellMuted" className="text-[#c0392b]">
          Failed to load order. Please try again.
        </App_Text>
      </div>
    );

  return (
    <>
      <div className="space-y-4">
        {/* Breadcrumb */}
        <div className="flex items-center gap-1.5">
          <Link href="/dashboard/orders">
            <App_Text
              variant="tableCellMuted"
              className="hover:text-primary cursor-pointer transition-colors"
            >
              Orders
            </App_Text>
          </Link>
          <ChevronRight size={13} className="text-muted-foreground" />
          <App_Text variant="tableCellMuted" className="text-[text]">
            {isOrderDetailLoading ? "Loading..." : `Order ${order?.id}`}
          </App_Text>
        </div>

        {/* Header */}
        {isOrderDetailLoading ? (
          <Skeleton_Order_Detail_Header />
        ) : (
          order && (
            <>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3 flex-wrap">
                  <App_Text variant="pageTitle">Order {order.id}</App_Text>
                  <span
                    className={`text-xs px-2.5 py-1 rounded-full font-medium ${orderStatusStyles[order.status]}`}
                  >
                    {order.status}
                  </span>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  {/* <App_Button
                    text="Print Invoice"
                    icon={<Printer size={13} />}
                    type="button"
                    onPress={() => window.print()}
                    btnStyle="text-xs border border-[#e0dbd4] bg-white text-[text] hover:bg-[#f5f2ee] rounded-lg px-3 py-2 h-auto"
                  />
                  <App_Button
                    text="Download Invoice"
                    icon={<Download size={13} />}
                    type="button"
                    onPress={() => setShowInvoice(true)}
                    btnStyle="text-xs border border-[#e0dbd4] bg-white text-[text] hover:bg-[#f5f2ee] rounded-lg px-3 py-2 h-auto"
                  /> */}
                  <More_Drop_Down
                    setShowCancel={setShowCancel}
                    setShowRefund={setShowRefund}
                    setShowUpdate={setShowUpdate}
                  />
                </div>
              </div>

              <App_Text variant="tableCellMuted">
                Placed on {order.placedAt}
              </App_Text>
            </>
          )
        )}

        {/* Tabs */}
        <div className="bg-white rounded-2xl border border-[#ede8e2] shadow-sm overflow-hidden">
          {!isOrderDetailLoading && (
            <App_Tabs
              activeTab={active}
              detailTabs={detailTabs}
              setActiveTab={setActive}
            />
          )}

          <div className="p-4">
            {isOrderDetailLoading ? (
              <Skeleton_Order_Tab_Content />
            ) : (
              renderTab()
            )}
          </div>
        </div>
      </div>

      {/* Modals */}
      {showCancel && order && <Cancel_Order_Modal />}
      {showRefund && order && <Refund_Order_Modal />}
      {showUpdate && order && <Update_Status_Modal />}
    </>
  );
};

export default OrderDetailsPage;
