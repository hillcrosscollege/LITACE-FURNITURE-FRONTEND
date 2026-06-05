// app/dashboard/products/page.tsx
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Upload,
  SlidersHorizontal,
  Plus,
  Search,
  Package,
  PackageCheck,
  PackageMinus,
  PackageX,
  DollarSign,
} from "lucide-react";
import {
  products,
  productTabs,
  productListStats,
} from "./products_data/product_types";
import { productColumns } from "./products_data/products_table_col";
import { useRouter } from "next/navigation";
import App_Text from "@/components/app_ui/App_Text";
import App_Input from "@/components/app_ui/App_Input";
import App_Button from "@/components/app_ui/App_Button";
import { StatCard } from "../dashboard_view/dashboard_components/Stat_Card";
import App_Table from "@/components/app_ui/App_Table";
import App_Paginate from "@/components/app_ui/App_Paginate";

type SearchForm = { search: string };

const statIcons = [Package, PackageCheck, PackageMinus, PackageX, DollarSign];

const ProductsPage = () => {
  const [activeTab, setActiveTab] = useState("All Products");
  const [page, setPage] = useState(1);
  const [rowSelection, setRowSelection] = useState({});
  const router = useRouter();
  const {
    register,
    formState: { errors },
  } = useForm<SearchForm>();

  const selectedCount = Object.keys(rowSelection).length;

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="bg-linear-to-b from-[#1F1033] to-[#2E1246] border-white/10 p-5 rounded-2xl mb-6 grid gap-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <App_Text variant="pageTitle" className="text-white">
              Products
            </App_Text>
            <App_Text variant="pageSub" className="text-white">
              Manage your store products, stock and pricing.
            </App_Text>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
            <div className="hidden md:block">
              <App_Input
                name="search"
                register={register}
                errors={errors}
                placeholder="Search products..."
                showLabel={false}
                icon1={<Search size={14} className="text-muted-foreground" />}
                containerStyle="w-56"
              />
            </div>
            <div className="flex items-center gap-2">
              <App_Button
                text="Filters"
                icon={<SlidersHorizontal size={13} />}
                btnStyle="text-xs border border-[#e0dbd4] bg-white text-[#1e1a17] hover:bg-[#f5f2ee] rounded-lg px-3 py-2 h-auto"
              />
              <App_Button
                text="Add Product"
                icon={<Plus size={13} />}
                btnStyle="text-xs bg-primary text-white hover:bg-primary/90 rounded-lg px-3 py-2 h-auto"
                onPress={() => router.push("/dashboard/products/add")}
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
            placeholder="Search products..."
            showLabel={false}
            icon1={<Search size={14} className="text-muted-foreground" />}
            containerStyle="w-full"
          />
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4">
          {productListStats.map((stat, i) => (
            <StatCard
              key={stat.title}
              title={stat.title}
              value={stat.value}
              icon={statIcons[i]}
              iconClassName={stat.iconClassName}
              iconWrapperClassName={stat.iconWrapperClassName}
              // subLabel={stat.subLabel}
            />
          ))}
        </div>
      </div>

      {/* Table card */}
      <div className="bg-white rounded-2xl border border-[#ede8e2] shadow-sm overflow-hidden">
        {/* Tabs */}
        <div className="flex items-center border-b border-[#ede8e2] overflow-x-auto scrollbar-none px-4">
          {productTabs.map((tab) => (
            <button
              key={tab.label}
              type="button"
              onClick={() => setActiveTab(tab.label)}
              className={`flex items-center gap-1.5 px-3 py-3.5 whitespace-nowrap border-b-2 transition-colors ${
                activeTab === tab.label
                  ? "border-primary"
                  : "border-transparent"
              }`}
            >
              <App_Text
                variant="sectionLabel"
                className={
                  activeTab === tab.label
                    ? "text-primary font-medium"
                    : "hover:text-[#1e1a17]"
                }
              >
                {tab.label}
              </App_Text>
              <span
                className={`px-1.5 py-0.5 rounded text-[10px] ${
                  activeTab === tab.label
                    ? "bg-primary/10 text-primary"
                    : "bg-[#f5f2ee] text-muted-foreground"
                }`}
              >
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Bulk actions bar */}
        {selectedCount > 0 && (
          <div className="flex items-center gap-3 px-4 py-2.5 bg-primary/5 border-b border-primary/10">
            <App_Text
              variant="sectionLabel"
              className="text-primary font-medium"
            >
              {selectedCount} selected
            </App_Text>
            <div className="flex items-center gap-2 ml-auto">
              <App_Button
                text="Export Selected"
                icon={<Upload size={12} />}
                btnStyle="text-xs border border-[#e0dbd4] bg-white text-[#1e1a17] hover:bg-[#f5f2ee] rounded-lg px-3 py-1.5 h-auto"
              />
              <App_Button
                text="Delete Selected"
                icon={<Package size={12} />}
                btnStyle="text-xs bg-[#fdecea] text-[#c0392b] hover:bg-[#fad4d4] rounded-lg px-3 py-1.5 h-auto border-0"
              />
            </div>
          </div>
        )}

        {/* Table */}
        <div className="overflow-x-auto">
          <App_Table
            columns={productColumns}
            data={products}
            style="mt-0"
            childRowStyle="hover:bg-[#faf9f7] cursor-pointer"
          />
        </div>

        {/* Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 px-4 border-t border-[#ede8e2]">
          <App_Text variant="tableCellMuted" className="shrink-0">
            Showing 1 to {products.length} of 142 products
          </App_Text>
          <App_Paginate
            page={page}
            setPage={setPage}
            totalPages={24}
            paginateStyle="mt-4 mb-4"
          />
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
