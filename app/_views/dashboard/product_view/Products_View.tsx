// app/products/page.tsx
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Upload, SlidersHorizontal, Plus, Search } from "lucide-react";
import App_Text from "@/components/app_ui/App_Text";
import App_Input from "@/components/app_ui/App_Input";
import App_Button from "@/components/app_ui/App_Button";
import App_Table from "@/components/app_ui/App_Table";
import App_Paginate from "@/components/app_ui/App_Paginate";
import { products, productTabs } from "./products_data/product_types";
import { productColumns } from "./products_data/products_table_col";

type SearchForm = { search: string };

const Products_View = () => {
  const [activeTab, setActiveTab] = useState("All Products");
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
          <App_Text variant="pageTitle">Products</App_Text>
          <App_Text variant="pageSub">
            Manage and organize all furniture products in your store.
          </App_Text>
        </div>

        {/* Search — hidden on mobile */}
        <div className="hidden md:flex flex-1 max-w-xs mx-4">
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

        <div className="flex items-center gap-2 shrink-0">
          <App_Button
            text="Export"
            icon={<Upload size={13} />}
            btnStyle="text-xs border border-[#e0dbd4] bg-white text-[#1e1a17] hover:bg-[#f5f2ee] rounded-lg px-3 py-2 h-auto"
          />
          <App_Button
            text="Filters"
            icon={<SlidersHorizontal size={13} />}
            btnStyle="text-xs border border-[#e0dbd4] bg-white text-[#1e1a17] hover:bg-[#f5f2ee] rounded-lg px-3 py-2 h-auto"
          />
          <App_Button
            text="Add Product"
            icon={<Plus size={13} />}
            btnStyle="text-xs bg-[#a0522d] text-white hover:bg-[#8b4513] rounded-lg px-3 py-2 h-auto"
          />
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

      {/* Card wrapper */}
      <div className="bg-white rounded-2xl border border-[#ede8e2] shadow-sm overflow-hidden">
        {/* Tabs */}
        <div className="flex items-center border-b border-[#ede8e2] overflow-x-auto scrollbar-none px-4">
          {productTabs.map((tab) => (
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
            columns={productColumns}
            data={products}
            style="mt-0"
            childRowStyle="hover:bg-[#faf9f7]"
          />
        </div>

        {/* Pagination */}
        <div className="border-t border-[#ede8e2] px-4">
          <App_Paginate
            page={page}
            setPage={setPage}
            totalPages={10}
            paginateStyle="mt-4 mb-4"
          />
        </div>
      </div>
    </div>
  );
};

export default Products_View;
