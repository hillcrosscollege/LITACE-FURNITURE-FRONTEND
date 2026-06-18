"use client";

import App_Table from "@/components/app_ui/App_Table";
import App_Text from "@/components/app_ui/App_Text";
import { ColumnDef } from "@tanstack/react-table";
import { Skeleton_Table_Row } from "../../../customers_view/customers_components/Customer_Skeleton";
import { useStockMovements } from "../../inventory_hooks/useInventoryQueries";
import { StockMovement } from "../../inventory_types";

const movementTypeStyles: Record<StockMovement["type"], string> = {
  Restock: "bg-[#edf2fb] text-[#1a56c4]",
  Sale: "bg-[#fdf5e0] text-[#8a6300]",
  Adjustment: "bg-[#f5f0fa] text-[#7048b6]",
  Transfer: "bg-[#e8fdf0] text-[#157a45]",
  Return: "bg-[#fdecea] text-[#a32020]",
};

const columns: ColumnDef<StockMovement>[] = [
  {
    accessorKey: "date",
    header: () => <App_Text variant="tableHeader">Date</App_Text>,
    cell: ({ row }) => (
      <App_Text variant="tableCell">{row.getValue("date")}</App_Text>
    ),
  },
  {
    accessorKey: "type",
    header: () => <App_Text variant="tableHeader">Type</App_Text>,
    cell: ({ row }) => {
      const t = row.getValue("type") as StockMovement["type"];
      return (
        <span
          className={`text-xs px-2.5 py-1 rounded-full font-medium ${movementTypeStyles[t]}`}
        >
          {t}
        </span>
      );
    },
  },
  {
    accessorKey: "quantity",
    header: () => <App_Text variant="tableHeader">Quantity</App_Text>,
    cell: ({ row }) => {
      const qty = row.getValue("quantity") as number;
      return (
        <App_Text
          variant="tableCell"
          className={`font-semibold ${qty > 0 ? "text-[#2e7d52]" : "text-[#c0392b]"}`}
        >
          {qty > 0 ? `+${qty}` : qty}
        </App_Text>
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
    accessorKey: "reference",
    header: () => <App_Text variant="tableHeader">Reference</App_Text>,
    cell: ({ row }) => (
      <App_Text variant="tableCellMuted">{row.getValue("reference")}</App_Text>
    ),
  },
  {
    accessorKey: "note",
    header: () => <App_Text variant="tableHeader">Note</App_Text>,
    cell: ({ row }) => (
      <App_Text variant="tableCellMuted" className="max-w-45 truncate">
        {row.getValue("note")}
      </App_Text>
    ),
  },
];

const Tab_Inv_StockMovement = ({ productId }: { productId: string }) => {
  const { data: movements, isLoading } = useStockMovements(productId);

  return (
    <div className="space-y-4">
      <App_Text variant="cardHeading">Stock Movement History</App_Text>
      <div className="border border-[#ede8e2] rounded-2xl overflow-hidden">
        {isLoading ? (
          <table className="w-full">
            <tbody>
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton_Table_Row key={i} cols={7} />
              ))}
            </tbody>
          </table>
        ) : (
          <App_Table
            columns={columns}
            data={movements ?? []}
            style="mt-0"
            childRowStyle="hover:bg-[#faf9f7]"
          />
        )}
      </div>
    </div>
  );
};

export default Tab_Inv_StockMovement;
