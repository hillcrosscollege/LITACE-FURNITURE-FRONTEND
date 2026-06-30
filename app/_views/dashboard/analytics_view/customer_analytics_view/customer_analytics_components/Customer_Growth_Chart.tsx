"use client";

import { LineChart, Line, XAxis, YAxis, CartesianGrid } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import App_Text from "@/components/app_ui/App_Text";
import { GrowthPoint } from "../customer_analytics_types";

const chartConfig = {
  newCust: { label: "New Customers", color: "#8f3d90" },
  returning: { label: "Returning Customers", color: "#2e7d52" },
};

const Customer_Growth_Chart = ({ data }: { data: GrowthPoint[] }) => (
  <div className="bg-white rounded-2xl border border-[#ede8e2] shadow-sm p-4 space-y-3">
    <App_Text variant="cardHeading">Customer Growth</App_Text>
    <ChartContainer config={chartConfig} className="h-64 w-full">
      <LineChart data={data} margin={{ left: 0, right: 0, top: 8, bottom: 0 }}>
        <CartesianGrid vertical={false} stroke="#ede8e2" />
        <XAxis dataKey="date" axisLine={false} tickLine={false} fontSize={11} />
        <YAxis axisLine={false} tickLine={false} fontSize={11} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Line
          type="monotone"
          dataKey="newCust"
          stroke="#8f3d90"
          strokeWidth={2}
          dot={false}
        />
        <Line
          type="monotone"
          dataKey="returning"
          stroke="#2e7d52"
          strokeWidth={2}
          dot={false}
        />
        <ChartLegend content={<ChartLegendContent />} />
      </LineChart>
    </ChartContainer>
  </div>
);

export default Customer_Growth_Chart;
