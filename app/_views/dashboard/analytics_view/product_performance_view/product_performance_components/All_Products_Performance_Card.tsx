"use client";

import { useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { Search, SlidersHorizontal } from "lucide-react";
import App_Button from "@/components/app_ui/App_Button";
import App_Input from "@/components/app_ui/App_Input";
import App_Paginate from "@/components/app_ui/App_Paginate";
import App_Table from "@/components/app_ui/App_Table";
import App_Text from "@/components/app_ui/App_Text";
import { createAllProductsColumns } from "../product_performance_data/all-products-columns";
import { AllProductPerf } from "../product_performance_types";
import Product_Details_Modal from "../product_performance_modals/Product_Details_Modal";

const PAGE_SIZE = 5;
const tabs = ["All Products", "Top Sellers", "Low Performers"];

const All_Products_Performance_Card = ({
  products,
}: {
  products: AllProductPerf[];
}) => {
  const [activeTab, setActiveTab] = useState("All Products");
  const [page, setPage] = useState(1);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const {
    register,
    formState: { errors },
  } = useForm<{ search: string }>();

  const totalItems = products.length;
  const totalPages = Math.ceil(totalItems / PAGE_SIZE);
  const startItem = (page - 1) * PAGE_SIZE + 1;
  const endItem = Math.min(page * PAGE_SIZE, totalItems);

  const columns = useMemo(
    () => createAllProductsColumns((id) => setSelectedId(id)),
    [],
  );

  return (
    <>
      <div className="bg-white rounded-2xl border border-[#ede8e2] shadow-sm overflow-hidden">
        {/* Header row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 pb-0">
          <App_Text variant="cardHeading">All Products Performance</App_Text>
          <div className="flex items-center gap-2">
            <App_Input
              name="search"
              register={register}
              errors={errors}
              placeholder="Search products..."
              showLabel={false}
              icon1={<Search size={13} className="text-muted-foreground" />}
              containerStyle="w-44"
            />
            <App_Button
              text="Filter"
              icon={<SlidersHorizontal size={13} />}
              type="button"
              btnStyle="text-xs border border-[#e0dbd4] bg-white text-[text] hover:bg-[#f5f2ee] rounded-lg px-3 py-2 h-auto"
            />
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-1 px-4 border-b border-[#ede8e2] mt-2">
          {tabs.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => {
                setActiveTab(tab);
                setPage(1);
              }}
              className={`px-3 py-2.5 text-xs border-b-2 transition-colors ${
                activeTab === tab
                  ? "border-primary text-primary font-medium"
                  : "border-transparent text-muted-foreground hover:text-[text]"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <App_Table
            columns={columns}
            data={products}
            style="mt-0"
            childRowStyle="hover:bg-[#faf9f7]"
            // page={page}
            // pageSize={PAGE_SIZE}
          />
        </div>

        {/* Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 px-4 border-t border-[#ede8e2]">
          <App_Text variant="tableCellMuted" className="flex-shrink-0">
            Showing {startItem} to {endItem} of {totalItems} products
          </App_Text>
          <App_Paginate
            page={page}
            setPage={setPage}
            totalPages={totalPages}
            paginateStyle="mt-4 mb-4"
          />
        </div>
      </div>

      {selectedId && (
        <Product_Details_Modal
          productId={selectedId}
          onClose={() => setSelectedId(null)}
        />
      )}
    </>
  );
};

export default All_Products_Performance_Card;
