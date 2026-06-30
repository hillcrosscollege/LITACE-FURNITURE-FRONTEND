"use client";

import App_Text from "@/components/app_ui/App_Text";
import { PurchaseFrequency } from "../customer_analytics_types";

const Purchase_Frequency_Card = ({ rows }: { rows: PurchaseFrequency[] }) => (
  <div className="bg-white rounded-2xl border border-[#ede8e2] shadow-sm p-4 space-y-3">
    <App_Text variant="cardHeading">Purchase Frequency</App_Text>
    <div className="space-y-3">
      {rows.map((row) => (
        <div key={row.band}>
          <div className="flex items-center justify-between mb-1">
            <App_Text variant="tableCell" className="font-medium">
              {row.band}
            </App_Text>
            <App_Text variant="tableCellMuted">
              {row.customers} customers ({row.pctOfTotal}%)
            </App_Text>
          </div>
          <div className="h-2 rounded-full bg-[#f5f2ee] overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all"
              style={{ width: `${row.pctOfTotal}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default Purchase_Frequency_Card;
