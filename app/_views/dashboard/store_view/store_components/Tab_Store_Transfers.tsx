"use client";

import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import App_Text from "@/components/app_ui/App_Text";
import App_Table from "@/components/app_ui/App_Table";
import { useStoreTransfers } from "../store_hooks/useStoreQueries";
import { StoreTransfer } from "../store_types";

const typeStyles = {
  Incoming: "bg-[#edf2fb] text-[#3266ad]",
  Outgoing: "bg-[#fdf5e0] text-[#8a6300]",
};
const statusStyles = {
  Completed: "bg-[#e8fdf0] text-[#157a45]",
  Pending: "bg-[#fdf5e0] text-[#8a6300]",
  Cancelled: "bg-[#fdecea] text-[#a32020]",
};

const columns: ColumnDef<StoreTransfer>[] = [
  {
    accessorKey: "date",
    header: () => <App_Text variant="tableHeader">Date</App_Text>,
    cell: ({ row }) => (
      <App_Text variant="tableCell">{row.getValue("date")}</App_Text>
    ),
  },
  {
    accessorKey: "product",
    header: () => <App_Text variant="tableHeader">Product</App_Text>,
    cell: ({ row }) => (
      <App_Text variant="tableCell" className="font-medium">
        {row.getValue("product")}
      </App_Text>
    ),
  },
  {
    accessorKey: "type",
    header: () => <App_Text variant="tableHeader">Type</App_Text>,
    cell: ({ row }) => {
      const t = row.getValue("type") as StoreTransfer["type"];
      return (
        <span
          className={`text-xs px-2.5 py-1 rounded-full font-medium ${typeStyles[t]}`}
        >
          {t}
        </span>
      );
    },
  },
  {
    accessorKey: "from",
    header: () => <App_Text variant="tableHeader">From</App_Text>,
    cell: ({ row }) => (
      <App_Text variant="tableCellMuted">{row.getValue("from")}</App_Text>
    ),
  },
  {
    accessorKey: "to",
    header: () => <App_Text variant="tableHeader">To</App_Text>,
    cell: ({ row }) => (
      <App_Text variant="tableCellMuted">{row.getValue("to")}</App_Text>
    ),
  },
  {
    accessorKey: "quantity",
    header: () => <App_Text variant="tableHeader">Quantity</App_Text>,
    cell: ({ row }) => {
      const t = row.original.type;
      return (
        <App_Text
          variant="tableCell"
          className={`font-semibold ${t === "Incoming" ? "text-[#2e7d52]" : "text-[#c0392b]"}`}
        >
          {t === "Incoming" ? "+" : "-"}
          {row.getValue("quantity")}
        </App_Text>
      );
    },
  },
  {
    accessorKey: "reference",
    header: () => <App_Text variant="tableHeader">Reference</App_Text>,
    cell: ({ row }) => (
      <App_Text variant="tableCellMuted">{row.getValue("reference")}</App_Text>
    ),
  },
  {
    accessorKey: "status",
    header: () => <App_Text variant="tableHeader">Status</App_Text>,
    cell: ({ row }) => {
      const s = row.getValue("status") as StoreTransfer["status"];
      return (
        <span
          className={`text-xs px-2.5 py-1 rounded-full font-medium ${statusStyles[s]}`}
        >
          {s}
        </span>
      );
    },
  },
];

const Tab_Store_Transfers = ({ storeId }: { storeId: string }) => {
  const { data, isLoading } = useStoreTransfers(storeId);
  if (isLoading)
    return (
      <div className="flex justify-center py-10">
        <Loader2 size={20} className="text-primary animate-spin" />
      </div>
    );
  return (
    <div className="space-y-3">
      <div className="border border-[#ede8e2] rounded-2xl overflow-hidden">
        <App_Table
          columns={columns}
          data={data ?? []}
          style="mt-0"
          childRowStyle="hover:bg-[#faf9f7]"
        />
      </div>
      <button
        type="button"
        className="text-xs text-primary hover:underline flex items-center gap-1"
      >
        View all transfers →
      </button>
    </div>
  );
};
export default Tab_Store_Transfers;
