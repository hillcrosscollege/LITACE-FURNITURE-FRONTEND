"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown } from "lucide-react";
import App_Text from "@/components/app_ui/App_Text";
import { formatCurrency } from "../../overview_view/overview_data/overview_data";
import { RevenueComparison } from "../revenue_analytics_types";
import Compare_Period_Modal from "../revenue_analytics_modals/Compare_Period_Modal";
const Revenue_Comparison_Card = ({
  comparison,
}: {
  comparison: RevenueComparison;
}) => {
  const router = useRouter();
  const [showCompare, setShowCompare] = useState(false);

  const maxValue = Math.max(comparison.thisValue, comparison.lastValue);
  const thisPct = (comparison.thisValue / maxValue) * 100;
  const lastPct = (comparison.lastValue / maxValue) * 100;

  return (
    <>
      <div className="bg-white rounded-2xl border border-[#ede8e2] shadow-sm p-4 space-y-4">
        <div className="flex items-center justify-between">
          <App_Text variant="cardHeading">Revenue Comparison</App_Text>
          <button
            type="button"
            onClick={() => setShowCompare(true)}
            className="flex items-center gap-1.5 text-xs border border-[#e0dbd4] bg-white text-[text] hover:bg-[#f5f2ee] rounded-lg px-2.5 py-1.5 transition-colors"
          >
            This Month vs Last Month <ChevronDown size={12} />
          </button>
        </div>

        <div className="space-y-3">
          <div>
            <App_Text variant="tableCellMuted" className="mb-1">
              {comparison.thisLabel}
            </App_Text>
            <div className="flex items-center gap-3">
              <div className="flex-1 h-2.5 rounded-full bg-[#f0ebf7] overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full transition-all"
                  style={{ width: `${thisPct}%` }}
                />
              </div>
              <App_Text
                variant="tableCell"
                className="font-semibold flex-shrink-0"
              >
                {formatCurrency(comparison.thisValue)}
              </App_Text>
            </div>
          </div>
          <div>
            <App_Text variant="tableCellMuted" className="mb-1">
              {comparison.lastLabel}
            </App_Text>
            <div className="flex items-center gap-3">
              <div className="flex-1 h-2.5 rounded-full bg-[#f5f2ee] overflow-hidden">
                <div
                  className="h-full bg-[#d0c8c0] rounded-full transition-all"
                  style={{ width: `${lastPct}%` }}
                />
              </div>
              <App_Text
                variant="tableCell"
                className="font-semibold flex-shrink-0"
              >
                {formatCurrency(comparison.lastValue)}
              </App_Text>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-[#ede8e2]">
          <App_Text variant="tableCellMuted">Change</App_Text>
          <App_Text
            variant="tableCell"
            className="font-semibold text-[#2e7d52]"
          >
            ↑ {comparison.changePct}%
          </App_Text>
        </div>

        <button
          type="button"
          onClick={() =>
            router.push(
              "/dashboard/sales-analytics/revenue-analytics/comparison",
            )
          }
          className="text-xs text-primary hover:underline flex items-center gap-1"
        >
          View detailed comparison →
        </button>
      </div>

      {showCompare && (
        <Compare_Period_Modal
          current={comparison}
          onClose={() => setShowCompare(false)}
        />
      )}
    </>
  );
};

export default Revenue_Comparison_Card;
