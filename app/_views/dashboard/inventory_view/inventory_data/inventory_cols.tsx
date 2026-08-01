// components/inventory/inventory-columns.tsx
"use client";

import Image from "next/image";
import {
  Eye,
  MoreHorizontal,
  SlidersHorizontal,
  ArrowLeftRight,
  RotateCcw,
} from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import App_Text from "@/components/app_ui/App_Text";
import App_Button from "@/components/app_ui/App_Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { InventoryStatus, InventoryProduct } from "../inventory_types";

export const statusStyles: Record<InventoryStatus, string> = {
  Healthy: "bg-[#e8fdf0] text-[#157a45]",
  "Low Stock": "bg-[#fdf5e0] text-[#8a6300]",
  "Out of Stock": "bg-[#fdecea] text-[#a32020]",
};

const ActionsCell = ({
  row,
  onAdjust,
  onRestock,
  onTransfer,
}: {
  row: any;
  onAdjust: (p: InventoryProduct) => void;
  onRestock: (p: InventoryProduct) => void;
  onTransfer: (p: InventoryProduct) => void;
}) => {
  const router = useRouter();
  return (
    <div className="flex items-center gap-1">
      <App_Button
        text=""
        icon={<Eye size={14} />}
        type="button"
        onPress={() => router.push(`/dashboard/inventory/${row.original.id}`)}
        btnStyle="p-1.5 h-auto bg-transparent text-muted-foreground hover:text-primary hover:bg-primary/10 rounded shadow-none border-0"
      />
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
            onClick={() => onAdjust(row.original)}
          >
            <SlidersHorizontal size={13} /> Adjust Stock
          </DropdownMenuItem>
          <DropdownMenuItem
            className="gap-2 cursor-pointer text-xs"
            onClick={() => onRestock(row.original)}
          >
            <RotateCcw size={13} /> Restock
          </DropdownMenuItem>
          <DropdownMenuItem
            className="gap-2 cursor-pointer text-xs"
            onClick={() => onTransfer(row.original)}
          >
            <ArrowLeftRight size={13} /> Transfer Stock
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export const createInventoryColumns = (
  onAdjust: (p: InventoryProduct) => void,
  onRestock: (p: InventoryProduct) => void,
  onTransfer: (p: InventoryProduct) => void,
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
      <App_Text variant="tableCell">{row.getValue("category")}</App_Text>
    ),
  },
  {
    accessorKey: "totalStock",
    header: () => <App_Text variant="tableHeader">Total Stock</App_Text>,
    cell: ({ row }) => (
      <App_Text variant="tableCell">{row.getValue("totalStock")}</App_Text>
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
    accessorKey: "reserved",
    header: () => <App_Text variant="tableHeader">Reserved</App_Text>,
    cell: ({ row }) => (
      <App_Text variant="tableCell">{row.getValue("reserved")}</App_Text>
    ),
  },
  {
    accessorKey: "lowStockLevel",
    header: () => <App_Text variant="tableHeader">Low Stock Level</App_Text>,
    cell: ({ row }) => (
      <App_Text variant="tableCell">{row.getValue("lowStockLevel")}</App_Text>
    ),
  },
  {
    accessorKey: "status",
    header: () => <App_Text variant="tableHeader">Status</App_Text>,
    cell: ({ row }) => {
      const s = row.getValue("status") as InventoryStatus;
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
    accessorKey: "locations",
    header: () => <App_Text variant="tableHeader">Locations</App_Text>,
    cell: ({ row }) => (
      <App_Text variant="tableCellMuted">{row.getValue("locations")}</App_Text>
    ),
  },
  {
    id: "actions",
    header: () => <App_Text variant="tableHeader">Actions</App_Text>,
    cell: ({ row }) => (
      <ActionsCell
        row={row}
        onAdjust={onAdjust}
        onRestock={onRestock}
        onTransfer={onTransfer}
      />
    ),
  },
];
