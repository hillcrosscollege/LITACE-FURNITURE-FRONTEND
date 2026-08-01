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
  // products,
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
import App_Double_Text from "@/components/shared/App_Double_Text";
import Product_Header from "./products_view_components/Product_Header";
import { useProductContext } from "@/app/contexts/admin/Product_Context";
import useTable from "@/app/_hooks/useTable";

type SearchForm = { search: string };

const ProductsPage = () => {
  // const [activeTab, setActiveTab] = useState("All Products");
  // const [page, setPage] = useState(1);
  // const [rowSelection, setRowSelection] = useState({});
  // const {
  //   register,
  //   formState: { errors },
  // } = useForm<SearchForm>();

  // const selectedCount = Object.keys(rowSelection).length;
  const PAGE_SIZE = 5;
  const {
    activeTab,
    setActiveTab,
    page,
    setPage,
    setRowSelection,
    selectedCount,
    register,
    errors,
    data,
    isLoading,
    isError,
  } = useProductContext();

  const { tableData, totalPages, startItem, endItem, totalItems } = useTable({
    data: data?.data,
    page,
    PAGE_SIZE,
  });

  console.log(tableData, data);

  return (
    <div className="space-y-4">
      {/* Header */}
      <Product_Header register={register} errors={errors} />

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
                    : "hover:text-[text]"
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
                btnStyle="text-xs border border-[#e0dbd4] bg-white text-[text] hover:bg-[#f5f2ee] rounded-lg px-3 py-1.5 h-auto"
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
        {/* <div className="overflow-x-auto"> */}
        {tableData && (
          <App_Table
            columns={productColumns}
            data={tableData!}
            style="mt-0"
            childRowStyle="hover:bg-[#faf9f7] cursor-pointer"
          />
        )}
        {/* </div> */}

        {/* Footer */}
        {!isLoading && !isError && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 px-4 border-t border-[#ede8e2]">
            <App_Text variant="tableCellMuted" className="shrink-0">
              Showing {startItem + 1} to {endItem} of {totalItems} categories
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
  );
};

export default ProductsPage;
