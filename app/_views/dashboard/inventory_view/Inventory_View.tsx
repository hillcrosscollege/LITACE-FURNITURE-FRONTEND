"use client";

import { useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import {
  Search,
  SlidersHorizontal,
  Upload,
  SlidersHorizontal as AdjustIcon,
  Package,
  PackageCheck,
  PackageMinus,
  PackageX,
  DollarSign,
} from "lucide-react";
import App_Button from "@/components/app_ui/App_Button";
import App_Input from "@/components/app_ui/App_Input";
import App_Paginate from "@/components/app_ui/App_Paginate";
import App_Table from "@/components/app_ui/App_Table";
import App_Text from "@/components/app_ui/App_Text";
import { Skeleton_Stat_Card } from "../customers_view/customers_components/Customer_Skeleton";
import { StatCard } from "../dashboard_view/dashboard_components/Stat_Card";
import { Skeleton_Inventory_Row } from "./inventory_components/Inventory_Skeleton";
import { useInventory } from "./inventory_hooks/useInventoryQueries";
import { InventoryProduct } from "./inventory_types";
import { createInventoryColumns } from "./inventory_data/inventory_cols";
import Adjust_Stock_Modal from "./inventory_modals/Adjust_Stock_Modal";
import Export_Inventory_Modal from "./inventory_modals/Export_Inventory_Modal";
import Print_Barcode_Modal from "./inventory_modals/Print_Barcode_Modal";

type SearchForm = { search: string };

const statIcons = [Package, PackageCheck, PackageMinus, PackageX, DollarSign];
const iconStyles = [
  { iconClassName: "text-[#7048b6]", iconWrapperClassName: "bg-[#f0ebf7]" },
  { iconClassName: "text-[#2e7d52]", iconWrapperClassName: "bg-[#edf7f2]" },
  { iconClassName: "text-[#c87941]", iconWrapperClassName: "bg-[#fdf0e6]" },
  { iconClassName: "text-[#c0392b]", iconWrapperClassName: "bg-[#fdecea]" },
  { iconClassName: "text-[#3266ad]", iconWrapperClassName: "bg-[#edf2fb]" },
];

const InventoryPage = () => {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [adjustProduct, setAdjustProduct] = useState<InventoryProduct | null>(
    null,
  );
  const [deleteProduct, setDeleteProduct] = useState<InventoryProduct | null>(
    null,
  );
  const [barcodeProduct, setBarcodeProduct] = useState<InventoryProduct | null>(
    null,
  );
  const [showExport, setShowExport] = useState(false);

  const { data, isLoading, isError } = useInventory();
  const {
    register,
    formState: { errors },
  } = useForm<SearchForm>();

  const products = data?.products ?? [];
  const stats = data?.stats;

  const statCards = stats
    ? [
        {
          title: "Total Products",
          value: stats.totalProducts.toString(),
          subLabel: "All products",
        },
        {
          title: "In Stock",
          value: stats.inStock.toString(),
          subLabel: "62.7% of total",
        },
        {
          title: "Low Stock",
          value: stats.lowStock.toString(),
          subLabel: "16.2% of total",
        },
        {
          title: "Out of Stock",
          value: stats.outOfStock.toString(),
          subLabel: "21.1% of total",
        },
        {
          title: "Total Inventory Value",
          value: `R ${stats.totalInventoryValue.toLocaleString()}`,
          subLabel: "At cost price",
        },
      ]
    : [];

  const columns = useMemo(
    () =>
      createInventoryColumns(
        (p) => setAdjustProduct(p),
        (p) => setDeleteProduct(p),
        (p) => setBarcodeProduct(p),
      ),
    [],
  );

  return (
    <>
      <div className="space-y-4">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <App_Text variant="pageTitle">Inventory</App_Text>
            <App_Text variant="pageSub">
              Track and manage your stock in real time.
            </App_Text>
          </div>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
            <div className="hidden md:block">
              <App_Input
                name="search"
                register={register}
                errors={errors}
                placeholder="Search products, SKU..."
                showLabel={false}
                icon1={<Search size={14} className="text-muted-foreground" />}
                containerStyle="w-56"
              />
            </div>
            <div className="flex items-center gap-2">
              <App_Button
                text="Filters"
                icon={<SlidersHorizontal size={13} />}
                type="button"
                btnStyle="text-xs border border-[#e0dbd4] bg-white text-[#1e1a17] hover:bg-[#f5f2ee] rounded-lg px-3 py-2 h-auto"
              />
              <App_Button
                text="Export"
                icon={<Upload size={13} />}
                type="button"
                onPress={() => setShowExport(true)}
                btnStyle="text-xs border border-[#e0dbd4] bg-white text-[#1e1a17] hover:bg-[#f5f2ee] rounded-lg px-3 py-2 h-auto"
              />
              <App_Button
                text="Adjust Stock"
                icon={<AdjustIcon size={13} />}
                type="button"
                onPress={() => router.push("/dashboard/inventory/adjust")}
                btnStyle="text-xs bg-primary text-white hover:bg-primary/90 rounded-lg px-3 py-2 h-auto"
              />
            </div>
          </div>
        </div>

        {/* Mobile search */}
        <div className="md:hidden">
          <App_Input
            name="search"
            register={register}
            errors={errors}
            placeholder="Search products, SKU..."
            showLabel={false}
            icon1={<Search size={14} className="text-muted-foreground" />}
            containerStyle="w-full"
          />
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4">
          {isLoading
            ? Array.from({ length: 5 }).map((_, i) => (
                <Skeleton_Stat_Card key={i} />
              ))
            : statCards.map((stat, i) => (
                <StatCard
                  key={stat.title}
                  title={stat.title}
                  value={stat.value}
                  icon={statIcons[i]}
                  iconClassName={iconStyles[i].iconClassName}
                  iconWrapperClassName={iconStyles[i].iconWrapperClassName}
                  // subLabel={stat.subLabel}
                />
              ))}
        </div>

        {/* Table card */}
        <div className="bg-white rounded-2xl border border-[#ede8e2] shadow-sm overflow-hidden">
          {isError ? (
            <div className="flex items-center justify-center py-20">
              <App_Text variant="tableCellMuted" className="text-[#c0392b]">
                Failed to load inventory. Please try again.
              </App_Text>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                {isLoading ? (
                  <table className="w-full">
                    <tbody>
                      {Array.from({ length: 7 }).map((_, i) => (
                        <Skeleton_Inventory_Row key={i} />
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <App_Table
                    columns={columns}
                    data={products}
                    style="mt-0"
                    childRowStyle="hover:bg-[#faf9f7] cursor-pointer"
                  />
                )}
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-2 px-4 border-t border-[#ede8e2]">
                <App_Text variant="tableCellMuted" className="shrink-0">
                  {isLoading
                    ? "Loading..."
                    : `Showing 1 to ${products.length} of 142 products`}
                </App_Text>
                <App_Paginate
                  page={page}
                  setPage={setPage}
                  totalPages={21}
                  paginateStyle="mt-4 mb-4"
                />
              </div>
            </>
          )}
        </div>
      </div>

      {adjustProduct && (
        <Adjust_Stock_Modal
          product={adjustProduct}
          onClose={() => setAdjustProduct(null)}
        />
      )}
      {barcodeProduct && (
        <Print_Barcode_Modal
          product={barcodeProduct}
          onClose={() => setBarcodeProduct(null)}
        />
      )}
      {showExport && (
        <Export_Inventory_Modal onClose={() => setShowExport(false)} />
      )}
    </>
  );
};

export default InventoryPage;
