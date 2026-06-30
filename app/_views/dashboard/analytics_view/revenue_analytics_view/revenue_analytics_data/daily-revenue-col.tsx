"use client";

import App_Text from "@/components/app_ui/App_Text";
import { ColumnDef } from "@tanstack/react-table";
import { formatCurrency } from "../../overview_view/overview_data/overview_data";
import { DailyRevenue } from "../revenue_analytics_types";

export const dailyRevenueColumns: ColumnDef<DailyRevenue>[] = [
  {
    accessorKey: "date",
    header: () => <App_Text variant="tableHeader">Date</App_Text>,
    cell: ({ row }) => (
      <App_Text variant="tableCell" className="font-medium">
        {row.getValue("date")}
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
    accessorKey: "grossRevenue",
    header: () => <App_Text variant="tableHeader">Gross Revenue</App_Text>,
    cell: ({ row }) => (
      <App_Text variant="tableCell">
        {formatCurrency(row.getValue("grossRevenue"))}
      </App_Text>
    ),
  },
  {
    accessorKey: "discounts",
    header: () => <App_Text variant="tableHeader">Discounts</App_Text>,
    cell: ({ row }) => (
      <App_Text variant="tableCellMuted">
        {formatCurrency(row.getValue("discounts"))}
      </App_Text>
    ),
  },
  {
    accessorKey: "refunds",
    header: () => <App_Text variant="tableHeader">Refunds</App_Text>,
    cell: ({ row }) => (
      <App_Text variant="tableCellMuted">
        {formatCurrency(row.getValue("refunds"))}
      </App_Text>
    ),
  },
  {
    accessorKey: "shippingRevenue",
    header: () => <App_Text variant="tableHeader">Shipping Revenue</App_Text>,
    cell: ({ row }) => (
      <App_Text variant="tableCellMuted">
        {formatCurrency(row.getValue("shippingRevenue"))}
      </App_Text>
    ),
  },
  {
    accessorKey: "netRevenue",
    header: () => <App_Text variant="tableHeader">Net Revenue</App_Text>,
    cell: ({ row }) => (
      <App_Text variant="tableCell" className="font-semibold text-primary">
        {formatCurrency(row.getValue("netRevenue"))}
      </App_Text>
    ),
  },
];
