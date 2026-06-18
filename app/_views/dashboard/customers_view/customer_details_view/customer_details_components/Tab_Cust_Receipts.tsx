"use client";

import { Download } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";
import App_Button from "@/components/app_ui/App_Button";
import App_Paginate from "@/components/app_ui/App_Paginate";
import App_Table from "@/components/app_ui/App_Table";
import App_Text from "@/components/app_ui/App_Text";
import { Skeleton_Receipt_Row } from "../../customers_components/Customer_Skeleton";
import { useCustomerReceipts } from "../../customers_hooks/useCustomersQueries";
import { CustomerReceipt } from "../../customers_types";

const receiptStatusStyles: Record<CustomerReceipt["status"], string> = {
  Successful: "bg-[#e8fdf0] text-[#157a45]",
  Failed: "bg-[#fdecea] text-[#a32020]",
  Pending: "bg-[#fdf5e0] text-[#8a6300]",
  Refunded: "bg-[#f5f0fa] text-[#7048b6]",
};

const columns: ColumnDef<CustomerReceipt>[] = [
  {
    accessorKey: "orderId",
    header: () => <App_Text variant="tableHeader">Order ID</App_Text>,
    cell: ({ row }) => (
      <App_Text variant="tableCell" className="font-medium">
        {row.getValue("orderId")}
      </App_Text>
    ),
  },
  {
    accessorKey: "date",
    header: () => <App_Text variant="tableHeader">Date</App_Text>,
    cell: ({ row }) => (
      <App_Text variant="tableCell">{row.getValue("date")}</App_Text>
    ),
  },
  {
    accessorKey: "description",
    header: () => <App_Text variant="tableHeader">Description</App_Text>,
    cell: ({ row }) => (
      <App_Text variant="tableCellMuted" className="max-w-50 truncate">
        {row.getValue("description")}
      </App_Text>
    ),
  },
  {
    accessorKey: "method",
    header: () => <App_Text variant="tableHeader">Method</App_Text>,
    cell: ({ row }) => (
      <App_Text variant="tableCell">{row.getValue("method")}</App_Text>
    ),
  },
  {
    accessorKey: "amount",
    header: () => <App_Text variant="tableHeader">Amount</App_Text>,
    cell: ({ row }) => (
      <App_Text variant="tableCell" className="font-semibold">
        ₦{Number(row.getValue("amount")).toLocaleString()}
      </App_Text>
    ),
  },
  {
    accessorKey: "status",
    header: () => <App_Text variant="tableHeader">Status</App_Text>,
    cell: ({ row }) => {
      const s = row.getValue("status") as CustomerReceipt["status"];
      return (
        <span
          className={`text-xs px-2.5 py-1 rounded-full font-medium ${receiptStatusStyles[s]}`}
        >
          {s}
        </span>
      );
    },
  },
  {
    id: "actions",
    header: () => <App_Text variant="tableHeader">Receipt</App_Text>,
    cell: () => (
      <App_Button
        text=""
        icon={<Download size={14} />}
        type="button"
        btnStyle="p-1.5 h-auto bg-transparent text-muted-foreground hover:text-primary hover:bg-primary/10 rounded shadow-none border-0"
      />
    ),
  },
];

const Tab_Cust_Receipts = ({ customerId }: { customerId: string }) => {
  const [page, setPage] = useState(1);
  const { data: receipts, isLoading } = useCustomerReceipts(customerId);

  const totalSpent =
    receipts
      ?.filter((r) => r.status === "Successful")
      .reduce((s, r) => s + r.amount, 0) ?? 0;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <App_Text variant="cardHeading">Receipts & Payments</App_Text>
        <App_Button
          text="Export All"
          icon={<Download size={13} />}
          type="button"
          btnStyle="text-xs border border-[#e0dbd4] bg-white text-[#1e1a17] hover:bg-[#f5f2ee] rounded-lg px-3 py-2 h-auto"
        />
      </div>

      {/* Summary */}
      {!isLoading && receipts && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {[
            {
              label: "Total Paid",
              value: `₦${totalSpent.toLocaleString()}`,
              color: "text-[#2e7d52]",
            },
            {
              label: "Total Receipts",
              value: String(receipts.length),
              color: "text-primary",
            },
            {
              label: "Refunded",
              value: String(
                receipts.filter((r) => r.status === "Refunded").length,
              ),
              color: "text-[#7048b6]",
            },
          ].map(({ label, value, color }) => (
            <div
              key={label}
              className="bg-[#faf9f7] rounded-xl border border-[#ede8e2] p-3"
            >
              <App_Text variant="tableCellMuted">{label}</App_Text>
              <App_Text variant="statValue" className={`text-xl mt-1 ${color}`}>
                {value}
              </App_Text>
            </div>
          ))}
        </div>
      )}

      {/* Table */}
      <div className="border border-[#ede8e2] rounded-2xl overflow-hidden">
        {isLoading ? (
          <table className="w-full">
            <tbody>
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton_Receipt_Row key={i} />
              ))}
            </tbody>
          </table>
        ) : (
          <App_Table
            columns={columns}
            data={receipts ?? []}
            style="mt-0"
            childRowStyle="hover:bg-[#faf9f7]"
          />
        )}
      </div>

      <div className="flex items-center justify-between">
        <App_Text variant="tableCellMuted">
          {isLoading
            ? "Loading..."
            : `Showing 1 to ${receipts?.length ?? 0} receipts`}
        </App_Text>
        <App_Paginate
          page={page}
          setPage={setPage}
          totalPages={1}
          paginateStyle="mt-0"
        />
      </div>
    </div>
  );
};

export default Tab_Cust_Receipts;
