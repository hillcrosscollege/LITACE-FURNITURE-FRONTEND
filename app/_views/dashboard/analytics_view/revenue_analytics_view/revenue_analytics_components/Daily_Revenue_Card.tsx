"use client";

import App_Table from "@/components/app_ui/App_Table";
import App_Text from "@/components/app_ui/App_Text";
import { useState } from "react";
import { dailyRevenueColumns } from "../revenue_analytics_data/daily-revenue-col";
import { DailyRevenue } from "../revenue_analytics_types";
import Revenue_Detail_Modal from "../revenue_analytics_modals/Revenue_Detail_Modal";

const Daily_Revenue_Card = ({ rows }: { rows: DailyRevenue[] }) => {
  const [selectedRow, setSelectedRow] = useState<DailyRevenue | null>(null);

  return (
    <>
      <div className="bg-white rounded-2xl border border-[#ede8e2] shadow-sm p-4 space-y-2">
        <App_Text variant="cardHeading">Daily Revenue Breakdown</App_Text>
        <App_Table
          columns={dailyRevenueColumns}
          data={rows}
          style="mt-0"
          childRowStyle="hover:bg-[#faf9f7]"
          onRowClick={(row) => setSelectedRow(row)}
        />
      </div>

      {selectedRow && (
        <Revenue_Detail_Modal
          data={selectedRow}
          onClose={() => setSelectedRow(null)}
        />
      )}
    </>
  );
};

export default Daily_Revenue_Card;
