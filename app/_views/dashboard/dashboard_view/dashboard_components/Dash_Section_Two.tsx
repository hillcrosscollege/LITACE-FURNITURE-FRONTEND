"use client";

import { useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import App_Text from "@/components/app_ui/App_Text";
import { RecentOrder, SalesPoint } from "../dash_types";
import Recent_Orders from "./Recent_Orders";
import { Chart_Skeleton, Orders_Skeleton } from "./Dasbbaord_Skeletons";
import { salesChartConfig } from "../dash_data/dash_data";

type Props = {
  salesData?: SalesPoint[];
  recentOrders?: RecentOrder[];
  isLoading: boolean;
};

const Dash_Section_Two = ({ salesData, recentOrders, isLoading }: Props) => {
  const [period, setPeriod] = useState("This Month");

  if (isLoading)
    return (
      <div className="flex flex-col md:flex-row gap-4 my-6">
        <Chart_Skeleton />
        <Orders_Skeleton />
      </div>
    );

  return (
    <div className="flex flex-col md:flex-row gap-4 my-6">
      {/* Sales chart */}
      <div className="bg-white flex-1 rounded-2xl border border-[#ede8e2] p-4 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <App_Text variant="cardHeading">Sales Overview</App_Text>
          <select
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            className="text-xs border border-[#e0dbd4] rounded-lg px-2 py-1.5 bg-[#faf9f7] outline-none cursor-pointer text-muted-foreground"
          >
            <option>This Month</option>
            <option>Last Month</option>
          </select>
        </div>

        <ChartContainer config={salesChartConfig} className="h-52 w-full">
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
              tickFormatter={(v) => `R${v / 1000}k`}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  formatter={(v) => `R${Number(v).toLocaleString()}`}
                />
              }
            />
            <ChartLegend content={<ChartLegendContent />} />
            <Line
              type="monotone"
              dataKey="thisMonth"
              stroke="#8f3d90"
              strokeWidth={2}
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="lastMonth"
              stroke="#d0c8c0"
              strokeWidth={1.5}
              dot={false}
              strokeDasharray="4 4"
            />
          </LineChart>
        </ChartContainer>
      </div>

      {/* Recent Orders */}
      <Recent_Orders recentOrders={recentOrders!} />
    </div>
  );
};

export default Dash_Section_Two;
