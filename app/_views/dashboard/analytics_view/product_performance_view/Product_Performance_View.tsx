"use client";

import App_Text from "@/components/app_ui/App_Text";
import { useState } from "react";
import Analytics_Header from "../analytics_components/Analytics_Header";
import {
  DateRangeValue,
  defaultDateRange,
} from "../overview_view/overview_data/overview_data";
import All_Products_Performance_Card from "./product_performance_components/All_Products_Performance_Card";
import Category_Performance_Card from "./product_performance_components/Category_Performance_Card";
import Low_Performing_Card from "./product_performance_components/Low_Performing_Card";
import Product_Insights_Card from "./product_performance_components/Product_Insights_Card";
import Product_Stat_Cards from "./product_performance_components/Product_Stat_Cards";
import Quick_Actions_Card from "./product_performance_components/Quick_Actions_Card";
import Top_Performing_Card from "./product_performance_components/Top_Performing_Card";
import { useExportProductPerfReport } from "./product_performance_hooks/useProductPerformanceMutation";
import { useProductPerformance } from "./product_performance_hooks/useProductPerformanceQueries";
import Product_Filters_Modal from "./product_performance_modals/Product_Filters_Modal";
import App_Loader from "@/components/app_ui/App_Loader";

const exportOptions = [
  { id: "summary", label: "Summary" },
  { id: "topProducts", label: "Top Performing Products" },
  { id: "lowProducts", label: "Low Performing Products" },
  { id: "category", label: "Category Performance" },
  { id: "details", label: "Product Details" },
];

const Product_Performance_View = () => {
  const [dateRange, setDateRange] = useState<DateRangeValue>(defaultDateRange);
  const [showFilters, setShowFilters] = useState(false);

  const { data, isLoading, isError } = useProductPerformance();
  const { mutate: exportReport, isPending: isExporting } =
    useExportProductPerfReport();

  if (isError)
    return (
      <div className="p-6 flex items-center justify-center">
        <App_Text variant="tableCellMuted" className="text-[#c0392b]">
          Failed to load product performance. Please try again.
        </App_Text>
      </div>
    );

  return (
    <div className="">
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Main content */}
        <div className="flex-1 min-w-0 space-y-4">
          <Analytics_Header
            breadcrumbs={["Sales & Analytics", "Product Performance"]}
            title="Product Performance"
            subtitle="Analyze product sales and identify top performers."
            dateRange={dateRange}
            onDateChange={setDateRange}
            reportType="Product Performance"
            exportOptions={exportOptions}
            onExport={(format, includes) => exportReport({ format, includes })}
            isExporting={isExporting}
            onFiltersClick={() => setShowFilters(true)}
          />

          {isLoading || !data ? (
            <App_Loader label="Loading product performance..." />
          ) : (
            <>
              <Product_Stat_Cards stats={data.stats} />

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <Top_Performing_Card products={data.topPerforming} />
                <Low_Performing_Card products={data.lowPerforming} />
              </div>

              <All_Products_Performance_Card products={data.allProducts} />
            </>
          )}
        </div>

        {/* Sidebar */}
        {/* <div className="w-full lg:w-72 flex-shrink-0 space-y-4">
          {isLoading || !data ? (
            <App_Loader label="Loading sidebar..." />
          ) : (
            <>
              <Category_Performance_Card categories={data.categoryPerf} />
              <Product_Insights_Card insights={data.insights} />
              <Quick_Actions_Card />
            </>
          )}
        </div> */}
      </div>

      {showFilters && (
        <Product_Filters_Modal
          onClose={() => setShowFilters(false)}
          onApply={(f) => console.log("Filters applied:", f)}
        />
      )}
    </div>
  );
};

export default Product_Performance_View;
