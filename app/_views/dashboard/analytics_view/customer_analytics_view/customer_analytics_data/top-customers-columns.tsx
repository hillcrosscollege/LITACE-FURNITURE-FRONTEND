"use client";

import Image from "next/image";
import { ColumnDef } from "@tanstack/react-table";
import App_Text from "@/components/app_ui/App_Text";
import { formatCurrency } from "../../overview_view/overview_data/overview_data";
import { TopCustomer } from "../customer_analytics_types";

export const topCustomersColumns: ColumnDef<TopCustomer>[] = [
  {
    accessorKey: "name",
    header: () => <App_Text variant="tableHeader">Customer</App_Text>,
    cell: ({ row }) => (
      <div className="flex items-center gap-3 min-w-[160px]">
        <div className="w-8 h-8 rounded-full bg-[#f0e8df] overflow-hidden flex-shrink-0">
          <Image
            src={row.original.avatar}
            alt={row.original.name}
            width={32}
            height={32}
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <App_Text variant="tableCell" className="font-medium">
            {row.original.name}
          </App_Text>
          <App_Text variant="tableCellMuted">{row.original.email}</App_Text>
        </div>
      </div>
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
    accessorKey: "totalSpent",
    header: () => <App_Text variant="tableHeader">Total Spent</App_Text>,
    cell: ({ row }) => (
      <App_Text variant="tableCell" className="font-semibold">
        {formatCurrency(row.getValue("totalSpent"))}
      </App_Text>
    ),
  },
  {
    accessorKey: "avgOrder",
    header: () => <App_Text variant="tableHeader">Avg Order Value</App_Text>,
    cell: ({ row }) => (
      <App_Text variant="tableCellMuted">
        {formatCurrency(row.getValue("avgOrder"))}
      </App_Text>
    ),
  },
  {
    accessorKey: "lastOrder",
    header: () => <App_Text variant="tableHeader">Last Order</App_Text>,
    cell: ({ row }) => (
      <App_Text variant="tableCellMuted">{row.getValue("lastOrder")}</App_Text>
    ),
  },
];
