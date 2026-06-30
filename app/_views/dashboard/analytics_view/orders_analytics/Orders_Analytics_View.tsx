"use client";

import App_Text from "@/components/app_ui/App_Text";
import { useState } from "react";
import Analytics_Header from "../analytics_components/Analytics_Header";
import {
  DateRangeValue,
  defaultDateRange,
} from "../overview_view/overview_data/overview_data";
import Cancellation_Analysis_Table from "./orders_analytics_components/Cancellation_Analysis_Table";
import Recent_Orders_Table from "./orders_analytics_components/Recent_Orders_Table";
import { useExportOrdersReport } from "./orders_analytics_hooks/useOrdersAnalyticsMutations";
import { useOrdersAnalytics } from "./orders_analytics_hooks/useOrdersAnalyticsQueries";
import Orders_Analytics_Summary_Table from "./orders_analytics_components/Orders_Analytics_Summary_Table";
import Orders_Analytics_Stat_Cards from "./orders_analytics_components/Orders_Analytics_Stat_Cards";
import App_Loader from "@/components/app_ui/App_Loader";

const exportOptions = [
  { id: "summary", label: "Summary" },
  { id: "ordersSummary", label: "Orders Summary" },
  { id: "topCities", label: "Top Cities" },
  { id: "cancellations", label: "Cancellation Analysis" },
  { id: "recentOrders", label: "Recent Orders" },
];

const Orders_Analytics_View = () => {
  const [dateRange, setDateRange] = useState<DateRangeValue>(defaultDateRange);

  const { data, isLoading, isError } = useOrdersAnalytics();
  const { mutate: exportReport, isPending: isExporting } =
    useExportOrdersReport();

  if (isError)
    return (
      <div className="p-6 flex items-center justify-center">
        <App_Text variant="tableCellMuted" className="text-[#c0392b]">
          Failed to load orders analytics. Please try again.
        </App_Text>
      </div>
    );

  return (
    <div className="p-4 md:p-6 space-y-4">
      <Analytics_Header
        breadcrumbs={["Sales & Analytics", "Orders Analytics"]}
        title="Orders Analytics"
        subtitle="Analyze your store orders and performance."
        dateRange={dateRange}
        onDateChange={setDateRange}
        reportType="Orders Analytics"
        exportOptions={exportOptions}
        onExport={(format, includes) => exportReport({ format, includes })}
        isExporting={isExporting}
      />

      {isLoading || !data ? (
        <App_Loader label="Loading orders analytics..." />
      ) : (
        <>
          <Orders_Analytics_Stat_Cards stats={data.stats} />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Orders_Analytics_Summary_Table rows={data.summary} />
            {/* <Top_Cities_Table cities={data.topCities} /> */}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Cancellation_Analysis_Table reasons={data.cancellationReasons} />
            <Recent_Orders_Table orders={data.recentOrders} />
          </div>
        </>
      )}
    </div>
  );
};

export default Orders_Analytics_View;
