"use client";

import App_Text from "@/components/app_ui/App_Text";
import {
  DollarSign,
  Wallet,
  Target,
  TrendingUp,
  RotateCcw,
  Tag,
} from "lucide-react";
import { formatCurrency } from "../../overview_view/overview_data/overview_data";
import { RevenueStats } from "../revenue_analytics_types";

const cardConfig = [
  {
    key: "totalRevenue",
    label: "Total Revenue",
    icon: DollarSign,
    color: "text-primary",
    bg: "bg-primary/10",
    format: formatCurrency,
  },
  {
    key: "netRevenue",
    label: "Net Revenue",
    icon: Wallet,
    color: "text-[#2e7d52]",
    bg: "bg-[#edf7f2]",
    format: formatCurrency,
  },
  {
    key: "avgOrderValue",
    label: "Average Order Value",
    icon: Target,
    color: "text-[#3266ad]",
    bg: "bg-[#edf2fb]",
    format: formatCurrency,
  },
  {
    key: "grossMargin",
    label: "Gross Margin",
    icon: TrendingUp,
    color: "text-[#2e7d52]",
    bg: "bg-[#edf7f2]",
    format: (v: number) => `${v}%`,
  },
  {
    key: "refunds",
    label: "Refunds",
    icon: RotateCcw,
    color: "text-[#c0392b]",
    bg: "bg-[#fdecea]",
    format: formatCurrency,
  },
  {
    key: "discountsGiven",
    label: "Discounts Given",
    icon: Tag,
    color: "text-[#c87941]",
    bg: "bg-[#fdf0e6]",
    format: formatCurrency,
  },
] as const;

const Revenue_Stat_Cards = ({ stats }: { stats: RevenueStats }) => (
  <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
    {cardConfig.map(({ key, label, icon: Icon, color, bg, format }) => {
      const data = stats[key];
      return (
        <div
          key={key}
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
          <App_Text variant="statValue" className="text-xl">
            {format(data.value)}
          </App_Text>
          <App_Text
            variant="tableCellMuted"
            className={
              data.direction === "up" ? "text-[#2e7d52]" : "text-[#c0392b]"
            }
          >
            {data.direction === "up" ? "↑" : "↓"} {data.change}% vs 5 – 11 May
          </App_Text>
        </div>
      );
    })}
  </div>
);

export default Revenue_Stat_Cards;
