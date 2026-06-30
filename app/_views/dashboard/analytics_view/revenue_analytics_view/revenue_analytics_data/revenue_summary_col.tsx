"use client";

import App_Text from "@/components/app_ui/App_Text";
import { ColumnDef } from "@tanstack/react-table";
import { RevenueSummaryRow } from "../revenue_analytics_types";

export const revenueSummaryColumns: ColumnDef<RevenueSummaryRow>[] = [
  {
    accessorKey: "metric",
    header: () => <App_Text variant="tableHeader">Metric</App_Text>,
    cell: ({ row }) => (
      <App_Text variant="tableCell" className="font-medium">
        {row.getValue("metric")}
      </App_Text>
    ),
  },
  {
    accessorKey: "thisPeriod",
    header: () => <App_Text variant="tableHeader">This Period</App_Text>,
    cell: ({ row }) => (
      <App_Text variant="tableCell">{row.getValue("thisPeriod")}</App_Text>
    ),
  },
  {
    accessorKey: "previousPeriod",
    header: () => <App_Text variant="tableHeader">Previous Period</App_Text>,
    cell: ({ row }) => (
      <App_Text variant="tableCellMuted">
        {row.getValue("previousPeriod")}
      </App_Text>
    ),
  },
  {
    accessorKey: "change",
    header: () => <App_Text variant="tableHeader">Change</App_Text>,
    cell: ({ row }) => {
      const r = row.original;
      return (
        <App_Text
          variant="tableCell"
          className={`font-medium ${r.direction === "up" ? "text-[#2e7d52]" : "text-[#c0392b]"}`}
        >
          {r.change}
        </App_Text>
      );
    },
  },
];
