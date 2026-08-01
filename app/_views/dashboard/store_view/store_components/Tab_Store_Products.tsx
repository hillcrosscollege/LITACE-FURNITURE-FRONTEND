"use client";

import { useState } from "react";
import Image from "next/image";
import { Search, SlidersHorizontal } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import { Loader2 } from "lucide-react";
import App_Text from "@/components/app_ui/App_Text";
import App_Table from "@/components/app_ui/App_Table";
import App_Input from "@/components/app_ui/App_Input";
import App_Button from "@/components/app_ui/App_Button";
import App_Paginate from "@/components/app_ui/App_Paginate";
import { useForm } from "react-hook-form";
import { StoreProduct } from "../store_types";
import { useStoreProducts } from "../store_hooks/useStoreQueries";

const statusStyles: Record<StoreProduct["status"], string> = {
  Healthy: "bg-[#e8fdf0] text-[#157a45]",
  "Low Stock": "bg-[#fdf5e0] text-[#8a6300]",
  "Out of Stock": "bg-[#fdecea] text-[#a32020]",
};

const PAGE_SIZE = 5;

const columns: ColumnDef<StoreProduct>[] = [
  {
    accessorKey: "name",
    header: () => <App_Text variant="tableHeader">Product</App_Text>,
    cell: ({ row }) => (
      <div className="flex items-center gap-3 min-w-40">
        <div className="w-8 h-8 rounded-lg bg-[#f0e8df] overflow-hidden shrink-0">
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
      <App_Text variant="tableCellMuted">{row.getValue("reserved")}</App_Text>
    ),
  },
  {
    accessorKey: "damaged",
    header: () => <App_Text variant="tableHeader">Damaged</App_Text>,
    cell: ({ row }) => (
      <App_Text variant="tableCellMuted">{row.getValue("damaged")}</App_Text>
    ),
  },
  {
    accessorKey: "status",
    header: () => <App_Text variant="tableHeader">Status</App_Text>,
    cell: ({ row }) => {
      const s = row.getValue("status") as StoreProduct["status"];
      return (
        <span
          className={`text-xs px-2.5 py-1 rounded-full font-medium ${statusStyles[s]}`}
        >
          {s}
        </span>
      );
    },
  },
];

const Tab_Store_Products = ({ storeId }: { storeId: string }) => {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useStoreProducts(storeId);
  const {
    register,
    formState: { errors },
  } = useForm<{ search: string }>();
  const totalPages = Math.ceil((data?.length ?? 0) / PAGE_SIZE);

  if (isLoading)
    return (
      <div className="flex justify-center py-10">
        <Loader2 size={20} className="text-primary animate-spin" />
      </div>
    );

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-3">
        <App_Input
          name="search"
          register={register}
          errors={errors}
          placeholder="Search products..."
          showLabel={false}
          icon1={<Search size={13} className="text-muted-foreground" />}
          containerStyle="w-56"
        />
        <App_Button
          text="Filters"
          icon={<SlidersHorizontal size={13} />}
          type="button"
          btnStyle="text-xs border border-[#e0dbd4] bg-white text-[#1e1a17] hover:bg-[#f5f2ee] rounded-lg px-3 py-2 h-auto"
        />
      </div>
      <div className="border border-[#ede8e2] rounded-2xl overflow-hidden">
        <App_Table
          columns={columns}
          data={data ?? []}
          style="mt-0"
          childRowStyle="hover:bg-[#faf9f7]"
          //   page={page}
          //   pageSize={PAGE_SIZE}
        />
      </div>
      <div className="flex items-center justify-between">
        <App_Text variant="tableCellMuted">
          Showing 1 to {Math.min(PAGE_SIZE, data?.length ?? 0)} of{" "}
          {data?.length ?? 0} products
        </App_Text>
        <App_Paginate
          page={page}
          setPage={setPage}
          totalPages={totalPages}
          paginateStyle="mt-0"
        />
      </div>
    </div>
  );
};
export default Tab_Store_Products;
