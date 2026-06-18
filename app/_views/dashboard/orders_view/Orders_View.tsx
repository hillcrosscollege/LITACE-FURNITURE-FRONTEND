"use client";

import App_Paginate from "@/components/app_ui/App_Paginate";
import App_Table from "@/components/app_ui/App_Table";
import App_Text from "@/components/app_ui/App_Text";
import { Skeleton_Order_Row } from "./orders_view_components/Order_Skeleton";
import { orderTabs } from "./orders_view_data/orders_data";
import Order_Header from "./orders_view_components/Order_Header";
import { useOrder } from "./order_hooks/useOrders";
import App_Tabs from "@/components/app_ui/App_Tabs";
import { useOrderContext } from "@/app/contexts/admin/Orders_Context";
import useTable from "@/app/_hooks/useTable";

const OrdersPage = () => {
  const {
    page,
    setPage,
    activeTab,
    columns,
    isLoading,
    isError,
    setActiveTab,
    orders,
  } = useOrder();
  const {} = useOrderContext();
  const { tableData, totalPages, startItem, endItem, totalItems } = useTable({
    data: orders,
    page,
  });
  return (
    <>
      <div className="space-y-4">
        <Order_Header />

        {/* Table card */}
        <div className="bg-white rounded-2xl border border-[#ede8e2] shadow-sm overflow-hidden">
          {/* Tabs */}
          <App_Tabs
            activeTab={activeTab}
            detailTabs={orderTabs}
            setActiveTab={setActiveTab}
          />

          {/* Error state */}
          {isError && (
            <div className="flex items-center justify-center py-20">
              <App_Text variant="tableCellMuted" className="text-[#c0392b]">
                Failed to load orders. Please try again.
              </App_Text>
            </div>
          )}

          {/* Table */}
          {!isError && (
            <div className="overflow-x-auto">
              {isLoading ? (
                <table className="w-full">
                  <tbody>
                    {Array.from({ length: 7 }).map((_, i) => (
                      <Skeleton_Order_Row key={i} />
                    ))}
                  </tbody>
                </table>
              ) : (
                <App_Table
                  columns={columns}
                  data={tableData!}
                  style="mt-0"
                  childRowStyle="hover:bg-[#faf9f7] cursor-pointer"
                />
              )}
            </div>
          )}

          {/* Footer */}
          {!isError && (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-2 px-4 border-t border-[#ede8e2]">
              <App_Text variant="tableCellMuted" className="shrink-0">
                {isLoading
                  ? "Loading..."
                  : `Showing ${startItem + 1} to ${endItem} of ${totalItems} orders`}
              </App_Text>
              <App_Paginate
                page={page}
                setPage={setPage}
                totalPages={totalPages}
                paginateStyle="mt-4 mb-4"
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default OrdersPage;
