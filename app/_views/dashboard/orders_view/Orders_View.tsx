// app/orders/page.tsx
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Search, SlidersHorizontal, Upload } from "lucide-react";
import App_Text from "@/components/app_ui/App_Text";
import App_Input from "@/components/app_ui/App_Input";
import App_Button from "@/components/app_ui/App_Button";
import { orderColumns, orders, orderTabs } from "./orders_view_data/orders_col";
import App_Table from "@/components/app_ui/App_Table";
import App_Paginate from "@/components/app_ui/App_Paginate";

type SearchForm = { search: string };

const Orders_View = () => {
  const [activeTab, setActiveTab] = useState("All Orders");
  const [page, setPage] = useState(1);
  const {
    register,
    formState: { errors },
  } = useForm<SearchForm>();

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <App_Text variant="pageTitle">Orders</App_Text>
          <App_Text variant="pageSub">
            View and manage customer orders and their status.
          </App_Text>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
          {/* Search — hidden on mobile */}
          <div className="hidden md:block">
            <App_Input
              name="search"
              register={register}
              errors={errors}
              placeholder="Search orders..."
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
              text="Export"
              icon={<Upload size={13} />}
              btnStyle="text-xs border border-[#e0dbd4] bg-white text-[#1e1a17] hover:bg-[#f5f2ee] rounded-lg px-3 py-2 h-auto"
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
          placeholder="Search orders..."
          showLabel={false}
          icon1={<Search size={14} className="text-muted-foreground" />}
          containerStyle="w-full"
        />
      </div>

      {/* Card wrapper */}
      <div className="bg-white rounded-2xl border border-[#ede8e2] shadow-sm overflow-hidden">
        {/* Tabs */}
        <div className="flex items-center border-b border-[#ede8e2] overflow-x-auto scrollbar-none px-4">
          {orderTabs.map((tab) => (
            <button
              key={tab.label}
              onClick={() => setActiveTab(tab.label)}
              className={`flex items-center gap-1.5 px-3 py-3.5 whitespace-nowrap border-b-2 transition-colors ${
                activeTab === tab.label
                  ? "border-[#a0522d]"
                  : "border-transparent"
              }`}
            >
              <App_Text
                variant="sectionLabel"
                className={
                  activeTab === tab.label
                    ? "text-[#a0522d] font-medium"
                    : "hover:text-[#1e1a17]"
                }
              >
                {tab.label}
              </App_Text>
              <span
                className={`px-1.5 py-0.5 rounded text-[10px] ${
                  activeTab === tab.label
                    ? "bg-[#fdf0e6] text-[#a0522d]"
                    : "bg-[#f5f2ee] text-muted-foreground"
                }`}
              >
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <App_Table
            columns={orderColumns}
            data={orders}
            style="mt-0"
            childRowStyle="hover:bg-[#faf9f7]"
          />
        </div>

        {/* Pagination */}
        <div className="border-t border-[#ede8e2] px-4">
          <App_Paginate
            page={page}
            setPage={setPage}
            totalPages={13}
            paginateStyle="mt-4 mb-4"
          />
        </div>
      </div>
    </div>
  );
};

export default Orders_View;
