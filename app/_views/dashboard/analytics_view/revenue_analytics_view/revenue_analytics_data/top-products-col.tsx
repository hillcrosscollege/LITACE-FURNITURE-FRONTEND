"use client";

import Image from "next/image";
import { ColumnDef } from "@tanstack/react-table";
import App_Text from "@/components/app_ui/App_Text";
import { formatCurrency } from "../../overview_view/overview_data/overview_data";
import { TopRevenueProduct } from "../revenue_analytics_types";

export const topProductsColumns: ColumnDef<TopRevenueProduct>[] = [
  {
    accessorKey: "name",
    header: () => <App_Text variant="tableHeader">Product</App_Text>,
    cell: ({ row }) => (
      <div className="flex items-center gap-3 min-w-[160px]">
        <div className="w-8 h-8 rounded-lg bg-[#f0e8df] overflow-hidden flex-shrink-0">
          <Image
            src={row.original.image}
            alt={row.original.name}
            width={32}
            height={32}
            className="w-full h-full object-cover"
          />
        </div>
        <App_Text variant="tableCell" className="font-medium">
          {row.original.name}
        </App_Text>
      </div>
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
];
