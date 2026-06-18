"use client";

import {
  PlusCircle,
  ArrowLeftRight,
  History,
  Printer,
  PackagePlus,
} from "lucide-react";
import { PieChart, Pie, Cell } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useRouter } from "next/navigation";
import App_Text from "@/components/app_ui/App_Text";
import { InventoryProduct } from "../../inventory_types";

type Props = {
  product: InventoryProduct;
  onAdjust: () => void;
  onBarcode: () => void;
};

const donutData = (product: InventoryProduct) => [
  { name: "Available", value: product.available, fill: "#8f3d90" },
  { name: "Reserved", value: product.reserved, fill: "#f4c430" },
  { name: "Low Stock", value: 0, fill: "#c87941" },
  { name: "Out of Stock", value: 0, fill: "#c0392b" },
];

const donutConfig = {
  Available: { label: "Available", color: "#8f3d90" },
  Reserved: { label: "Reserved", color: "#f4c430" },
  "Low Stock": { label: "Low Stock", color: "#c87941" },
  "Out of Stock": { label: "Out of Stock", color: "#c0392b" },
};

const Tab_Inv_Overview = ({ product, onAdjust, onBarcode }: Props) => {
  const router = useRouter();
  const total = product.stock;
  const data = donutData(product);

  const quickActions = [
    { label: "Adjust Stock", icon: PlusCircle, onPress: onAdjust },
    {
      label: "Add Stock",
      icon: PackagePlus,
      onPress: () =>
        router.push(`/dashboard/inventory/${product.id}/add-stock`),
    },
    {
      label: "Transfer Stock",
      icon: ArrowLeftRight,
      onPress: () => router.push(`/dashboard/inventory/${product.id}/transfer`),
    },
    {
      label: "View Movement History",
      icon: History,
      onPress: () =>
        router.push(`/dashboard/inventory/${product.id}?tab=Stock Movement`),
    },
    { label: "Print Barcode", icon: Printer, onPress: onBarcode },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
      {/* Product Information */}
      <div className="bg-[#faf9f7] rounded-xl border border-[#ede8e2] p-4 space-y-1">
        <App_Text variant="cardHeading" className="mb-3">
          Product Information
        </App_Text>
        {[
          { label: "Weight", value: product.weight },
          { label: "Dimensions", value: product.dimensions },
          { label: "Warranty", value: product.warranty },
          { label: "Brand", value: product.brand },
          { label: "Supplier", value: product.supplier },
          {
            label: "Cost Price",
            value: `₦${product.costPrice.toLocaleString()}`,
          },
          {
            label: "Selling Price",
            value: `₦${product.sellingPrice.toLocaleString()}`,
          },
        ].map(({ label, value }) => (
          <div
            key={label}
            className="flex items-center justify-between py-2 border-b border-[#ede8e2] last:border-0 gap-3"
          >
            <App_Text variant="tableCellMuted" className="shrink-0">
              {label}
            </App_Text>
            <App_Text variant="tableCell" className="font-medium text-right">
              {value}
            </App_Text>
          </div>
        ))}
      </div>

      {/* Inventory Summary donut */}
      <div className="bg-[#faf9f7] rounded-xl border border-[#ede8e2] p-4 space-y-3">
        <App_Text variant="cardHeading">Inventory Summary</App_Text>
        <div className="flex flex-col items-center gap-3">
          <div className="relative">
            <ChartContainer config={donutConfig} className="h-35 w-35">
              <PieChart>
                <ChartTooltip content={<ChartTooltipContent />} />
                <Pie
                  data={data}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={42}
                  outerRadius={65}
                  strokeWidth={0}
                >
                  {data.map((entry, i) => (
                    <Cell key={i} fill={entry.fill} />
                  ))}
                </Pie>
              </PieChart>
            </ChartContainer>
          </div>
          <div className="w-full space-y-2">
            {[
              {
                label: "Available",
                value: product.available,
                pct:
                  total > 0 ? Math.round((product.available / total) * 100) : 0,
                color: "#8f3d90",
              },
              {
                label: "Reserved",
                value: product.reserved,
                pct:
                  total > 0 ? Math.round((product.reserved / total) * 100) : 0,
                color: "#f4c430",
              },
              { label: "Low Stock", value: 0, pct: 0, color: "#c87941" },
              { label: "Out of Stock", value: 0, pct: 0, color: "#c0392b" },
            ].map(({ label, value, pct, color }) => (
              <div
                key={label}
                className="flex items-center justify-between text-xs"
              >
                <div className="flex items-center gap-2">
                  <span
                    className="w-2.5 h-2.5 rounded-full shrink-0"
                    style={{ backgroundColor: color }}
                  />
                  <App_Text variant="tableCellMuted">{label}</App_Text>
                </div>
                <App_Text variant="tableCell" className="font-medium">
                  {value} ({pct}%)
                </App_Text>
              </div>
            ))}
          </div>
        </div>
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
            <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
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
