"use client";

import App_Text from "@/components/app_ui/App_Text";
import { useState } from "react";
import Analytics_Header from "../analytics_components/Analytics_Header";
import {
  DateRangeValue,
  defaultDateRange,
} from "../overview_view/overview_data/overview_data";
import Daily_Revenue_Card from "./revenue_analytics_components/Daily_Revenue_Card";
import Revenue_Comparison_Card from "./revenue_analytics_components/Revenue_Comparison_Card";
import Revenue_Stat_Cards from "./revenue_analytics_components/Revenue_Stat_Cards";
import Revenue_Summary_Card from "./revenue_analytics_components/Revenue_Summary_Card";
import Top_Revenue_Products_Card from "./revenue_analytics_components/Top_Revenue_Products_Card";
import { useExportRevenueReport } from "./revenue_analytics_hooks/useRevenueMutation";
import { useRevenueAnalytics } from "./revenue_analytics_hooks/useRevenueQueries";
import Filters_Modal from "./revenue_analytics_modals/Filters_Modal";
import App_Loader from "@/components/app_ui/App_Loader";

const exportOptions = [
  { id: "summary", label: "Revenue Summary" },
  { id: "bySource", label: "Revenue by Source" },
  { id: "daily", label: "Daily Revenue Breakdown" },
  { id: "topProducts", label: "Top Revenue Products" },
  { id: "comparison", label: "Revenue Comparison" },
];

const Revenue_Analytics_View = () => {
  const [dateRange, setDateRange] = useState<DateRangeValue>(defaultDateRange);
  const [showFilters, setShowFilters] = useState(false);

  const { data, isLoading, isError } = useRevenueAnalytics();
  const { mutate: exportReport, isPending: isExporting } =
    useExportRevenueReport();

  if (isError)
    return (
      <div className="p-6 flex items-center justify-center">
        <App_Text variant="tableCellMuted" className="text-[#c0392b]">
          Failed to load revenue analytics. Please try again.
        </App_Text>
      </div>
    );

  return (
    <div className="">
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1 min-w-0 space-y-4">
          <Analytics_Header
            breadcrumbs={["Sales & Analytics", "Revenue Analytics"]}
            title="Revenue Analytics"
            subtitle="Track and analyze your revenue performance."
            dateRange={dateRange}
            onDateChange={setDateRange}
            reportType="Revenue Analytics"
            exportOptions={exportOptions}
            onExport={(format, includes) => exportReport({ format, includes })}
            isExporting={isExporting}
            onFiltersClick={() => setShowFilters(true)}
          />

          {isLoading || !data ? (
            <App_Loader label="Loading revenue analytics..." />
          ) : (
            <>
              <Revenue_Stat_Cards stats={data.stats} />

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <Revenue_Summary_Card rows={data.summary} />
                <Revenue_Comparison_Card comparison={data.comparison} />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <Daily_Revenue_Card rows={data.dailyRevenue} />
                <Top_Revenue_Products_Card products={data.topProducts} />
              </div>
            </>
          )}
        </div>

        {/* <div className="w-full lg:w-72 flex-shrink-0">
          {isLoading || !data ? (
            <App_Loader label="Loading insights..." />
          ) : (
            <Insights_Sidebar insights={data.insights} />
          )}
        </div> */}
      </div>

      {showFilters && (
        <Filters_Modal
          onClose={() => setShowFilters(false)}
          onApply={(f) => console.log("Filters applied:", f)}
        />
      )}
    </div>
  );
};

export default Revenue_Analytics_View;
