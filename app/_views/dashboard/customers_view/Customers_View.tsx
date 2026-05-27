// app/dashboard/customers/page.tsx
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Search,
  SlidersHorizontal,
  Plus,
  Users,
  UserCheck,
  UserPlus,
  RefreshCw,
} from "lucide-react";
import App_Text from "@/components/app_ui/App_Text";
import App_Input from "@/components/app_ui/App_Input";
import App_Button from "@/components/app_ui/App_Button";
import {
  customerColumns,
  customers,
  customerStats,
} from "./cusomer_data/customer_col";
import { StatCard } from "../dashboard_view/dashboard_components/Stat_Card";
import App_Table from "@/components/app_ui/App_Table";
import App_Paginate from "@/components/app_ui/App_Paginate";

type SearchForm = { search: string };

const statIcons = [Users, UserCheck, UserPlus, RefreshCw];

const Customers_View = () => {
  const [page, setPage] = useState(1);
  const {
    register,
    formState: { errors },
  } = useForm<SearchForm>();

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="bg-linear-to-b from-[#1F1033] to-[#2E1246] border-white/10 p-5 rounded-2xl mb-6 grid gap-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <App_Text variant="pageTitle" className="text-white">
              Customers
            </App_Text>
            <App_Text variant="pageSub" className="text-white">
              Manage your customers and their information.
            </App_Text>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
            {/* Search — hidden on mobile */}
            <div className="hidden md:block">
              <App_Input
                name="search"
                register={register}
                errors={errors}
                placeholder="Search customers..."
                showLabel={false}
                icon1={<Search size={14} className="text-muted-foreground" />}
                containerStyle="w-56"
              />
            </div>
            <App_Button
              text="Add Customer"
              icon={<Plus size={13} />}
              btnStyle="text-xs bg-primary text-white hover:bg-primary/90 rounded-lg px-3 py-2 h-auto"
            />
          </div>
        </div>

        {/* Mobile search */}
        <div className="md:hidden">
          <App_Input
            name="search"
            register={register}
            errors={errors}
            placeholder="Search customers..."
            showLabel={false}
            icon1={<Search size={14} className="text-muted-foreground" />}
            containerStyle="w-full"
          />
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {customerStats.map((stat, i) => (
            <StatCard
              key={stat.title}
              title={stat.title}
              value={stat.value}
              icon={statIcons[i]}
              iconClassName={stat.iconClassName}
              iconWrapperClassName={stat.iconWrapperClassName}
              change={stat.change}
              changeDirection={stat.changeDirection}
              changeLabel={stat.changeLabel}
            />
          ))}
        </div>
      </div>

      {/* Table card */}
      <div className="bg-white rounded-2xl border border-[#ede8e2] shadow-sm overflow-hidden">
        {/* Search + filter bar */}
        <div className="flex items-center justify-between gap-3 p-4 border-b border-[#ede8e2]">
          <div className="flex-1 max-w-sm">
            <App_Input
              name="search"
              register={register}
              errors={errors}
              placeholder="Search by name, email or phone..."
              showLabel={false}
              icon1={<Search size={14} className="text-muted-foreground" />}
              containerStyle="w-full"
            />
          </div>
          <App_Button
            text="Filters"
            icon={<SlidersHorizontal size={13} />}
            btnStyle="text-xs border border-[#e0dbd4] bg-white text-[#1e1a17] hover:bg-[#f5f2ee] rounded-lg px-3 py-2 h-auto flex-shrink-0"
          />
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <App_Table
            columns={customerColumns}
            data={customers}
            style="mt-0"
            childRowStyle="hover:bg-[#faf9f7]"
          />
        </div>

        {/* Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 px-4 border-t border-[#ede8e2]">
          <App_Text variant="tableCellMuted" className="shrink-0">
            Showing 1 to {customers.length} of 1,248 customers
          </App_Text>
          <App_Paginate
            page={page}
            setPage={setPage}
            totalPages={208}
            paginateStyle="mt-4 mb-4"
          />
        </div>
      </div>
    </div>
  );
};

export default Customers_View;
