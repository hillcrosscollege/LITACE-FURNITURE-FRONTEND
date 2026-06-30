"use client";

import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";

export type TopProduct = {
  product: string;
  category: string;
  sold: number;
  revenue: string;
};

export const topProducts: TopProduct[] = [
  {
    product: "Modern L-Shaped Sofa",
    category: "Living Room",
    sold: 32,
    revenue: "R 2,560,000",
  },
  {
    product: "Wooden Dining Set",
    category: "Dining Room",
    sold: 28,
    revenue: "R 2,240,000",
  },
  {
    product: "Luxury Wooden Bed",
    category: "Bedroom",
    sold: 24,
    revenue: "R 1,920,000",
  },
  {
    product: "Ergonomic Office Chair",
    category: "Office",
    sold: 20,
    revenue: "R 1,500,000",
  },
  {
    product: "Marble Coffee Table",
    category: "Living Room",
    sold: 18,
    revenue: "R 1,080,000",
  },
];

export const topProductsColumns: ColumnDef<TopProduct>[] = [
  {
    accessorKey: "product",
    header: "Product",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 rounded bg-[#f0e8df] shrink-0 overflow-hidden">
          <Image
            src="/conference_chair-2.png"
            alt={row.getValue("product")}
            width={28}
            height={28}
            className="w-full h-full object-cover"
          />
        </div>
        <span className="text-xs font-medium">{row.getValue("product")}</span>
      </div>
    ),
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => (
      <span className="text-xs text-muted-foreground">
        {row.getValue("category")}
      </span>
    ),
  },
  {
    accessorKey: "sold",
    header: "Sold",
    cell: ({ row }) => <span className="text-xs">{row.getValue("sold")}</span>,
  },
  {
    accessorKey: "revenue",
    header: "Revenue",
    cell: ({ row }) => (
      <span className="text-xs font-semibold">{row.getValue("revenue")}</span>
    ),
  },
];
