// components/inventory/inventory-columns.tsx
"use client";
import { ColumnDef } from "@tanstack/react-table";
import { InventoryItem, InventoryStatus } from "../inventory_types";
import App_Text from "@/components/app_ui/App_Text";
import Image from "next/image";
import App_Button from "@/components/app_ui/App_Button";
import { Pencil } from "lucide-react";

export const inventoryItems: InventoryItem[] = [
  {
    id: "1",
    name: "Modern L-Shaped Sofa",
    image: "/conference_chair-2.png",
    sku: "FC-SOFA-001",
    category: "Living Room",
    stock: 12,
    status: "In Stock",
    lastUpdated: "May 20, 2024\n10:30 AM",
  },
  {
    id: "2",
    name: "Wooden Dining Set",
    image: "/conference_chair-2.png",
    sku: "FC-DIN-002",
    category: "Dining Room",
    stock: 4,
    status: "Low Stock",
    lastUpdated: "May 19, 2024\n02:15 PM",
  },
  {
    id: "3",
    name: "Luxury Wooden Bed",
    image: "/conference_chair-2.png",
    sku: "FC-BED-003",
    category: "Bedroom",
    stock: 2,
    status: "Low Stock",
    lastUpdated: "May 18, 2024\n11:45 AM",
  },
  {
    id: "4",
    name: "Ergonomic Office Chair",
    image: "/conference_chair-2.png",
    sku: "FC-CHAIR-004",
    category: "Office",
    stock: 20,
    status: "In Stock",
    lastUpdated: "May 18, 2024\n09:20 AM",
  },
  {
    id: "5",
    name: "Marble Coffee Table",
    image: "/conference_chair-2.png",
    sku: "FC-TABLE-005",
    category: "Living Room",
    stock: 6,
    status: "Low Stock",
    lastUpdated: "May 17, 2024\n04:10 PM",
  },
  {
    id: "6",
    name: "Outdoor Patio Set",
    image: "/conference_chair-2.png",
    sku: "FC-OUT-006",
    category: "Outdoor",
    stock: 0,
    status: "Out of Stock",
    lastUpdated: "May 16, 2024\n03:30 PM",
  },
  {
    id: "7",
    name: "Bookshelf Unit",
    image: "/conference_chair-2.png",
    sku: "FC-SHELF-007",
    category: "Office",
    stock: 15,
    status: "In Stock",
    lastUpdated: "May 16, 2024\n10:05 AM",
  },
];

export const inventoryStats = [
  {
    title: "Total Products",
    value: "142",
    subLabel: "All products in store",
    iconClassName: "text-[#7048b6]",
    iconWrapperClassName: "bg-[#f0ebf7]",
  },
  {
    title: "In Stock",
    value: "89",
    subLabel: "Products in stock",
    iconClassName: "text-[#2e7d52]",
    iconWrapperClassName: "bg-[#edf7f2]",
  },
  {
    title: "Low Stock",
    value: "23",
    subLabel: "Products low on stock",
    iconClassName: "text-[#c87941]",
    iconWrapperClassName: "bg-[#fdf0e6]",
  },
  {
    title: "Out of Stock",
    value: "30",
    subLabel: "Products out of stock",
    iconClassName: "text-[#c0392b]",
    iconWrapperClassName: "bg-[#fdecea]",
  },
];

export const inventoryStatusStyles: Record<InventoryStatus, string> = {
  "In Stock": "bg-[#e8fdf0] text-[#157a45]",
  "Low Stock": "bg-[#fdf5e0] text-[#8a6300]",
  "Out of Stock": "bg-[#fdecea] text-[#a32020]",
};

export const inventoryColumns: ColumnDef<InventoryItem>[] = [
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
      <App_Text variant="tableCell" className="font-medium">
        {row.getValue("stock")}
      </App_Text>
    ),
  },
  {
    accessorKey: "status",
    header: () => <App_Text variant="tableHeader">Status</App_Text>,
    cell: ({ row }) => {
      const status = row.getValue("status") as InventoryStatus;
      return (
        <span
          className={`text-xs px-2.5 py-1 rounded-full font-medium ${inventoryStatusStyles[status]}`}
        >
          {status}
        </span>
      );
    },
  },
  {
    accessorKey: "lastUpdated",
    header: () => <App_Text variant="tableHeader">Last Updated</App_Text>,
    cell: ({ row }) => (
      <div className="min-w-25">
        {String(row.getValue("lastUpdated"))
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
      <App_Button
        text=""
        icon={<Pencil size={14} />}
        btnStyle="p-1.5 h-auto bg-transparent text-muted-foreground hover:text-[#1e1a17] hover:bg-[#f5f2ee] rounded shadow-none border-0"
      />
    ),
  },
];
