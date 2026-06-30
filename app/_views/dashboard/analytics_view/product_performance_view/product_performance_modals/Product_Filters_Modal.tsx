"use client";

import { useState } from "react";
import { X } from "lucide-react";
import App_Button from "@/components/app_ui/App_Button";
import App_Select from "@/components/app_ui/App_Select";
import App_Text from "@/components/app_ui/App_Text";

type Props = { onClose: () => void; onApply: (filters: any) => void };

const categoryOptions = [
  { label: "All Categories", key: "all" },
  { label: "Living Room", key: "living_room" },
  { label: "Bedroom", key: "bedroom" },
  { label: "Dining Room", key: "dining_room" },
  { label: "Office", key: "office" },
  { label: "Outdoor", key: "outdoor" },
];

const statusOptions = [
  { label: "All Statuses", key: "all" },
  { label: "Active", key: "Active" },
  { label: "Inactive", key: "Inactive" },
];

const Product_Filters_Modal = ({ onClose, onApply }: Props) => {
  const [from, setFrom] = useState("2024-05-12");
  const [to, setTo] = useState("2024-05-18");
  const [category, setCategory] = useState("all");
  const [status, setStatus] = useState("all");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 space-y-4">
        <div className="flex items-center justify-between">
          <App_Text variant="cardHeading" className="text-base">
            Filters
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
          data={[{ label: "Custom Range", key: "Custom Range" }]}
          value="Custom Range"
          placeholder="Select range"
          title="Date Range"
          onChange={() => {}}
          style="gap-1.5"
        />

        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <label className="text-xs text-muted-foreground">From</label>
            <input
              type="date"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white outline-none focus:border-primary"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs text-muted-foreground">To</label>
            <input
              type="date"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white outline-none focus:border-primary"
            />
          </div>
        </div>

        <App_Select
          data={categoryOptions}
          value={category}
          placeholder="Select category"
          title="Category"
          onChange={setCategory}
          style="gap-1.5"
        />
        <App_Select
          data={statusOptions}
          value={status}
          placeholder="Select status"
          title="Status"
          onChange={setStatus}
          style="gap-1.5"
        />

        <div className="flex gap-3 pt-1">
          <App_Button
            text="Reset"
            type="button"
            onPress={() => {
              setCategory("all");
              setStatus("all");
            }}
            btnStyle="flex-1 text-xs border border-[#e0dbd4] bg-white text-[#1e1a17] hover:bg-[#f5f2ee] rounded-xl py-2.5 h-auto"
          />
          <App_Button
            text="Apply Filters"
            type="button"
            onPress={() => {
              onApply({ from, to, category, status });
              onClose();
            }}
            btnStyle="flex-1 text-xs bg-primary text-white hover:bg-primary/90 rounded-xl py-2.5 h-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default Product_Filters_Modal;
