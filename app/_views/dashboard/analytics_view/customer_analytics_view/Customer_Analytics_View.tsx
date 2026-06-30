"use client";

import App_Text from "@/components/app_ui/App_Text";
import { useState } from "react";
import Analytics_Header from "../analytics_components/Analytics_Header";
import {
  DateRangeValue,
  defaultDateRange,
} from "../overview_view/overview_data/overview_data";
import Product_Filters_Modal from "../product_performance_view/product_performance_modals/Product_Filters_Modal";
import Customer_Growth_Chart from "./customer_analytics_components/Customer_Growth_Chart";
import Customer_Insights_Card from "./customer_analytics_components/Customer_Insights_Card";
import Customer_Segments_Card from "./customer_analytics_components/Customer_Segments_Card";
import Customer_Stat_Cards from "./customer_analytics_components/Customer_Stat_Cards";
import Purchase_Frequency_Card from "./customer_analytics_components/Purchase_Frequency_Card";
import Top_Customers_Card from "./customer_analytics_components/Top_Customers_Card";
import { useExportCustomerReport } from "./customer_analytics_hooks/useCustomerAnalyticsMutation";
import { useCustomerAnalytics } from "./customer_analytics_hooks/useCustomerAnalyticsQueries";
import App_Loader from "@/components/app_ui/App_Loader";

const exportOptions = [
  { id: "summary", label: "Summary" },
  { id: "growth", label: "Customer Growth" },
  { id: "top", label: "Top Customers" },
  { id: "segments", label: "Customer Segments" },
  { id: "frequency", label: "Purchase Frequency" },
];

const Customer_Analytics_View = () => {
  const [dateRange, setDateRange] = useState<DateRangeValue>(defaultDateRange);
  const [showFilters, setShowFilters] = useState(false);

  const { data, isLoading, isError } = useCustomerAnalytics();
  const { mutate: exportReport, isPending: isExporting } =
    useExportCustomerReport();

  if (isError)
    return (
      <div className="p-6 flex items-center justify-center">
        <App_Text variant="tableCellMuted" className="text-[#c0392b]">
          Failed to load customer analytics. Please try again.
        </App_Text>
      </div>
    );

  return (
    <div className="">
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Main content */}
        <div className="flex-1 min-w-0 space-y-4">
          <Analytics_Header
            breadcrumbs={["Sales & Analytics", "Customer Analytics"]}
            title="Customer Analytics"
            subtitle="Understand customer behavior and retention."
            dateRange={dateRange}
            onDateChange={setDateRange}
            reportType="Customer Analytics"
            exportOptions={exportOptions}
            onExport={(format, includes) => exportReport({ format, includes })}
            isExporting={isExporting}
            onFiltersClick={() => setShowFilters(true)}
          />

          {isLoading || !data ? (
            <App_Loader label="Loading customer analytics..." />
          ) : (
            <>
              <Customer_Stat_Cards stats={data.stats} />
              <div className="flex gap-6">
                <div className="flex-1">
                  <Customer_Growth_Chart data={data.growthTrend} />
                </div>
                <Customer_Insights_Card insights={data.insights} />
              </div>
              <Top_Customers_Card customers={data.topCustomers} />

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <Customer_Segments_Card segments={data.segments} />
                <Purchase_Frequency_Card rows={data.purchaseFrequency} />
              </div>
            </>
          )}
        </div>

        {/* Sidebar */}
        {/* <div className="w-full lg:w-72 flex-shrink-0 space-y-4">
          {isLoading || !data ? (
            <App_Loader label="Loading sidebar..." />
          ) : (
            <>
              <Customer_Insights_Card insights={data.insights} />
              <Customer_Quick_Actions_Card />
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

export default Customer_Analytics_View;
