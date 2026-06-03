// components/products/products-columns.tsx
"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Pencil, Eye, Trash2 } from "lucide-react";
import Image from "next/image";
import { Checkbox } from "@/components/ui/checkbox";
import App_Text from "@/components/app_ui/App_Text";
import App_Button from "@/components/app_ui/App_Button";
import { categoryStyles, Product, stockStatusStyles } from "./product_types";

export const productColumns: ColumnDef<Product>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(v) => table.toggleAllPageRowsSelected(!!v)}
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(v) => row.toggleSelected(!!v)}
      />
    ),
  },
  {
    accessorKey: "name",
    header: () => <App_Text variant="tableHeader">Product</App_Text>,
    cell: ({ row }) => (
      <div className="flex items-center gap-3 min-w-45">
        <div className="w-10 h-10 rounded-lg bg-[#f0e8df] shrink-0 overflow-hidden">
          <Image
            src={row.original.image}
            alt={row.original.name}
            width={40}
            height={40}
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <App_Text variant="tableCell" className="font-medium">
            {row.original.name}
          </App_Text>
          <App_Text variant="tableCellMuted">{row.original.sku}</App_Text>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "category",
    header: () => <App_Text variant="tableHeader">Category</App_Text>,
    cell: ({ row }) => (
      <span
        className={`text-xs px-2.5 py-1 rounded-full font-medium ${categoryStyles[row.getValue("category") as any] ?? "bg-[#f5f5f5] text-[#555]"}`}
      >
        {row.getValue("category")}
      </span>
    ),
  },
  {
    accessorKey: "price",
    header: () => <App_Text variant="tableHeader">Price</App_Text>,
    cell: ({ row }) => (
      <div className="flex items-center gap-2 min-w-30">
        <App_Text variant="tableCell" className="font-semibold">
          ₦{Number(row.getValue("price")).toLocaleString()}
        </App_Text>
        {row.original.originalPrice && (
          <App_Text variant="tableCellMuted" className="line-through">
            ₦{row.original.originalPrice.toLocaleString()}
          </App_Text>
        )}
      </div>
    ),
  },
  {
    accessorKey: "stock",
    header: () => <App_Text variant="tableHeader">Stock</App_Text>,
    cell: ({ row }) => (
      <div className="flex items-center gap-1.5">
        <App_Text variant="tableCell">{row.original.stock}</App_Text>
        <App_Text
          variant="tableCellMuted"
          className={`font-medium ${stockStatusStyles[row.original.stockStatus]}`}
        >
          {row.original.stockStatus}
        </App_Text>
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: () => <App_Text variant="tableHeader">Status</App_Text>,
    cell: ({ row }) => (
      <span className="text-xs px-2.5 py-1 rounded-md bg-[#e8fdf0] text-[#157a45] font-medium">
        {row.getValue("status")}
      </span>
    ),
  },
  {
    accessorKey: "createdAt",
    header: () => <App_Text variant="tableHeader">Created At</App_Text>,
    cell: ({ row }) => (
      <div className="min-w-25">
        {String(row.getValue("createdAt"))
          .split("\n")
          .map((line, i) =>
            i === 0 ? (
              <App_Text key={i} variant="tableCell">
                {line}
              </App_Text>
            ) : (
              <App_Text key={i} variant="tableCellMuted">
                {line}
              </App_Text>
            ),
          )}
      </div>
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
          btnStyle="p-1.5 h-auto bg-transparent text-muted-foreground hover:text-[#1e1a17] hover:bg-[#f5f2ee] rounded shadow-none border-0"
        />
        <App_Button
          text=""
          icon={<Eye size={14} />}
          btnStyle="p-1.5 h-auto bg-transparent text-muted-foreground hover:text-[#1e1a17] hover:bg-[#f5f2ee] rounded shadow-none border-0"
        />
        <App_Button
          text=""
          icon={<Trash2 size={14} />}
          btnStyle="p-1.5 h-auto bg-transparent text-muted-foreground hover:text-[#c0392b] hover:bg-[#fdecea] rounded shadow-none border-0"
        />
      </div>
    ),
  },
];
