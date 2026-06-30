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
import Recent_Orders from "./Recent_Orders";
import { salesChartConfig, salesData } from "../dash_data";

const Dash_Section_Two = () => {
  return (
    <div className="flex gap-4 my-6">
      {/* Sales chart */}
      <div className="bg-white flex-1 rounded-2xl border border-[#ede8e2] p-4 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <App_Text variant="cardHeading">Sales Overview</App_Text>
          <select className="text-xs border border-[#e0dbd4] rounded-lg px-2 py-1.5 bg-[#faf9f7] outline-none cursor-pointer text-muted-foreground">
            <option>This Month</option>
            <option>Last Month</option>
          </select>
        </div>

        <ChartContainer config={salesChartConfig} className="h-50 w-full">
          <LineChart data={salesData}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#f0ece8"
              vertical={false}
            />
            <XAxis
              dataKey="date"
              tick={{ fontSize: 10, fill: "#aaa" }}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              tick={{ fontSize: 10, fill: "#aaa" }}
              tickLine={false}
              axisLine={false}
              tickFormatter={(v) => `R ${v / 1000}K`}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  formatter={(value) => `R ${Number(value).toLocaleString()}`}
                />
              }
            />
            <ChartLegend content={<ChartLegendContent />} />
            <Line
              type="monotone"
              dataKey="thisMonth"
              stroke="#a0522d"
              strokeWidth={2}
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="lastMonth"
              stroke="#d0c8c0"
              strokeWidth={1.5}
              strokeDasharray="4 4"
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </div>

      <Recent_Orders />
    </div>
  );
};

export default Dash_Section_Two;
