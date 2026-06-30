"use client";

import App_Text from "@/components/app_ui/App_Text";
import { Users, UserPlus, Repeat, Wallet, UserMinus } from "lucide-react";
import { formatCurrency } from "../../overview_view/overview_data/overview_data";
import { CustomerAnalyticsStats } from "../customer_analytics_types";
const cardConfig = [
  {
    key: "totalCustomers",
    label: "Total Customers",
    icon: Users,
    color: "text-primary",
    bg: "bg-primary/10",
    format: (v: any) => v.toLocaleString(),
  },
  {
    key: "newCustomers",
    label: "New Customers",
    icon: UserPlus,
    color: "text-[#3266ad]",
    bg: "bg-[#edf2fb]",
    format: (v: any) => v.toLocaleString(),
  },
  {
    key: "returningCustomers",
    label: "Returning Customers",
    icon: Repeat,
    color: "text-[#2e7d52]",
    bg: "bg-[#edf7f2]",
    format: (v: any) => v.toLocaleString(),
  },
  {
    key: "lifetimeValue",
    label: "Avg Lifetime Value",
    icon: Wallet,
    color: "text-[#c87941]",
    bg: "bg-[#fdf0e6]",
    format: (v: any) => formatCurrency(v),
  },
  {
    key: "churnRate",
    label: "Churn Rate",
    icon: UserMinus,
    color: "text-[#c0392b]",
    bg: "bg-[#fdecea]",
    format: (v: any) => v,
  },
] as const;

const Customer_Stat_Cards = ({ stats }: { stats: CustomerAnalyticsStats }) => (
  <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
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
          <App_Text variant="statValue" className="text-2xl">
            {format(data.value)}
          </App_Text>
          {data.change !== undefined && (
            <App_Text
              variant="tableCellMuted"
              className={
                data.direction === "up" ? "text-[#2e7d52]" : "text-[#c0392b]"
              }
            >
              {data.direction === "up" ? "↑" : "↓"} {data.change}% vs 5 – 11 May
            </App_Text>
          )}
        </div>
      );
    })}
  </div>
);

export default Customer_Stat_Cards;
