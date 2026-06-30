"use client";

import { useState } from "react";
import { X } from "lucide-react";
import App_Button from "@/components/app_ui/App_Button";
import App_Select from "@/components/app_ui/App_Select";
import App_Text from "@/components/app_ui/App_Text";
import { useComparePeriod } from "../revenue_analytics_hooks/useRevenueMutation";
import { RevenueComparison } from "../revenue_analytics_types";

type Props = { current: RevenueComparison; onClose: () => void };

const compareOptions = [
  { label: "Previous Period", key: "Previous Period" },
  { label: "Same Period Last Year", key: "Same Period Last Year" },
  { label: "Custom Period", key: "Custom Period" },
];

const Compare_Period_Modal = ({ current, onClose }: Props) => {
  const [compareWith, setCompareWith] = useState("Previous Period");
  const { mutate: comparePeriod, isPending } = useComparePeriod();

  const handleApply = () => {
    comparePeriod(
      {
        compareWith,
        previousRange: "5 May – 11 May 2024",
        currentRange: "12 May – 18 May 2024",
      },
      { onSuccess: onClose },
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 space-y-4">
        <div className="flex items-center justify-between">
          <App_Text variant="cardHeading" className="text-base">
            Compare Period
          </App_Text>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-[#f5f2ee] text-muted-foreground"
          >
            <X size={16} />
          </button>
        </div>

        <App_Select
          data={compareOptions}
          value={compareWith}
          placeholder="Select comparison"
          title="Compare With"
          onChange={setCompareWith}
          style="gap-1.5"
        />

        <div className="space-y-1.5">
          <App_Text variant="tableCell" className="font-medium">
            Previous Period
          </App_Text>
          <div className="border border-gray-200 rounded-lg px-3 py-2.5 bg-[#faf9f7]">
            <App_Text variant="tableCell">5 May – 11 May 2024</App_Text>
          </div>
        </div>

        <div className="space-y-1.5">
          <App_Text variant="tableCell" className="font-medium">
            Current Period
          </App_Text>
          <div className="border border-gray-200 rounded-lg px-3 py-2.5 bg-[#faf9f7]">
            <App_Text variant="tableCell">12 May – 18 May 2024</App_Text>
          </div>
        </div>

        <div className="flex gap-3 pt-1">
          <App_Button
            text="Cancel"
            type="button"
            onPress={onClose}
            btnStyle="flex-1 text-xs border border-[#e0dbd4] bg-white text-[#1e1a17] hover:bg-[#f5f2ee] rounded-xl py-2.5 h-auto"
          />
          <App_Button
            text={isPending ? "Applying..." : "Apply"}
            type="button"
            onPress={handleApply}
            btnStyle="flex-1 text-xs bg-primary text-white hover:bg-primary/90 rounded-xl py-2.5 h-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default Compare_Period_Modal;
