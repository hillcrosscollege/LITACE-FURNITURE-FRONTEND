"use client";

import App_Text from "@/components/app_ui/App_Text";
import { ColumnDef } from "@tanstack/react-table";
import { formatCurrency } from "../../overview_view/overview_data/overview_data";
import { LowPerformingProduct } from "../product_performance_types";

export const lowPerformingColumns: ColumnDef<LowPerformingProduct>[] = [
  {
    accessorKey: "name",
    header: () => <App_Text variant="tableHeader">Product</App_Text>,
    cell: ({ row }) => (
      <App_Text variant="tableCell" className="font-medium">
        {row.getValue("name")}
      </App_Text>
    ),
  },
  {
    accessorKey: "views",
    header: () => <App_Text variant="tableHeader">Views</App_Text>,
    cell: ({ row }) => (
      <App_Text variant="tableCell">{row.getValue("views")}</App_Text>
    ),
  },
  {
    accessorKey: "orders",
    header: () => <App_Text variant="tableHeader">Orders</App_Text>,
    cell: ({ row }) => (
      <App_Text variant="tableCell">{row.getValue("orders")}</App_Text>
    ),
  },
  {
    accessorKey: "conversion",
    header: () => <App_Text variant="tableHeader">Conversion</App_Text>,
    cell: ({ row }) => (
      <App_Text variant="tableCellMuted">
        {(row.getValue("conversion") as number).toFixed(2)}%
      </App_Text>
    ),
  },
  {
    accessorKey: "revenue",
    header: () => <App_Text variant="tableHeader">Revenue</App_Text>,
    cell: ({ row }) => {
      const val = row.getValue("revenue") as number;
      return (
        <App_Text
          variant="tableCell"
          className={val === 0 ? "text-[#c0392b] font-medium" : ""}
        >
          {val === 0 ? "R0" : formatCurrency(val)}
        </App_Text>
      );
    },
  },
];
