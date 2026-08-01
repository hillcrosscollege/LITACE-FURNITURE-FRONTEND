"use client";

import { useState } from "react";
import { X } from "lucide-react";
import App_Text from "@/components/app_ui/App_Text";
import App_Button from "@/components/app_ui/App_Button";
import App_Select from "@/components/app_ui/App_Select";
import { useExportInventory } from "../inventory_hooks/useInventoryMutation";

type Props = { onClose: () => void };

const reportTypes = [
  { label: "Inventory Overview", key: "overview" },
  { label: "Stock by Location", key: "location" },
  { label: "Low Stock Items", key: "low_stock" },
  { label: "Out of Stock Items", key: "out_stock" },
  { label: "Stock Movements", key: "movements" },
];

const includeOptions = [
  { id: "summary", label: "Inventory Summary" },
  { id: "location", label: "Stock by Location" },
  { id: "low_stock", label: "Low Stock Items" },
  { id: "out_stock", label: "Out of Stock Items" },
  { id: "movements", label: "Stock Movements" },
];

const Export_Modal = ({ onClose }: Props) => {
  const [reportType, setReportType] = useState("overview");
  const [format, setFormat] = useState<"PDF" | "Excel" | "CSV">("PDF");
  const [checked, setChecked] = useState(includeOptions.map((o) => o.id));
  const { mutate: exportReport, isPending } = useExportInventory();

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
          <App_Text variant="cardHeading" className="text-base">
            Export Inventory Report
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
          data={reportTypes}
          value={reportType}
          placeholder="Select report type"
          title="Report Type"
          onChange={setReportType}
          style="gap-1.5"
        />

        <div className="space-y-1.5">
          <App_Text variant="tableCell" className="font-medium">
            Format
          </App_Text>
          <div className="flex gap-2">
            {(["PDF", "Excel", "CSV"] as const).map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setFormat(f)}
                className={`flex-1 text-xs py-2 rounded-lg font-medium transition-colors ${format === f ? "bg-primary text-white" : "border border-[#e0dbd4] bg-white text-[#1e1a17] hover:bg-[#f5f2ee]"}`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <App_Text variant="tableCell" className="font-medium">
            Include
          </App_Text>
          {includeOptions.map((opt) => (
            <label
              key={opt.id}
              className="flex items-center gap-3 cursor-pointer py-0.5"
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
              exportReport(
                { reportType, format, includes: checked },
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
export default Export_Modal;
