"use client";

import { useRouter } from "next/navigation";
import {
  SlidersHorizontal,
  ArrowLeftRight,
  RotateCcw,
  Activity,
  Printer,
} from "lucide-react";
import App_Text from "@/components/app_ui/App_Text";
import { InventoryProduct } from "../../inventory_types";

type Props = {
  product: InventoryProduct;
  onAdjust: () => void;
  onRestock: () => void;
  onTransfer: () => void;
};

const Tab_Inv_Overview = ({
  product,
  onAdjust,
  onRestock,
  onTransfer,
}: Props) => {
  const router = useRouter();
  const total = product.totalStock || 1;

  const quickActions = [
    { label: "Adjust Stock", icon: SlidersHorizontal, onPress: onAdjust },
    { label: "Transfer Stock", icon: ArrowLeftRight, onPress: onTransfer },
    { label: "Restock Inventory", icon: RotateCcw, onPress: onRestock },
    { label: "View Stock Movements", icon: Activity, onPress: () => {} },
    { label: "Print Barcode Label", icon: Printer, onPress: () => {} },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
      {/* Product Details */}
      <div className="bg-[#faf9f7] rounded-xl border border-[#ede8e2] p-4 space-y-1">
        <App_Text variant="cardHeading" className="mb-3">
          Product Details
        </App_Text>
        {[
          { label: "Category", value: product.category },
          { label: "Brand", value: product.brand },
          {
            label: "Selling Price",
            value: `R${product.sellingPrice.toLocaleString()}`,
          },
          {
            label: "Cost Price",
            value: `R${product.costPrice.toLocaleString()}`,
          },
          {
            label: "Minimum Stock Level",
            value: `${product.lowStockLevel} units`,
          },
          {
            label: "Maximum Stock Level",
            value: `${product.maxStockLevel} units`,
          },
          { label: "Unit", value: product.unit },
          { label: "Last Restocked", value: product.lastRestocked },
          { label: "Created At", value: product.createdAt },
        ].map(({ label, value }) => (
          <div
            key={label}
            className="flex items-center justify-between py-2 border-b border-[#ede8e2] last:border-0 gap-2"
          >
            <App_Text variant="tableCellMuted" className="flex-shrink-0">
              {label}
            </App_Text>
            <App_Text variant="tableCell" className="font-medium text-right">
              {value}
            </App_Text>
          </div>
        ))}
      </div>

      {/* Stock Summary */}
      <div className="bg-[#faf9f7] rounded-xl border border-[#ede8e2] p-4 space-y-3">
        <App_Text variant="cardHeading">Stock Summary</App_Text>
        {[
          {
            label: "Total Stock",
            value: product.totalStock,
            pct: 100,
            color: "text-[#1e1a17]",
          },
          {
            label: "Available",
            value: product.available,
            pct: Math.round((product.available / total) * 100),
            color: "text-[#2e7d52]",
          },
          {
            label: "Reserved",
            value: product.reserved,
            pct: Math.round((product.reserved / total) * 100),
            color: "text-[#c87941]",
          },
          {
            label: "Damaged",
            value: product.damaged,
            pct: Math.round((product.damaged / total) * 100),
            color: "text-[#c0392b]",
          },
        ].map(({ label, value, pct, color }) => (
          <div key={label}>
            <div className="flex items-center justify-between mb-1">
              <App_Text variant="tableCellMuted">{label}</App_Text>
              <App_Text
                variant="tableCell"
                className={`font-semibold ${color}`}
              >
                {value} ({pct}%)
              </App_Text>
            </div>
            <div className="h-1.5 rounded-full bg-[#ede8e2] overflow-hidden">
              <div
                className="h-full bg-primary rounded-full"
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-[#faf9f7] rounded-xl border border-[#ede8e2] p-4 space-y-2">
        <App_Text variant="cardHeading">Quick Actions</App_Text>
        {quickActions.map(({ label, icon: Icon, onPress }) => (
          <button
            key={label}
            type="button"
            onClick={onPress}
            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl hover:bg-white border border-transparent hover:border-[#ede8e2] transition-colors group text-left"
          >
            <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Icon size={14} className="text-primary" />
            </div>
            <App_Text
              variant="tableCell"
              className="group-hover:text-primary transition-colors"
            >
              {label}
            </App_Text>
          </button>
        ))}
      </div>
    </div>
  );
};
export default Tab_Inv_Overview;
