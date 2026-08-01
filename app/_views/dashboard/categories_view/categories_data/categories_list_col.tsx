// components/categories/categories-columns.tsx
"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, Pencil, Eye, Trash2, Copy } from "lucide-react";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { Category, CategoryStatus } from "../categories_types";
import App_Text from "@/components/app_ui/App_Text";
import { categoryStatusStyles } from "./categories_data";
import Category_Actions_Cell from "../categories_components/Category_Action_Cell";

const ActionsCell = ({ row }: { row: any }) => {
  const router = useRouter();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className="p-1.5 rounded hover:bg-[#f5f2ee] text-muted-foreground transition-colors"
        >
          <MoreHorizontal size={15} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-44">
        <DropdownMenuItem
          className="gap-2 cursor-pointer text-xs"
          onClick={() =>
            router.push(`/dashboard/categories/${row.original.id}`)
          }
        >
          <Eye size={13} /> View Category
        </DropdownMenuItem>
        <DropdownMenuItem
          className="gap-2 cursor-pointer text-xs"
          onClick={() =>
            router.push(`/dashboard/categories/${row.original.id}/edit`)
          }
        >
          <Pencil size={13} /> Edit Category
        </DropdownMenuItem>
        <DropdownMenuItem className="gap-2 cursor-pointer text-xs">
          <Copy size={13} /> Duplicate
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="gap-2 cursor-pointer text-xs text-[#c0392b] focus:text-[#c0392b] focus:bg-[#fdecea]">
          <Trash2 size={13} /> Delete Category
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export const categoriesColumns: ColumnDef<Category>[] = [
  {
    accessorKey: "name",
    header: () => <App_Text variant="tableHeader">Category</App_Text>,
    cell: ({ row }) => (
      <div className="flex items-center gap-3 min-w-40">
        <App_Text variant="tableCell" className="font-medium">
          {row.original.name}
        </App_Text>
      </div>
    ),
  },
  {
    accessorKey: "description",
    header: () => <App_Text variant="tableHeader">Description</App_Text>,
    cell: ({ row }) => (
      <App_Text variant="tableCellMuted" className="max-w-55 truncate">
        {row.getValue("description")}
      </App_Text>
    ),
  },
  {
    accessorKey: "products",
    header: () => <App_Text variant="tableHeader">Products</App_Text>,
    cell: ({ row }) => (
      <App_Text variant="tableCell">{row.getValue("products") || 0}</App_Text>
    ),
  },
  {
    accessorKey: "status",
    header: () => <App_Text variant="tableHeader">Status</App_Text>,
    cell: ({ row }) => {
      const status =
        row.getValue("status") == "inactive"
          ? "Inactive"
          : ("Active" as CategoryStatus);
      return (
        <span
          className={`text-xs px-2.5 py-1 rounded-full font-medium ${categoryStatusStyles[status]}`}
        >
          {status}
        </span>
      );
    },
  },
  // {
  //   accessorKey: "sortOrder",
  //   header: () => <App_Text variant="tableHeader">Sort Order</App_Text>,
  //   cell: ({ row }) => (
  //     <App_Text variant="tableCell">{row.getValue("sortOrder")}</App_Text>
  //   ),
  // },
  // {
  //   accessorKey: "createdAt",
  //   header: () => <App_Text variant="tableHeader">Created At</App_Text>,
  //   cell: ({ row }) => (
  //     <App_Text variant="tableCell">{row.getValue("createdAt")}</App_Text>
  //   ),
  // },
  {
    id: "actions",
    header: () => <App_Text variant="tableHeader">Actions</App_Text>,
    cell: ({ row }) => <Category_Actions_Cell row={row} />,
  },
];
