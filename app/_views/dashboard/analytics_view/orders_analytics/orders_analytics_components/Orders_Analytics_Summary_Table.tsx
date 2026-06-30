"use client";

import App_Text from "@/components/app_ui/App_Text";
import { OrdersSummaryRow } from "../order_analytics_types";

const Orders_Analytics_Summary_Table = ({
  rows,
}: {
  rows: OrdersSummaryRow[];
}) => (
  <div className="bg-white rounded-2xl border border-[#ede8e2] shadow-sm p-4 space-y-3">
    <App_Text variant="cardHeading">Orders Summary</App_Text>
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-[#ede8e2]">
            {["Metric", "This Period", "Previous Period", "Change"].map((h) => (
              <th key={h} className="text-left py-2 px-1">
                <App_Text variant="tableHeader">{h}</App_Text>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr
              key={row.metric}
              className="border-b border-[#f5f2ee] last:border-0"
            >
              <td className="py-2.5 px-1">
                <App_Text variant="tableCell" className="font-medium">
                  {row.metric}
                </App_Text>
              </td>
              <td className="py-2.5 px-1">
                <App_Text variant="tableCell">{row.thisPeriod}</App_Text>
              </td>
              <td className="py-2.5 px-1">
                <App_Text variant="tableCellMuted">
                  {row.previousPeriod}
                </App_Text>
              </td>
              <td className="py-2.5 px-1">
                <App_Text
                  variant="tableCell"
                  className={`font-medium ${row.direction === "up" ? "text-[#2e7d52]" : "text-[#c0392b]"}`}
                >
                  {row.change}
                </App_Text>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default Orders_Analytics_Summary_Table;
