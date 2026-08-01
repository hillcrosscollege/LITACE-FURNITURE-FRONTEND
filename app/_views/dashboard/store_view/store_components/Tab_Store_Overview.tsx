"use client";

import App_Text from "@/components/app_ui/App_Text";
import { Loader2 } from "lucide-react";
import { useStoreMetrics } from "../store_hooks/useStoreQueries";
import { Store } from "../store_types";

const days = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
] as const;

const Tab_Store_Overview = ({ store }: { store: Store }) => {
  const { data: metrics, isLoading } = useStoreMetrics(store.id);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
      {/* Store Information */}
      <div className="bg-[#faf9f7] rounded-xl border border-[#ede8e2] p-4 space-y-1">
        <App_Text variant="cardHeading" className="mb-3">
          Store Information
        </App_Text>
        {[
          { label: "Store Name", value: store.name },
          { label: "Store Code", value: store.storeCode },
          { label: "Store Type", value: store.storeType },
          { label: "Address", value: store.address },
          { label: "Phone", value: store.phone },
          { label: "Email", value: store.email },
          { label: "Manager", value: store.manager },
          { label: "Status", value: store.status },
          { label: "Created At", value: store.createdAt },
          { label: "Last Updated", value: store.lastUpdated },
        ].map(({ label, value }) => (
          <div
            key={label}
            className="flex items-start justify-between py-2 border-b border-[#ede8e2] last:border-0 gap-2"
          >
            <App_Text variant="tableCellMuted" className="shrink-0">
              {label}
            </App_Text>
            <App_Text
              variant="tableCell"
              className={`font-medium text-right ${value === "Active" ? "text-[#157a45]" : ""}`}
            >
              {value}
            </App_Text>
          </div>
        ))}
      </div>

      {/* Operating Hours */}
      <div className="bg-[#faf9f7] rounded-xl border border-[#ede8e2] p-4 space-y-1">
        <App_Text variant="cardHeading" className="mb-3">
          Operating Hours
        </App_Text>
        {days.map((day) => (
          <div
            key={day}
            className="flex items-center justify-between py-2 border-b border-[#ede8e2] last:border-0"
          >
            <App_Text variant="tableCellMuted" className="capitalize">
              {day}
            </App_Text>
            <App_Text
              variant="tableCell"
              className={`font-medium ${store.operatingHours[day] === "Closed" ? "text-[#c0392b]" : ""}`}
            >
              {store.operatingHours[day]}
            </App_Text>
          </div>
        ))}
      </div>

      {/* Store Metrics */}
      <div className="bg-[#faf9f7] rounded-xl border border-[#ede8e2] p-4 space-y-1">
        <App_Text variant="cardHeading" className="mb-3">
          Store Metrics
        </App_Text>
        {isLoading ? (
          <div className="flex justify-center py-8">
            <Loader2 size={18} className="text-primary animate-spin" />
          </div>
        ) : metrics ? (
          [
            {
              label: "Products Stored",
              value: metrics.productsStored.toLocaleString(),
            },
            {
              label: "Total Stock Units",
              value: metrics.totalStockUnits.toLocaleString(),
            },
            {
              label: "Inventory Value",
              value: `R${metrics.inventoryValue.toLocaleString()}`,
            },
            {
              label: "Avg Stock Turnover",
              value: `${metrics.avgStockTurnover}x`,
            },
            { label: "Last Stock Update", value: metrics.lastStockUpdate },
            { label: "Last Transfer", value: metrics.lastTransfer },
          ].map(({ label, value }) => (
            <div
              key={label}
              className="flex items-center justify-between py-2 border-b border-[#ede8e2] last:border-0 gap-2"
            >
              <App_Text variant="tableCellMuted" className="shrink-0">
                {label}
              </App_Text>
              <App_Text variant="tableCell" className="font-medium text-right">
                {value}
              </App_Text>
            </div>
          ))
        ) : null}
      </div>
    </div>
  );
};
export default Tab_Store_Overview;
