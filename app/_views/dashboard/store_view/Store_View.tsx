"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  Search,
  SlidersHorizontal,
  Eye,
  MoreHorizontal,
  Plus,
  Store as StoreIcon,
  Package,
  DollarSign,
  AlertTriangle,
  XCircle,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { ColumnDef } from "@tanstack/react-table";
import App_Text from "@/components/app_ui/App_Text";
import App_Button from "@/components/app_ui/App_Button";
import App_Input from "@/components/app_ui/App_Input";
import App_Table from "@/components/app_ui/App_Table";
import App_Paginate from "@/components/app_ui/App_Paginate";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { StatCard } from "../dashboard_view/dashboard_components/Stat_Card";
import { Skeleton_Inv_Stat } from "../inventory_view/inventory_components/Inventory_Skeleton";
import { Skeleton_Store_Row } from "./store_components/Store_Skeleton";
import Add_Store_Modal from "./store_modals/Add_Store_Modal";
import Delete_Store_Modal from "./store_modals/Delete_Store_Modal";
import Transfer_Stock_Modal from "./store_modals/Transfer_Stock_Modal";
import { Store } from "./store_types";
import { useStoresQueries } from "./store_hooks/useStoreQueries";

const PAGE_SIZE = 5;

export default function StoresPage() {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [showAdd, setShowAdd] = useState(false);
  const [editStore, setEditStore] = useState<Store | null>(null);
  const [deleteStore, setDeleteStore] = useState<Store | null>(null);
  const [showTransfer, setShowTransfer] = useState(false);

  const { data, isLoading, isError } = useStoresQueries();
  const {
    register,
    formState: { errors },
  } = useForm<{ search: string }>();

  const stores = data?.stores ?? [];
  const stats = data?.stats;
  const totalPages = Math.ceil(stores.length / PAGE_SIZE);

  const statCards = stats
    ? [
        {
          title: "Total Stores",
          value: stats.totalStores.toString(),
          icon: StoreIcon,
          iconClassName: "text-primary",
          iconWrapperClassName: "bg-primary/10",
          subLabel: "Active stores",
        },
        {
          title: "Total Stock",
          value: stats.totalStock.toLocaleString(),
          icon: Package,
          iconClassName: "text-[#3266ad]",
          iconWrapperClassName: "bg-[#edf2fb]",
          subLabel: "Total units",
        },
        {
          title: "Inventory Value",
          value: `R${(stats.inventoryValue / 1000000).toFixed(1)}M`,
          icon: DollarSign,
          iconClassName: "text-[#2e7d52]",
          iconWrapperClassName: "bg-[#edf7f2]",
          subLabel: "Total value",
        },
        {
          title: "Low Stock Items",
          value: stats.lowStockItems.toString(),
          icon: AlertTriangle,
          iconClassName: "text-[#c87941]",
          iconWrapperClassName: "bg-[#fdf0e6]",
          subLabel: "Across all stores",
        },
        {
          title: "Out of Stock Items",
          value: stats.outOfStockItems.toString(),
          icon: XCircle,
          iconClassName: "text-[#c0392b]",
          iconWrapperClassName: "bg-[#fdecea]",
          subLabel: "Across all stores",
        },
      ]
    : [];

  const columns: ColumnDef<Store>[] = useMemo(
    () => [
      {
        accessorKey: "name",
        header: () => <App_Text variant="tableHeader">Store</App_Text>,
        cell: ({ row }) => (
          <div className="flex items-center gap-3 min-w-40">
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
        accessorKey: "location",
        header: () => <App_Text variant="tableHeader">Location</App_Text>,
        cell: ({ row }) => (
          <App_Text variant="tableCellMuted">
            {row.getValue("location")}
          </App_Text>
        ),
      },
      {
        accessorKey: "manager",
        header: () => <App_Text variant="tableHeader">Manager</App_Text>,
        cell: ({ row }) => (
          <App_Text variant="tableCell">{row.getValue("manager")}</App_Text>
        ),
      },
      {
        accessorKey: "totalStock",
        header: () => <App_Text variant="tableHeader">Total Stock</App_Text>,
        cell: ({ row }) => (
          <App_Text variant="tableCell" className="font-semibold">
            {row.getValue("totalStock")}
          </App_Text>
        ),
      },
      {
        accessorKey: "inventoryValue",
        header: () => (
          <App_Text variant="tableHeader">Inventory Value</App_Text>
        ),
        cell: ({ row }) => (
          <App_Text variant="tableCell">
            R{Number(row.getValue("inventoryValue")).toLocaleString()}
          </App_Text>
        ),
      },
      {
        accessorKey: "lowStockItems",
        header: () => (
          <App_Text variant="tableHeader">Low Stock Items</App_Text>
        ),
        cell: ({ row }) => (
          <App_Text variant="tableCell">
            {row.getValue("lowStockItems")}
          </App_Text>
        ),
      },
      {
        accessorKey: "outOfStockItems",
        header: () => (
          <App_Text variant="tableHeader">Out of Stock Items</App_Text>
        ),
        cell: ({ row }) => (
          <App_Text variant="tableCell">
            {row.getValue("outOfStockItems")}
          </App_Text>
        ),
      },
      {
        accessorKey: "status",
        header: () => <App_Text variant="tableHeader">Status</App_Text>,
        cell: ({ row }) => {
          const s = row.getValue("status") as Store["status"];
          return (
            <span
              className={`text-xs px-2.5 py-1 rounded-full font-medium ${s === "Active" ? "bg-[#e8fdf0] text-[#157a45]" : "bg-[#fdecea] text-[#a32020]"}`}
            >
              {s}
            </span>
          );
        },
      },
      {
        id: "actions",
        header: () => <App_Text variant="tableHeader">Actions</App_Text>,
        cell: ({ row }) => (
          <div className="flex items-center gap-1">
            <App_Button
              text=""
              icon={<Eye size={14} />}
              type="button"
              onPress={() =>
                router.push(`/dashboard/stores/${row.original.id}`)
              }
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
                  onClick={() =>
                    router.push(`/dashboard/stores/${row.original.id}`)
                  }
                >
                  View Details
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="gap-2 cursor-pointer text-xs"
                  onClick={() => setEditStore(row.original)}
                >
                  Edit Store
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="gap-2 cursor-pointer text-xs"
                  onClick={() => setShowTransfer(true)}
                >
                  Transfer Stock
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="gap-2 cursor-pointer text-xs text-[#c0392b] focus:text-[#c0392b] focus:bg-[#fdecea]"
                  onClick={() => setDeleteStore(row.original)}
                >
                  Delete Store
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ),
      },
    ],
    [],
  );

  if (isError)
    return (
      <div className="p-6 flex items-center justify-center">
        <App_Text variant="tableCellMuted" className="text-[#c0392b]">
          Failed to load stores. Please try again.
        </App_Text>
      </div>
    );

  return (
    <>
      <div className="space-y-4">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <App_Text variant="pageTitle">Stores Overview</App_Text>
            <App_Text variant="pageSub">
              View and manage all your stores and their stock performance.
            </App_Text>
          </div>
          <div className="flex items-center gap-2">
            <App_Button
              text="Filters"
              icon={<SlidersHorizontal size={13} />}
              type="button"
              btnStyle="text-xs border border-[#e0dbd4] bg-white text-[#1e1a17] hover:bg-[#f5f2ee] rounded-lg px-3 py-2 h-auto"
            />
            <App_Button
              text="Add Store"
              icon={<Plus size={13} />}
              type="button"
              onPress={() => setShowAdd(true)}
              btnStyle="text-xs bg-primary text-white hover:bg-primary/90 rounded-lg px-3 py-2 h-auto"
            />
          </div>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {isLoading
            ? Array.from({ length: 5 }).map((_, i) => (
                <Skeleton_Inv_Stat key={i} />
              ))
            : statCards.map((stat) => (
                <StatCard
                  key={stat.title}
                  title={stat.title}
                  value={stat.value}
                  icon={stat.icon}
                  iconClassName={stat.iconClassName}
                  iconWrapperClassName={stat.iconWrapperClassName}
                />
              ))}
        </div>

        {/* Table card */}
        <div className="bg-white rounded-2xl border border-[#ede8e2] shadow-sm overflow-hidden">
          <div className="p-4 pb-2">
            <App_Input
              name="search"
              register={register}
              errors={errors}
              placeholder="Search stores..."
              showLabel={false}
              icon1={<Search size={13} className="text-muted-foreground" />}
              containerStyle="w-full max-w-sm"
            />
          </div>
          <div className="overflow-x-auto">
            {isLoading ? (
              <table className="w-full">
                <tbody>
                  {Array.from({ length: 4 }).map((_, i) => (
                    <Skeleton_Store_Row key={i} />
                  ))}
                </tbody>
              </table>
            ) : (
              <App_Table
                columns={columns}
                data={stores}
                style="mt-0"
                childRowStyle="hover:bg-[#faf9f7] cursor-pointer"
                // page={page}
                // pageSize={PAGE_SIZE}
              />
            )}
          </div>
          {!isLoading && (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-2 px-4 border-t border-[#ede8e2]">
              <App_Text variant="tableCellMuted" className="shrink-0">
                Showing 1 to {Math.min(PAGE_SIZE, stores.length)} of{" "}
                {stores.length} stores
              </App_Text>
              <App_Paginate
                page={page}
                setPage={setPage}
                totalPages={totalPages}
                paginateStyle="mt-4 mb-4"
              />
            </div>
          )}
        </div>
      </div>

      {showAdd && <Add_Store_Modal onClose={() => setShowAdd(false)} />}
      {editStore && (
        <Add_Store_Modal
          onClose={() => setEditStore(null)}
          isEdit
          defaultValues={editStore}
        />
      )}
      {deleteStore && (
        <Delete_Store_Modal
          store={deleteStore}
          onClose={() => setDeleteStore(null)}
        />
      )}
      {showTransfer && (
        <Transfer_Stock_Modal onClose={() => setShowTransfer(false)} />
      )}
    </>
  );
}
