"use client";

import { ColumnDef } from "@tanstack/react-table";
import {
  MoreHorizontal,
  Eye,
  SlidersHorizontal,
  Trash2,
  Barcode,
} from "lucide-react";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import App_Text from "@/components/app_ui/App_Text";
import { InventoryStatus, InventoryProduct } from "../inventory_types";

export const inventoryStatusStyles: Record<InventoryStatus, string> = {
  "In Stock": "bg-[#e8fdf0] text-[#157a45]",
  "Low Stock": "bg-[#fdf5e0] text-[#8a6300]",
  "Out of Stock": "bg-[#fdecea] text-[#a32020]",
};

const ActionsCell = ({
  row,
  onAdjust,
  onDelete,
  onBarcode,
}: {
  row: any;
  onAdjust: (product: InventoryProduct) => void;
  onDelete: (product: InventoryProduct) => void;
  onBarcode: (product: InventoryProduct) => void;
}) => {
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
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem
          className="gap-2 cursor-pointer text-xs"
          onClick={() => router.push(`/dashboard/inventory/${row.original.id}`)}
        >
          <Eye size={13} /> View Details
        </DropdownMenuItem>
        <DropdownMenuItem
          className="gap-2 cursor-pointer text-xs"
          onClick={() => onAdjust(row.original)}
        >
          <SlidersHorizontal size={13} /> Adjust Stock
        </DropdownMenuItem>
        <DropdownMenuItem
          className="gap-2 cursor-pointer text-xs"
          onClick={() => onBarcode(row.original)}
        >
          <Barcode size={13} /> Print Barcode
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="gap-2 cursor-pointer text-xs text-[#c0392b] focus:text-[#c0392b] focus:bg-[#fdecea]"
          onClick={() => onDelete(row.original)}
        >
          <Trash2 size={13} /> Delete Product
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export const createInventoryColumns = (
  onAdjust: (product: InventoryProduct) => void,
  onDelete: (product: InventoryProduct) => void,
  onBarcode: (product: InventoryProduct) => void,
): ColumnDef<InventoryProduct>[] => [
  {
    accessorKey: "name",
    header: () => <App_Text variant="tableHeader">Product</App_Text>,
    cell: ({ row }) => (
      <div className="flex items-center gap-3 min-w-45">
        <div className="w-10 h-10 rounded-lg bg-[#f0e8df] overflow-hidden shrink-0">
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
      <App_Text variant="tableCell">{row.getValue("category")}</App_Text>
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
    accessorKey: "reserved",
    header: () => <App_Text variant="tableHeader">Reserved</App_Text>,
    cell: ({ row }) => (
      <App_Text variant="tableCell">{row.getValue("reserved")}</App_Text>
    ),
  },
  {
    accessorKey: "available",
    header: () => <App_Text variant="tableHeader">Available</App_Text>,
    cell: ({ row }) => (
      <App_Text variant="tableCell" className="font-semibold">
        {row.getValue("available")}
      </App_Text>
    ),
  },
  {
    accessorKey: "status",
    header: () => <App_Text variant="tableHeader">Status</App_Text>,
    cell: ({ row }) => {
      const s = row.getValue("status") as InventoryStatus;
      return (
        <span
          className={`text-xs px-2.5 py-1 rounded-full font-medium ${inventoryStatusStyles[s]}`}
        >
          {s}
        </span>
      );
    },
  },
  {
    accessorKey: "location",
    header: () => <App_Text variant="tableHeader">Location</App_Text>,
    cell: ({ row }) => (
      <App_Text variant="tableCellMuted">{row.getValue("location")}</App_Text>
    ),
  },
  {
    accessorKey: "lastUpdated",
    header: () => <App_Text variant="tableHeader">Last Updated</App_Text>,
    cell: ({ row }) => (
      <App_Text variant="tableCellMuted">
        {row.getValue("lastUpdated")}
      </App_Text>
    ),
  },
  {
    id: "actions",
    header: () => <App_Text variant="tableHeader">Actions</App_Text>,
    cell: ({ row }) => (
      <ActionsCell
        row={row}
        onAdjust={onAdjust}
        onDelete={onDelete}
        onBarcode={onBarcode}
      />
    ),
  },
];
