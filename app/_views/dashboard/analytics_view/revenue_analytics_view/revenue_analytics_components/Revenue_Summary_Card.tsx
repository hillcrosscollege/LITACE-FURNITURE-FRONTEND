"use client";

import App_Table from "@/components/app_ui/App_Table";
import App_Text from "@/components/app_ui/App_Text";
import { revenueSummaryColumns } from "../revenue_analytics_data/revenue_summary_col";
import { RevenueSummaryRow } from "../revenue_analytics_types";

const Revenue_Summary_Card = ({ rows }: { rows: RevenueSummaryRow[] }) => (
  <div className="bg-white rounded-2xl border border-[#ede8e2] shadow-sm p-4 space-y-2">
    <App_Text variant="cardHeading">Revenue Summary</App_Text>
    <App_Table
      columns={revenueSummaryColumns}
      data={rows}
      style="mt-0"
      childRowStyle=""
    />
  </div>
);

export default Revenue_Summary_Card;
