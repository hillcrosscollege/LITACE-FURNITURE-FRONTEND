"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { PieChart, Pie, Cell } from "recharts";
import App_Text from "@/components/app_ui/App_Text";
import Analytics_Header from "../analytics_components/Analytics_Header";
import {
  Skeleton_Analytics_Stat,
  Skeleton_Section_Preview_Card,
  Skeleton_Chart_Card,
  Skeleton_Mini_List,
} from "./overview_components/overview_skeleton";
import {
  chartConfig,
  exportOptions,
  formatCurrency,
  sectionLinks,
  statsAnalytics,
} from "./overview_data/overview_data";
import useOverviewAnalytics from "./overview_hooks/useOverviewAnalytics";

const Analytics_Overview_View = () => {
  const router = useRouter();
  const {
    dateRange,
    setDateRange,
    stats,
    trend,
    topProducts,
    sectionPreviews,
    totalOrders,
    isLoading,
    isError,
    exportReport,
    isExporting,
    statusBreakdown,
  } = useOverviewAnalytics();

  if (isError)
    return (
      <div className="p-6 flex items-center justify-center">
        <App_Text variant="tableCellMuted" className="text-[#c0392b]">
          Failed to load analytics. Please try again.
        </App_Text>
      </div>
    );

  return (
    <div className="space-y-4">
      <Analytics_Header
        breadcrumbs={["Sales & Analytics", "Overview"]}
        title="Sales & Analytics"
        subtitle="A snapshot of your store's performance."
        dateRange={dateRange}
        onDateChange={setDateRange}
        reportType="Overview"
        exportOptions={exportOptions}
        onExport={(format, includes) => exportReport({ format, includes })}
        isExporting={isExporting}
      />

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {isLoading || !stats
          ? Array.from({ length: 4 }).map((_, i) => (
              <Skeleton_Analytics_Stat key={i} />
            ))
          : statsAnalytics(stats).map(
              ({ label, icon: Icon, data, format, color, bg }) => (
                <div
                  key={label}
                  className="bg-white rounded-2xl border border-[#ede8e2] shadow-sm p-4 space-y-3"
                >
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center ${bg}`}
                    >
                      <Icon size={16} className={color} />
                    </div>
                    <App_Text variant="tableCellMuted">{label}</App_Text>
                  </div>
                  <App_Text variant="statValue" className="text-2xl">
                    {format(data.value)}
                  </App_Text>
                  <App_Text
                    variant="tableCellMuted"
                    className={
                      data.direction === "up"
                        ? "text-[#2e7d52]"
                        : "text-[#c0392b]"
                    }
                  >
                    {data.direction === "up" ? "↑" : "↓"} {data.change}% vs last
                    period
                  </App_Text>
                </div>
              ),
            )}
      </div>

      {/* Section quick links */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {isLoading || !sectionPreviews
          ? Array.from({ length: 4 }).map((_, i) => (
              <Skeleton_Section_Preview_Card key={i} />
            ))
          : sectionLinks.map(({ key, label, icon: Icon, path, color, bg }) => {
              const preview =
                sectionPreviews[key as keyof typeof sectionPreviews];
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() =>
                    router.push(`/dashboard/sales-analytics/${path}`)
                  }
                  className="bg-white rounded-2xl border border-[#ede8e2] shadow-sm p-4 space-y-2 text-left hover:border-primary/30 hover:shadow-md transition-all group"
                >
                  <div className="flex items-center justify-between">
                    <App_Text variant="tableCellMuted">{label}</App_Text>
                    <div
                      className={`w-7 h-7 rounded-lg flex items-center justify-center ${bg}`}
                    >
                      <Icon size={13} className={color} />
                    </div>
                  </div>
                  <App_Text variant="statValue" className="text-xl">
                    {preview.value}
                  </App_Text>
                  <div className="flex items-center justify-between">
                    <App_Text
                      variant="tableCellMuted"
                      className={
                        preview.direction === "up"
                          ? "text-[#2e7d52]"
                          : "text-[#c0392b]"
                      }
                    >
                      {preview.direction === "up" ? "↑" : "↓"} {preview.change}%
                    </App_Text>
                    <ArrowRight
                      size={13}
                      className="text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all"
                    />
                  </div>
                </button>
              );
            })}
      </div>

      {/* Revenue trend + Order status */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Revenue trend chart */}
        <div className="lg:col-span-2">
          {isLoading ? (
            <Skeleton_Chart_Card />
          ) : (
            <div className="bg-white rounded-2xl border border-[#ede8e2] shadow-sm p-4 space-y-3">
              <App_Text variant="cardHeading">Revenue Overview</App_Text>
              <ChartContainer config={chartConfig} className="h-64 w-full">
                <AreaChart
                  data={trend}
                  margin={{ left: 0, right: 0, top: 8, bottom: 0 }}
                >
                  <defs>
                    <linearGradient
                      id="revGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="0%"
                        stopColor="#8f3d90"
                        stopOpacity={0.25}
                      />
                      <stop offset="100%" stopColor="#8f3d90" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid vertical={false} stroke="#ede8e2" />
                  <XAxis
                    dataKey="date"
                    axisLine={false}
                    tickLine={false}
                    fontSize={11}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    fontSize={11}
                    tickFormatter={(v) => `R${v / 1000}k`}
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="#8f3d90"
                    fill="url(#revGradient)"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ChartContainer>
            </div>
          )}
        </div>

        {/* Order status donut */}
        <div>
          {isLoading ? (
            <Skeleton_Chart_Card height="h-48" />
          ) : (
            <div className="bg-white rounded-2xl border border-[#ede8e2] shadow-sm p-4 space-y-3">
              <App_Text variant="cardHeading">Order Status</App_Text>
              <div className="flex justify-center">
                <ChartContainer config={{}} className="h-40 w-40">
                  <PieChart>
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Pie
                      data={statusBreakdown}
                      dataKey="count"
                      nameKey="status"
                      innerRadius={45}
                      outerRadius={70}
                      strokeWidth={0}
                    >
                      {statusBreakdown.map((entry, i) => (
                        <Cell key={i} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ChartContainer>
              </div>
              <div className="space-y-1.5">
                {statusBreakdown.map((s) => (
                  <div
                    key={s.status}
                    className="flex items-center justify-between text-xs"
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ backgroundColor: s.color }}
                      />
                      <App_Text variant="tableCellMuted">{s.status}</App_Text>
                    </div>
                    <App_Text variant="tableCell" className="font-medium">
                      {s.count} (
                      {totalOrders > 0
                        ? Math.round((s.count / totalOrders) * 100)
                        : 0}
                      %)
                    </App_Text>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Top products */}
      {isLoading ? (
        <Skeleton_Mini_List rows={5} />
      ) : (
        <div className="bg-white rounded-2xl border border-[#ede8e2] shadow-sm p-4 space-y-1">
          <div className="flex items-center justify-between mb-2">
            <App_Text variant="cardHeading">Top Selling Products</App_Text>
            <button
              type="button"
              onClick={() =>
                router.push("/dashboard/sales-analytics/product-performance")
              }
              className="text-xs text-primary hover:underline"
            >
              View all products
            </button>
          </div>
          {topProducts.map((p) => (
            <div
              key={p.id}
              className="flex items-center gap-3 py-2 border-b border-[#f5f2ee] last:border-0"
            >
              <div className="w-9 h-9 rounded-lg bg-[#f0e8df] overflow-hidden shrink-0">
                <Image
                  src={p.image}
                  alt={p.name}
                  width={36}
                  height={36}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <App_Text variant="tableCell" className="font-medium truncate">
                  {p.name}
                </App_Text>
                <App_Text variant="tableCellMuted">
                  {p.unitsSold} units sold
                </App_Text>
              </div>
              <App_Text variant="tableCell" className="font-semibold">
                {formatCurrency(p.revenue)}
              </App_Text>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Analytics_Overview_View;
