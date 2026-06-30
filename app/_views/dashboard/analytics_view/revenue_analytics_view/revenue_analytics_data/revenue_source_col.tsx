"use client";

import { ColumnDef } from "@tanstack/react-table";
import { RevenueSource } from "../revenue_analytics_types";
import App_Text from "@/components/app_ui/App_Text";
import { formatCurrency } from "../../overview_view/overview_data/overview_data";

export const revenueSourceColumns: ColumnDef<RevenueSource>[] = [
  {
    accessorKey: "source",
    header: () => <App_Text variant="tableHeader">Source</App_Text>,
    cell: ({ row }) => (
      <App_Text variant="tableCell" className="font-medium">
        {row.getValue("source")}
      </App_Text>
    ),
  },
  {
    accessorKey: "revenue",
    header: () => <App_Text variant="tableHeader">Revenue</App_Text>,
    cell: ({ row }) => (
      <App_Text variant="tableCell" className="font-semibold">
        {formatCurrency(row.getValue("revenue"))}
      </App_Text>
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
    accessorKey: "pctOfTotal",
    header: () => <App_Text variant="tableHeader">% of Total</App_Text>,
    cell: ({ row }) => (
      <App_Text variant="tableCell">{row.getValue("pctOfTotal")}%</App_Text>
    ),
  },
  {
    accessorKey: "change",
    header: () => <App_Text variant="tableHeader">Change</App_Text>,
    cell: ({ row }) => {
      const r = row.original;
      return (
        <App_Text
          variant="tableCell"
          className={`font-medium ${r.direction === "up" ? "text-[#2e7d52]" : "text-[#c0392b]"}`}
        >
          {r.direction === "up" ? "↑" : "↓"} {r.change}%
        </App_Text>
      );
    },
  },
];
