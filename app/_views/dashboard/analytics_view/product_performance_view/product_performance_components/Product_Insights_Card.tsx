"use client";

import { useRouter } from "next/navigation";
import { Trophy, AlertTriangle, Info } from "lucide-react";
import App_Text from "@/components/app_ui/App_Text";
import { ProductInsight } from "../product_performance_types";

const insightStyles = {
  top: { icon: Trophy, color: "text-[#2e7d52]", bg: "bg-[#edf7f2]" },
  warning: { icon: AlertTriangle, color: "text-[#c0392b]", bg: "bg-[#fdecea]" },
  info: { icon: Info, color: "text-[#3266ad]", bg: "bg-[#edf2fb]" },
};

const Product_Insights_Card = ({
  insights,
}: {
  insights: ProductInsight[];
}) => {
  const router = useRouter();

  return (
    <div className="bg-white rounded-2xl border border-[#ede8e2] shadow-sm p-4 space-y-4">
      <App_Text variant="cardHeading">Insights</App_Text>
      <div className="space-y-4">
        {insights.map((insight) => {
          const { icon: Icon, color, bg } = insightStyles[insight.type];
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
        onClick={() => router.push("/dashboard/sales-analytics/insights")}
        className="text-xs text-primary hover:underline flex items-center gap-1"
      >
        View all insights →
      </button>
    </div>
  );
};

export default Product_Insights_Card;
