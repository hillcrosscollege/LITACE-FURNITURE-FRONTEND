"use client";

import { useState } from "react";
import { X } from "lucide-react";
import App_Text from "@/components/app_ui/App_Text";
import App_Button from "@/components/app_ui/App_Button";
import App_Select from "@/components/app_ui/App_Select";

type Props = { onClose: () => void; onApply: (f: any) => void };

const categories = [
  { label: "All Categories", key: "all" },
  { label: "Living Room", key: "living_room" },
  { label: "Bedroom", key: "bedroom" },
  { label: "Dining Room", key: "dining_room" },
  { label: "Office", key: "office" },
  { label: "Outdoor", key: "outdoor" },
];
const stores = [
  { label: "All Stores", key: "all" },
  { label: "Main Warehouse", key: "main" },
  { label: "Lekki Showroom", key: "lekki" },
  { label: "Victoria Island Showroom", key: "vi" },
];
const stockStatuses = [
  { label: "All Statuses", key: "all" },
  { label: "Healthy", key: "healthy" },
  { label: "Low Stock", key: "low" },
  { label: "Out of Stock", key: "out" },
];

const Filters_Modal = ({ onClose, onApply }: Props) => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [store, setStore] = useState("all");
  const [status, setStatus] = useState("all");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

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

        <div className="space-y-1.5">
          <App_Text variant="tableCell" className="font-medium">
            Search Product
          </App_Text>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by product name, SKU..."
            className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2.5 bg-white outline-none focus:border-primary"
          />
        </div>

        <App_Select
          data={categories}
          value={category}
          placeholder="Select category"
          title="Category"
          onChange={setCategory}
          style="gap-1.5"
        />
        <App_Select
          data={stores}
          value={store}
          placeholder="All Stores"
          title="Store"
          onChange={setStore}
          style="gap-1.5"
        />
        <App_Select
          data={stockStatuses}
          value={status}
          placeholder="All Statuses"
          title="Stock Status"
          onChange={setStatus}
          style="gap-1.5"
        />

        <div className="space-y-1.5">
          <App_Text variant="tableCell" className="font-medium">
            Price Range (R)
          </App_Text>
          <div className="flex items-center gap-2">
            <input
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              placeholder="Min"
              className="flex-1 text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white outline-none focus:border-primary"
            />
            <span className="text-muted-foreground">—</span>
            <input
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              placeholder="Max"
              className="flex-1 text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white outline-none focus:border-primary"
            />
          </div>
        </div>

        <div className="flex gap-3 pt-1">
          <App_Button
            text="Reset"
            type="button"
            onPress={() => {
              setCategory("all");
              setStore("all");
              setStatus("all");
              setSearch("");
              setMinPrice("");
              setMaxPrice("");
            }}
            btnStyle="flex-1 text-xs border border-[#e0dbd4] bg-white text-[#1e1a17] hover:bg-[#f5f2ee] rounded-xl py-2.5 h-auto"
          />
          <App_Button
            text="Apply Filters"
            type="button"
            onPress={() => {
              onApply({ search, category, store, status, minPrice, maxPrice });
              onClose();
            }}
            btnStyle="flex-1 text-xs bg-primary text-white hover:bg-primary/90 rounded-xl py-2.5 h-auto"
          />
        </div>
      </div>
    </div>
  );
};
export default Filters_Modal;
