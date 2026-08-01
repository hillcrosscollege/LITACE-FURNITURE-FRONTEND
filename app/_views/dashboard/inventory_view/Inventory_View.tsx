"use client";

import { useRouter } from "next/navigation";
import { Search, SlidersHorizontal, Download, RotateCcw } from "lucide-react";
import App_Text from "@/components/app_ui/App_Text";
import App_Button from "@/components/app_ui/App_Button";
import App_Input from "@/components/app_ui/App_Input";
import App_Table from "@/components/app_ui/App_Table";
import App_Paginate from "@/components/app_ui/App_Paginate";
import { StatCard } from "../dashboard_view/dashboard_components/Stat_Card";
import {
  Skeleton_Inv_Stat,
  Skeleton_Inv_Row,
} from "./inventory_components/Inventory_Skeleton";
import useInventory from "./inventory_hooks/useInventory";
import Adjust_Stock_Modal from "./inventory_modals/Adjust_Stock_Modal";
import Export_Modal from "./inventory_modals/Export_Modal";
import Filters_Modal from "./inventory_modals/Filters_Modal";
import Restock_Modal from "./inventory_modals/Restock_Modal";
import Transfer_Stock_Modal from "./inventory_modals/Transfer_Stock_Modal";
import { statIcons, iconStyles } from "./inventory_data/inventory_data";
import App_Tabs from "@/components/app_ui/App_Tabs";
import { useInventoryContext } from "@/app/contexts/admin/Inventory_Context";

export default function InventoryPage() {
  const router = useRouter();

  const {
    page,
    setPage,
    activeFilter,
    setActiveFilter,
    adjustProduct,
    setAdjustProduct,
    restockProduct,
    setRestockProduct,
    transferProduct,
    setTransferProduct,
    showFilters,
    setShowFilters,
    showExport,
    setShowExport,
    isLoading,
    isError,
    register,
    errors,
    products,
    totalPages,
    startItem,
    endItem,
    columns,
    statCards,
    filtered,
  } = useInventoryContext();

  if (isError)
    return (
      <div className="p-6 flex items-center justify-center">
        <App_Text variant="tableCellMuted" className="text-[#c0392b]">
          Failed to load inventory. Please try again.
        </App_Text>
      </div>
    );

  return (
    <>
      <div className="space-y-4">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <App_Text variant="pageTitle">Inventory Overview</App_Text>
            <App_Text variant="pageSub">
              Track your stock levels and manage inventory.
            </App_Text>
          </div>
          <div className="flex items-center gap-2">
            <App_Button
              text="Filters"
              icon={<SlidersHorizontal size={13} />}
              type="button"
              onPress={() => setShowFilters(true)}
              btnStyle="text-xs border border-[#e0dbd4] bg-white text-[#1e1a17] hover:bg-[#f5f2ee] rounded-lg px-3 py-2 h-auto"
            />
            <App_Button
              text="Export"
              icon={<Download size={13} />}
              type="button"
              onPress={() => setShowExport(true)}
              btnStyle="text-xs border border-[#e0dbd4] bg-white text-[#1e1a17] hover:bg-[#f5f2ee] rounded-lg px-3 py-2 h-auto"
            />
            <App_Button
              text="Restock Inventory"
              icon={<RotateCcw size={13} />}
              type="button"
              onPress={() => router.push("/dashboard/inventory/low-stock")}
              btnStyle="text-xs bg-primary text-white hover:bg-primary/90 rounded-lg px-3 py-2 h-auto"
            />
          </div>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
          {isLoading
            ? Array.from({ length: 6 }).map((_, i) => (
                <Skeleton_Inv_Stat key={i} />
              ))
            : statCards.map((stat, i) => (
                <StatCard
                  key={stat.title}
                  {...stat}
                  icon={statIcons[i]}
                  iconClassName={iconStyles[i].iconClassName}
                  iconWrapperClassName={iconStyles[i].iconWrapperClassName}
                />
              ))}
        </div>

        {/* Table card */}
        <div className="bg-white rounded-2xl border border-[#ede8e2] shadow-sm overflow-hidden">
          <App_Tabs
            activeTab={activeFilter}
            setActiveTab={setActiveFilter}
            detailTabs={[
              { key: "all", label: "All Products", count: products.length },
              {
                key: "low",
                label: "Low Stock",
                count: products.filter((p) => p.status === "Low Stock").length,
              },
              {
                key: "out",
                label: "Out of Stock",
                count: products.filter((p) => p.status === "Out of Stock")
                  .length,
              },
            ]}
          />

          {/* Search */}
          <div className="px-4 py-3">
            <App_Input
              name="search"
              register={register}
              errors={errors}
              placeholder="Search products..."
              showLabel={false}
              icon1={<Search size={13} className="text-muted-foreground" />}
              containerStyle="w-full max-w-sm"
            />
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            {isLoading ? (
              <table className="w-full">
                <tbody>
                  {Array.from({ length: 7 }).map((_, i) => (
                    <Skeleton_Inv_Row key={i} />
                  ))}
                </tbody>
              </table>
            ) : (
              <App_Table
                columns={columns}
                data={filtered}
                style="mt-0"
                childRowStyle="hover:bg-[#faf9f7] cursor-pointer"
              />
            )}
          </div>

          {/* Footer */}
          {!isLoading && (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-2 px-4 border-t border-[#ede8e2]">
              <App_Text variant="tableCellMuted" className="shrink-0">
                Showing {startItem} to {endItem} of {filtered.length} products
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

      {adjustProduct && (
        <Adjust_Stock_Modal
          product={adjustProduct}
          onClose={() => setAdjustProduct(null)}
        />
      )}
      {restockProduct && (
        <Restock_Modal
          product={restockProduct}
          onClose={() => setRestockProduct(null)}
        />
      )}
      {transferProduct && (
        <Transfer_Stock_Modal
          product={transferProduct}
          onClose={() => setTransferProduct(null)}
        />
      )}
      {showFilters && (
        <Filters_Modal
          onClose={() => setShowFilters(false)}
          onApply={(f) => console.log("Filters:", f)}
        />
      )}
      {showExport && <Export_Modal onClose={() => setShowExport(false)} />}
    </>
  );
}
