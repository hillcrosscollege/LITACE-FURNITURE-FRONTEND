// components/categories/details/tabs/Tab_Cat_Products.tsx
"use client";

import Image from "next/image";
import { MoreHorizontal } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import { useForm } from "react-hook-form";
import { Search, SlidersHorizontal } from "lucide-react";
import App_Button from "@/components/app_ui/App_Button";
import App_Input from "@/components/app_ui/App_Input";
import App_Table from "@/components/app_ui/App_Table";
import App_Text from "@/components/app_ui/App_Text";
import { categoryProducts } from "../../categories_data/categories_data";
import { CategoryProduct } from "../../categories_types";

const productStatusStyles = {
  Active: "bg-[#e8fdf0] text-[#157a45]",
  Inactive: "bg-[#fdecea] text-[#a32020]",
};

const columns: ColumnDef<CategoryProduct>[] = [
  {
    accessorKey: "name",
    header: () => <App_Text variant="tableHeader">Product</App_Text>,
    cell: ({ row }) => (
      <div className="flex items-center gap-3 min-w-[160px]">
        <div className="w-9 h-9 rounded-lg bg-[#f0e8df] overflow-hidden flex-shrink-0">
          <Image
            src={row.original.image}
            alt={row.original.name}
            width={36}
            height={36}
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
    accessorKey: "status",
    header: () => <App_Text variant="tableHeader">Status</App_Text>,
    cell: ({ row }) => {
      const s = row.getValue("status") as "Active" | "Inactive";
      return (
        <span
          className={`text-xs px-2.5 py-1 rounded-full font-medium ${productStatusStyles[s]}`}
        >
          {s}
        </span>
      );
    },
  },
  {
    id: "actions",
    header: () => <App_Text variant="tableHeader">Actions</App_Text>,
    cell: () => (
      <App_Button
        text=""
        icon={<MoreHorizontal size={15} />}
        type="button"
        btnStyle="p-1.5 h-auto bg-transparent text-muted-foreground hover:bg-[#f5f2ee] rounded shadow-none border-0"
      />
    ),
  },
];

const Tab_Cat_Products = () => {
  const {
    register,
    formState: { errors },
  } = useForm<{ search: string }>();
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <App_Text variant="cardHeading">Products in Living Room</App_Text>
        <div className="flex items-center gap-2">
          <App_Input
            name="search"
            register={register}
            errors={errors}
            placeholder="Search products..."
            showLabel={false}
            icon1={<Search size={13} className="text-muted-foreground" />}
            containerStyle="w-48"
          />
          <App_Button
            text="Filters"
            icon={<SlidersHorizontal size={13} />}
            type="button"
            btnStyle="text-xs border border-[#e0dbd4] bg-white text-[#1e1a17] hover:bg-[#f5f2ee] rounded-lg px-3 py-2 h-auto"
          />
        </div>
      </div>
      <div className="border border-[#ede8e2] rounded-2xl overflow-hidden">
        <App_Table
          columns={columns}
          data={categoryProducts}
          style="mt-0"
          childRowStyle="hover:bg-[#faf9f7]"
        />
      </div>
      <App_Text variant="tableCellMuted">
        Showing 1 to {categoryProducts.length} of 26 products
      </App_Text>
    </div>
  );
};

export default Tab_Cat_Products;
