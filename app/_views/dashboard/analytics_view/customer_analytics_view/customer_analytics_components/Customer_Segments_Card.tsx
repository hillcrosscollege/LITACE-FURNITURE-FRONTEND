"use client";

import { PieChart, Pie, Cell } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import App_Text from "@/components/app_ui/App_Text";
import { CustomerSegment } from "../customer_analytics_types";

const Customer_Segments_Card = ({
  segments,
}: {
  segments: CustomerSegment[];
}) => (
  <div className="bg-white rounded-2xl border border-[#ede8e2] shadow-sm p-4 space-y-3">
    <App_Text variant="cardHeading">Customer Segments</App_Text>
    <div className="flex justify-center">
      <ChartContainer config={{}} className="h-40 w-40">
        <PieChart>
          <ChartTooltip content={<ChartTooltipContent />} />
          <Pie
            data={segments}
            dataKey="count"
            nameKey="segment"
            innerRadius={45}
            outerRadius={70}
            strokeWidth={0}
          >
            {segments.map((s, i) => (
              <Cell key={i} fill={s.color} />
            ))}
          </Pie>
        </PieChart>
      </ChartContainer>
    </div>
    <div className="space-y-1.5">
      {segments.map((s) => (
        <div
          key={s.segment}
          className="flex items-center justify-between text-xs"
        >
          <div className="flex items-center gap-2">
            <span
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: s.color }}
            />
            <App_Text variant="tableCellMuted">{s.segment}</App_Text>
          </div>
          <App_Text variant="tableCell" className="font-medium">
            {s.count} ({s.pct}%)
          </App_Text>
        </div>
      ))}
    </div>
  </div>
);

export default Customer_Segments_Card;
