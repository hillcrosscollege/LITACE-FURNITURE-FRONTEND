"use client";

import { useRouter } from "next/navigation";
import { TrendingUp, TrendingDown } from "lucide-react";
import App_Text from "@/components/app_ui/App_Text";
import { Insight } from "../revenue_analytics_types";

const Insights_Sidebar = ({ insights }: { insights: Insight[] }) => {
  const router = useRouter();

  return (
    <div className="bg-white rounded-2xl border border-[#ede8e2] shadow-sm p-4 space-y-4 sticky top-4">
      <App_Text variant="cardHeading">Insights</App_Text>
      <div className="space-y-4">
        {insights.map((insight) => {
          const Icon = insight.type === "up" ? TrendingUp : TrendingDown;
          const color =
            insight.type === "up" ? "text-[#2e7d52]" : "text-[#c0392b]";
          const bg = insight.type === "up" ? "bg-[#edf7f2]" : "bg-[#fdecea]";
          return (
            <div key={insight.id} className="flex items-start gap-3">
              <div
                className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${bg}`}
              >
                <Icon size={13} className={color} />
              </div>
              <div>
                <App_Text variant="tableCell" className="font-medium">
                  {insight.title}
                </App_Text>
                <App_Text variant="tableCellMuted" className="mt-0.5">
                  {insight.detail}
                </App_Text>
              </div>
            </div>
          );
        })}
      </div>
      <button
        type="button"
        onClick={() =>
          router.push("/dashboard/sales-analytics/revenue-analytics/insights")
        }
        className="text-xs text-primary hover:underline flex items-center gap-1"
      >
        View all insights →
      </button>
    </div>
  );
};

export default Insights_Sidebar;
