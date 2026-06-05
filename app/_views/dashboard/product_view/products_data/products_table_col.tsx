// components/products/products-columns.tsx
"use client";

import { ColumnDef } from "@tanstack/react-table";
import {
  Product,
  categoryStyles,
  stockStatusStyles,
  StockStatus,
} from "../products_data/product_types";
import { Pencil, Eye, Trash2, Copy, MoreHorizontal } from "lucide-react";
import Image from "next/image";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import App_Text from "@/components/app_ui/App_Text";

const ActionsCell = ({ row }: { row: any }) => {
  const router = useRouter();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className="p-1.5 rounded hover:bg-[#f5f2ee]  text-muted-foreground hover:text-[#1e1a17] transition-colors"
        >
          <MoreHorizontal size={15} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-44 bg-white">
        <DropdownMenuItem
          className="gap-2 cursor-pointer text-xs"
          onClick={() => router.push(`/dashboard/products/${row.original.id}`)}
        >
          <Eye size={13} /> View Product
        </DropdownMenuItem>
        <DropdownMenuItem
          className="gap-2 cursor-pointer text-xs"
          onClick={() =>
            router.push(`/dashboard/products/${row.original.id}/edit`)
          }
        >
          <Pencil size={13} /> Edit Product
        </DropdownMenuItem>
        <DropdownMenuItem className="gap-2 cursor-pointer text-xs">
          <Copy size={13} /> Duplicate
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="gap-2 cursor-pointer text-xs text-[#c0392b] focus:text-[#c0392b] focus:bg-[#fdecea]">
          <Trash2 size={13} /> Delete Product
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export const productColumns: ColumnDef<Product>[] = [
  {
    accessorKey: "name",
    header: () => <App_Text variant="tableHeader">Product</App_Text>,
    cell: ({ row }) => (
      <div className="flex items-center gap-3 min-w-[180px]">
        <div className="w-10 h-10 rounded-lg bg-[#f0e8df] flex-shrink-0 overflow-hidden">
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
    accessorKey: "sku",
    header: () => <App_Text variant="tableHeader">SKU</App_Text>,
    cell: ({ row }) => (
      <App_Text variant="tableCellMuted">{row.getValue("sku")}</App_Text>
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
      <App_Text variant="tableCell" className="font-semibold">
        ₦{Number(row.getValue("price")).toLocaleString()}
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
    accessorKey: "stockStatus",
    header: () => <App_Text variant="tableHeader">Status</App_Text>,
    cell: ({ row }) => {
      const status = row.getValue("stockStatus") as StockStatus;
      return (
        <span
          className={`text-xs px-2.5 py-1 rounded-full font-medium ${stockStatusStyles[status]}`}
        >
          {status}
        </span>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: () => <App_Text variant="tableHeader">Last Updated</App_Text>,
    cell: ({ row }) => (
      <div className="min-w-[100px]">
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
    cell: ({ row }) => <ActionsCell row={row} />,
  },
];
