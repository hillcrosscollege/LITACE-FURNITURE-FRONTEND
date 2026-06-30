// components/products/details/tabs/variants/variant-columns.tsx
"use client";

import App_Button from "@/components/app_ui/App_Button";
import App_Text from "@/components/app_ui/App_Text";
import { ColumnDef } from "@tanstack/react-table";
import { Pencil, Trash2 } from "lucide-react";
import Image from "next/image";
import { Variant } from "../product_details_type";

export const variantColumns: ColumnDef<Variant>[] = [
  {
    accessorKey: "name",
    header: () => <App_Text variant="tableHeader">Variant</App_Text>,
    cell: ({ row }) => (
      <div className="flex items-center gap-3 min-w-[160px]">
        <div className="w-10 h-10 rounded-lg bg-[#f0e8df] flex-shrink-0 overflow-hidden">
          <Image
            src={row.original.image}
            alt={row.original.name}
            width={40}
            height={40}
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
    accessorKey: "attributes",
    header: () => <App_Text variant="tableHeader">Attributes</App_Text>,
    cell: ({ row }) => (
      <App_Text variant="tableCellMuted">{row.getValue("attributes")}</App_Text>
    ),
  },
  {
    accessorKey: "price",
    header: () => <App_Text variant="tableHeader">Price</App_Text>,
    cell: ({ row }) => (
      <App_Text variant="tableCell" className="font-semibold">
        R {Number(row.getValue("price")).toLocaleString()}
      </App_Text>
    ),
  },
  {
    accessorKey: "stock",
    header: () => <App_Text variant="tableHeader">Stock</App_Text>,
    cell: ({ row }) => (
      <App_Text variant="tableCell">{row.getValue("stock")}</App_Text>
    ),
  },
  {
    accessorKey: "sku",
    header: () => <App_Text variant="tableHeader">SKU</App_Text>,
    cell: ({ row }) => (
      <App_Text variant="tableCellMuted">{row.getValue("sku")}</App_Text>
    ),
  },
  {
    id: "actions",
    header: () => <App_Text variant="tableHeader">Actions</App_Text>,
    cell: () => (
      <div className="flex items-center gap-1">
        <App_Button
          text=""
          icon={<Pencil size={14} />}
          type="button"
          btnStyle="p-1.5 h-auto bg-transparent text-muted-foreground hover:text-primary hover:bg-primary/10 rounded shadow-none border-0"
        />
        <App_Button
          text=""
          icon={<Trash2 size={14} />}
          type="button"
          btnStyle="p-1.5 h-auto bg-transparent text-muted-foreground hover:text-[#c0392b] hover:bg-[#fdecea] rounded shadow-none border-0"
        />
      </div>
    ),
  },
];
