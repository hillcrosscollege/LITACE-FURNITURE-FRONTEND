"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Search,
  Upload,
  Package,
  PackageCheck,
  PackageMinus,
  PackageX,
} from "lucide-react";
import App_Button from "@/components/app_ui/App_Button";
import App_Input from "@/components/app_ui/App_Input";
import App_Paginate from "@/components/app_ui/App_Paginate";
import App_Table from "@/components/app_ui/App_Table";
import App_Text from "@/components/app_ui/App_Text";
import { StatCard } from "../dashboard_view/dashboard_components/Stat_Card";
import {
  inventoryStats,
  inventoryColumns,
  inventoryItems,
} from "./inventory_data/inventory_cols";

type SearchForm = { search: string };

const statIcons = [Package, PackageCheck, PackageMinus, PackageX];

const Inventory_View = () => {
  const [page, setPage] = useState(1);
  const {
    register,
    formState: { errors },
  } = useForm<SearchForm>();

  return (
    <div className="space-y-4">
      <div className="bg-linear-to-b from-[#1F1033] to-[#2E1246] border-white/10 p-5 rounded-2xl mb-6 grid gap-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <App_Text variant="pageTitle" className="text-white">
              Inventory
            </App_Text>
            <App_Text variant="pageSub" className="text-white">
              Track and manage your stock inventory.
            </App_Text>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
            <div className="hidden md:block">
              <App_Input
                name="search"
                register={register}
                errors={errors}
                placeholder="Search inventory..."
                showLabel={false}
                icon1={<Search size={14} className="text-muted-foreground" />}
                containerStyle="w-56"
              />
            </div>
            <div className="flex items-center gap-2">
              <App_Button
                text="Filters"
                icon={<Search size={13} />}
                btnStyle="text-xs border border-[#e0dbd4] bg-white text-[#1e1a17] hover:bg-[#f5f2ee] rounded-lg px-3 py-2 h-auto"
              />
              <App_Button
                text="Export"
                icon={<Upload size={13} />}
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
            placeholder="Search inventory..."
            showLabel={false}
            icon1={<Search size={14} className="text-muted-foreground" />}
            containerStyle="w-full"
          />
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {inventoryStats.map((stat, i) => (
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
      {/* Header */}

      {/* Table card */}
      <div className="bg-white rounded-2xl border border-[#ede8e2] shadow-sm overflow-hidden">
        {/* Table */}
        <div className="overflow-x-auto">
          <App_Table
            columns={inventoryColumns}
            data={inventoryItems}
            style="mt-0"
            childRowStyle="hover:bg-[#faf9f7]"
          />
        </div>

        {/* Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 px-4 border-t border-[#ede8e2]">
          <App_Text variant="tableCellMuted" className="shrink-0">
            Showing 1 to {inventoryItems.length} of 142 products
          </App_Text>
          <App_Paginate
            page={page}
            setPage={setPage}
            totalPages={21}
            paginateStyle="mt-4 mb-4"
          />
        </div>
      </div>
    </div>
  );
};

export default Inventory_View;
