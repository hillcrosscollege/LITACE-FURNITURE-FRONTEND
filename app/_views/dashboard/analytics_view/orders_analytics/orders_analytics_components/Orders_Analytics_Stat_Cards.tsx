"use client";

import App_Text from "@/components/app_ui/App_Text";
import { CheckCircle2, Clock, XCircle, RotateCcw } from "lucide-react";
import { OrdersAnalyticsStats } from "../order_analytics_types";

const cardConfig = [
  {
    key: "completedOrders",
    label: "Completed Orders",
    icon: CheckCircle2,
    color: "text-[#2e7d52]",
    bg: "bg-[#edf7f2]",
  },
  {
    key: "pendingOrders",
    label: "Pending Orders",
    icon: Clock,
    color: "text-[#c87941]",
    bg: "bg-[#fdf0e6]",
  },
  {
    key: "cancelledOrders",
    label: "Cancelled Orders",
    icon: XCircle,
    color: "text-[#c0392b]",
    bg: "bg-[#fdecea]",
  },
  {
    key: "returnedOrders",
    label: "Returned Orders",
    icon: RotateCcw,
    color: "text-[#7048b6]",
    bg: "bg-[#f0ebf7]",
  },
] as const;

const Orders_Analytics_Stat_Cards = ({
  stats,
}: {
  stats: OrdersAnalyticsStats;
}) => (
  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
    {cardConfig.map(({ key, label, icon: Icon, color, bg }) => {
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
            {data.value.toLocaleString()}
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

export default Orders_Analytics_Stat_Cards;
