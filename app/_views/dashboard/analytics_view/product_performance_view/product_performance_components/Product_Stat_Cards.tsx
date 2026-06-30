"use client";

import { useRouter } from "next/navigation";
import {
  Package,
  TrendingUp,
  ShoppingBag,
  AlertTriangle,
  XCircle,
} from "lucide-react";
import App_Text from "@/components/app_ui/App_Text";
import { ProductPerfStats } from "../product_performance_types";

const Product_Stat_Cards = ({ stats }: { stats: ProductPerfStats }) => {
  const router = useRouter();

  return (
    <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
      <div className="bg-white rounded-2xl border border-[#ede8e2] shadow-sm p-4 space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-primary/10">
            <Package size={16} className="text-primary" />
          </div>
          <App_Text variant="tableCellMuted">Total Products</App_Text>
        </div>
        <App_Text variant="statValue" className="text-2xl">
          {stats.totalProducts.value}
        </App_Text>
        <App_Text variant="tableCellMuted" className="text-[#2e7d52]">
          ↑ {stats.totalProducts.change}% vs 5 – 11 May
        </App_Text>
      </div>

      <div className="bg-white rounded-2xl border border-[#ede8e2] shadow-sm p-4 space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-[#edf7f2]">
            <TrendingUp size={16} className="text-[#2e7d52]" />
          </div>
          <App_Text variant="tableCellMuted">Top Selling Product</App_Text>
        </div>
        <App_Text variant="statValue" className="text-base leading-tight">
          {stats.topSellingProduct.value}
        </App_Text>
        <App_Text variant="tableCellMuted">
          {stats.topSellingProduct.subLabel}
        </App_Text>
      </div>

      <div className="bg-white rounded-2xl border border-[#ede8e2] shadow-sm p-4 space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-[#fdf0e6]">
            <ShoppingBag size={16} className="text-[#c87941]" />
          </div>
          <App_Text variant="tableCellMuted">Products Sold</App_Text>
        </div>
        <App_Text variant="statValue" className="text-2xl">
          {stats.productsSold.value}
        </App_Text>
        <App_Text variant="tableCellMuted" className="text-[#2e7d52]">
          ↑ {stats.productsSold.change}% vs 5 – 11 May
        </App_Text>
      </div>

      <div className="bg-white rounded-2xl border border-[#ede8e2] shadow-sm p-4 space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-[#edf2fb]">
            <AlertTriangle size={16} className="text-[#3266ad]" />
          </div>
          <App_Text variant="tableCellMuted">Low Performing Products</App_Text>
        </div>
        <App_Text variant="statValue" className="text-2xl">
          {stats.lowPerformingProducts.value}
        </App_Text>
        <App_Text variant="tableCellMuted" className="text-[#c0392b]">
          ↓ {stats.lowPerformingProducts.change} vs 5 – 11 May
        </App_Text>
      </div>

      <div className="bg-white rounded-2xl border border-[#ede8e2] shadow-sm p-4 space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-[#fdecea]">
            <XCircle size={16} className="text-[#c0392b]" />
          </div>
          <App_Text variant="tableCellMuted">Out of Stock Products</App_Text>
        </div>
        <App_Text variant="statValue" className="text-2xl">
          {stats.outOfStockProducts.value}
        </App_Text>
        <button
          type="button"
          onClick={() => router.push("/dashboard/inventory")}
          className="text-xs text-primary hover:underline"
        >
          View inventory
        </button>
      </div>
    </div>
  );
};

export default Product_Stat_Cards;
