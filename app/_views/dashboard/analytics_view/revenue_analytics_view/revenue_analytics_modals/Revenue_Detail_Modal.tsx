"use client";

import App_Button from "@/components/app_ui/App_Button";
import App_Table from "@/components/app_ui/App_Table";
import App_Text from "@/components/app_ui/App_Text";
import { ColumnDef } from "@tanstack/react-table";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { formatCurrency } from "../../overview_view/overview_data/overview_data";
import { DailyRevenue } from "../revenue_analytics_types";

type Props = { data: DailyRevenue; onClose: () => void };

type OrderRow = DailyRevenue["orderRows"][number];

const orderColumns: ColumnDef<OrderRow>[] = [
  {
    accessorKey: "id",
    header: () => <App_Text variant="tableHeader">Order ID</App_Text>,
    cell: ({ row }) => (
      <App_Text variant="tableCell" className="font-medium">
        {row.getValue("id")}
      </App_Text>
    ),
  },
  {
    accessorKey: "customer",
    header: () => <App_Text variant="tableHeader">Customer</App_Text>,
    cell: ({ row }) => (
      <App_Text variant="tableCell">{row.getValue("customer")}</App_Text>
    ),
  },
  {
    accessorKey: "amount",
    header: () => <App_Text variant="tableHeader">Amount</App_Text>,
    cell: ({ row }) => (
      <App_Text variant="tableCell">
        {formatCurrency(row.getValue("amount"))}
      </App_Text>
    ),
  },
  {
    accessorKey: "discount",
    header: () => <App_Text variant="tableHeader">Discount</App_Text>,
    cell: ({ row }) => (
      <App_Text variant="tableCellMuted">
        {formatCurrency(row.getValue("discount"))}
      </App_Text>
    ),
  },
  {
    accessorKey: "refund",
    header: () => <App_Text variant="tableHeader">Refund</App_Text>,
    cell: ({ row }) => (
      <App_Text variant="tableCellMuted">
        {row.getValue("refund") ? formatCurrency(row.getValue("refund")) : "No"}
      </App_Text>
    ),
  },
  {
    accessorKey: "shipping",
    header: () => <App_Text variant="tableHeader">Shipping</App_Text>,
    cell: ({ row }) => (
      <App_Text variant="tableCellMuted">
        {formatCurrency(row.getValue("shipping"))}
      </App_Text>
    ),
  },
  {
    accessorKey: "net",
    header: () => <App_Text variant="tableHeader">Net Amount</App_Text>,
    cell: ({ row }) => (
      <App_Text variant="tableCell" className="font-semibold text-primary">
        {formatCurrency(row.getValue("net"))}
      </App_Text>
    ),
  },
];

const Revenue_Detail_Modal = ({ data, onClose }: Props) => {
  const router = useRouter();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-3xl max-h-[85vh] overflow-y-auto">
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#ede8e2] sticky top-0 bg-white z-10">
          <div>
            <App_Text variant="cardHeading" className="text-base">
              Revenue Detail
            </App_Text>
            <App_Text variant="tableCellMuted">{data.date}</App_Text>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-[#f5f2ee] text-muted-foreground"
          >
            <X size={16} />
          </button>
        </div>

        <div className="p-6 space-y-4">
          {/* Stat row */}
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
            {[
              { label: "Orders", value: data.orders.toString() },
              {
                label: "Gross Revenue",
                value: formatCurrency(data.grossRevenue),
              },
              { label: "Discounts", value: formatCurrency(data.discounts) },
              { label: "Refunds", value: formatCurrency(data.refunds) },
              {
                label: "Shipping Revenue",
                value: formatCurrency(data.shippingRevenue),
              },
              { label: "Net Revenue", value: formatCurrency(data.netRevenue) },
            ].map(({ label, value }) => (
              <div
                key={label}
                className="bg-[#faf9f7] rounded-xl border border-[#ede8e2] p-3"
              >
                <App_Text variant="tableCellMuted">{label}</App_Text>
                <App_Text variant="tableCell" className="font-semibold mt-1">
                  {value}
                </App_Text>
              </div>
            ))}
          </div>

          {/* Order list */}
          {data.orderRows.length > 0 ? (
            <App_Table
              columns={orderColumns}
              data={data.orderRows}
              style="mt-0"
              childRowStyle="hover:bg-[#faf9f7] cursor-pointer"
              onRowClick={(row) => router.push(`/dashboard/orders/${row.id}`)}
            />
          ) : (
            <App_Text variant="tableCellMuted" className="py-6 text-center">
              No order-level data available for this date.
            </App_Text>
          )}
        </div>

        <div className="flex justify-end gap-3 px-6 py-4 border-t border-[#ede8e2] sticky bottom-0 bg-white">
          <button
            type="button"
            onClick={() => router.push("/dashboard/orders")}
            className="text-xs text-primary hover:underline"
          >
            View Full Orders
          </button>
          <App_Button
            text="Close"
            type="button"
            onPress={onClose}
            btnStyle="text-xs border border-[#e0dbd4] bg-white text-[#1e1a17] hover:bg-[#f5f2ee] rounded-lg px-4 py-2 h-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default Revenue_Detail_Modal;
