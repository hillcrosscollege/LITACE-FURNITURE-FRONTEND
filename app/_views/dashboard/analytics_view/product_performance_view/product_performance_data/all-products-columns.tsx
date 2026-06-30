"use client";

import Image from "next/image";
import { Eye } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import App_Button from "@/components/app_ui/App_Button";
import App_Text from "@/components/app_ui/App_Text";
import { formatCurrency } from "../../overview_view/overview_data/overview_data";
import { AllProductPerf } from "../product_performance_types";

const statusStyles = {
  Active: "bg-[#e8fdf0] text-[#157a45]",
  Inactive: "bg-[#f5f2ee] text-[#555]",
};

export const createAllProductsColumns = (
  onView: (id: string) => void,
): ColumnDef<AllProductPerf>[] => [
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
    accessorKey: "category",
    header: () => <App_Text variant="tableHeader">Category</App_Text>,
    cell: ({ row }) => (
      <App_Text variant="tableCellMuted">{row.getValue("category")}</App_Text>
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
    accessorKey: "unitsSold",
    header: () => <App_Text variant="tableHeader">Units Sold</App_Text>,
    cell: ({ row }) => (
      <App_Text variant="tableCell">{row.getValue("unitsSold")}</App_Text>
    ),
  },
  {
    accessorKey: "views",
    header: () => <App_Text variant="tableHeader">Views</App_Text>,
    cell: ({ row }) => (
      <App_Text variant="tableCellMuted">{row.getValue("views")}</App_Text>
    ),
  },
  {
    accessorKey: "conversionRate",
    header: () => <App_Text variant="tableHeader">Conversion Rate</App_Text>,
    cell: ({ row }) => (
      <App_Text variant="tableCell">
        {(row.getValue("conversionRate") as number).toFixed(2)}%
      </App_Text>
    ),
  },
  {
    accessorKey: "avgPrice",
    header: () => <App_Text variant="tableHeader">Average Price</App_Text>,
    cell: ({ row }) => (
      <App_Text variant="tableCell">
        {formatCurrency(row.getValue("avgPrice"))}
      </App_Text>
    ),
  },
  {
    accessorKey: "status",
    header: () => <App_Text variant="tableHeader">Status</App_Text>,
    cell: ({ row }) => {
      const s = row.getValue("status") as AllProductPerf["status"];
      return (
        <span
          className={`text-xs px-2.5 py-1 rounded-full font-medium ${statusStyles[s]}`}
        >
          {s}
        </span>
      );
    },
  },
  {
    id: "view",
    header: () => <App_Text variant="tableHeader">View</App_Text>,
    cell: ({ row }) => (
      <App_Button
        text=""
        icon={<Eye size={14} />}
        type="button"
        onPress={() => onView(row.original.id)}
        btnStyle="p-1.5 h-auto bg-transparent text-muted-foreground hover:text-primary hover:bg-primary/10 rounded shadow-none border-0"
      />
    ),
  },
];
