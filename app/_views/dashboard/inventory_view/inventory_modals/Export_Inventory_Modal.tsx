"use client";

import { useState } from "react";
import { X } from "lucide-react";
import App_Button from "@/components/app_ui/App_Button";
import App_Select from "@/components/app_ui/App_Select";
import App_Text from "@/components/app_ui/App_Text";
import { useExportInventory } from "../inventory_hooks/useInventoryQueries";

type Props = { onClose: () => void };

const exportOptions = [
  { id: "productInfo", label: "Product Information" },
  { id: "stockInfo", label: "Stock Information" },
  { id: "locations", label: "Locations" },
  { id: "costPricing", label: "Cost & Pricing" },
  { id: "supplierInfo", label: "Supplier Information" },
];

const Export_Inventory_Modal = ({ onClose }: Props) => {
  const [format, setFormat] = useState("Excel (.xlsx)");
  const [checked, setChecked] = useState(exportOptions.map((o) => o.id));
  const { mutate: exportInventory, isPending } = useExportInventory();

  const toggle = (id: string) =>
    setChecked((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id],
    );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <App_Text variant="cardHeading" className="text-base">
              Export Inventory
            </App_Text>
            <App_Text variant="tableCellMuted">
              Export your inventory data.
            </App_Text>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-[#f5f2ee] text-muted-foreground"
          >
            <X size={16} />
          </button>
        </div>

        <App_Select
          data={[
            { label: "Excel (.xlsx)", key: "Excel (.xlsx)" },
            { label: "CSV", key: "CSV" },
            { label: "JSON", key: "JSON" },
          ]}
          value={format}
          placeholder="Select format"
          title="Export Format"
          onChange={setFormat}
          style="gap-1.5"
        />

        <div className="space-y-2">
          <App_Text variant="tableCell" className="font-medium">
            Include in Export
          </App_Text>
          {exportOptions.map((opt) => (
            <label
              key={opt.id}
              className="flex items-center gap-3 cursor-pointer py-1"
            >
              <input
                type="checkbox"
                checked={checked.includes(opt.id)}
                onChange={() => toggle(opt.id)}
                className="w-4 h-4 accent-primary rounded"
              />
              <App_Text variant="tableCell">{opt.label}</App_Text>
            </label>
          ))}
        </div>

        <div className="flex gap-3 pt-1">
          <App_Button
            text="Cancel"
            type="button"
            onPress={onClose}
            btnStyle="flex-1 text-xs border border-[#e0dbd4] bg-white text-[#1e1a17] hover:bg-[#f5f2ee] rounded-xl py-2.5 h-auto"
          />
          <App_Button
            text={isPending ? "Exporting..." : "Export"}
            type="button"
            onPress={() =>
              exportInventory(
                { format, includes: checked },
                { onSuccess: onClose },
              )
            }
            btnStyle="flex-1 text-xs bg-primary text-white hover:bg-primary/90 rounded-xl py-2.5 h-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default Export_Inventory_Modal;
