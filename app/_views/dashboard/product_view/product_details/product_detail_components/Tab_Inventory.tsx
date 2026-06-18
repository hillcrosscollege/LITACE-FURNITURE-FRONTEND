// components/products/details/tabs/Tab_Inventory.tsx
"use client";

import { useState } from "react";
import { Plus, AlertTriangle } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import App_Button from "@/components/app_ui/App_Button";
import App_Table from "@/components/app_ui/App_Table";
import App_Text from "@/components/app_ui/App_Text";
import {
  WarehouseStock,
  warehouseStatusStyles,
  StockHistoryItem,
  stockTypeStyles,
  warehouseStock,
  inventoryTabs,
  lowStockAlerts,
  stockHistory,
} from "../product_detail_data";

const warehouseColumns: ColumnDef<WarehouseStock>[] = [
  {
    accessorKey: "warehouse",
    header: () => <App_Text variant="tableHeader">Warehouse</App_Text>,
    cell: ({ row }) => (
      <App_Text variant="tableCell" className="font-medium">
        {row.getValue("warehouse")}
      </App_Text>
    ),
  },
  {
    accessorKey: "inStock",
    header: () => <App_Text variant="tableHeader">In Stock</App_Text>,
    cell: ({ row }) => (
      <App_Text variant="tableCell">{row.getValue("inStock")}</App_Text>
    ),
  },
  {
    accessorKey: "reserved",
    header: () => <App_Text variant="tableHeader">Reserved</App_Text>,
    cell: ({ row }) => (
      <App_Text variant="tableCell">{row.getValue("reserved")}</App_Text>
    ),
  },
  {
    accessorKey: "available",
    header: () => <App_Text variant="tableHeader">Available</App_Text>,
    cell: ({ row }) => (
      <App_Text variant="tableCell" className="font-semibold">
        {row.getValue("available")}
      </App_Text>
    ),
  },
  {
    accessorKey: "status",
    header: () => <App_Text variant="tableHeader">Status</App_Text>,
    cell: ({ row }) => {
      const status = row.getValue("status") as WarehouseStock["status"];
      return (
        <span
          className={`text-xs px-2.5 py-1 rounded-full font-medium ${warehouseStatusStyles[status]}`}
        >
          {status}
        </span>
      );
    },
  },
  {
    id: "actions",
    header: () => <App_Text variant="tableHeader">Actions</App_Text>,
    cell: () => (
      <App_Button
        text="Adjust"
        type="button"
        btnStyle="text-xs border border-[#e0dbd4] bg-white text-[#1e1a17] hover:bg-[#f5f2ee] rounded-lg px-3 py-1.5 h-auto"
      />
    ),
  },
];

const historyColumns: ColumnDef<StockHistoryItem>[] = [
  {
    accessorKey: "date",
    header: () => <App_Text variant="tableHeader">Date</App_Text>,
    cell: ({ row }) => (
      <App_Text variant="tableCell">{row.getValue("date")}</App_Text>
    ),
  },
  {
    accessorKey: "type",
    header: () => <App_Text variant="tableHeader">Type</App_Text>,
    cell: ({ row }) => {
      const type = row.getValue("type") as StockHistoryItem["type"];
      return (
        <span
          className={`text-xs px-2.5 py-1 rounded-full font-medium ${stockTypeStyles[type]}`}
        >
          {type}
        </span>
      );
    },
  },
  {
    accessorKey: "quantity",
    header: () => <App_Text variant="tableHeader">Quantity</App_Text>,
    cell: ({ row }) => {
      const qty = row.getValue("quantity") as number;
      return (
        <App_Text
          variant="tableCell"
          className={`font-semibold ${qty > 0 ? "text-[#2e7d52]" : "text-[#c0392b]"}`}
        >
          {qty > 0 ? `+${qty}` : qty}
        </App_Text>
      );
    },
  },
  {
    accessorKey: "note",
    header: () => <App_Text variant="tableHeader">Note</App_Text>,
    cell: ({ row }) => (
      <App_Text variant="tableCellMuted">{row.getValue("note")}</App_Text>
    ),
  },
];

const Tab_Inventory = () => {
  const [activeTab, setActiveTab] = useState("Current Stock");

  const totals = warehouseStock.reduce(
    (acc, w) => ({
      inStock: acc.inStock + w.inStock,
      reserved: acc.reserved + w.reserved,
      available: acc.available + w.available,
    }),
    { inStock: 0, reserved: 0, available: 0 },
  );

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <App_Text variant="cardHeading">Inventory Management</App_Text>
          <App_Text variant="tableCellMuted" className="mt-0.5">
            Track stock, incoming and outgoing inventory.
          </App_Text>
        </div>
        <App_Button
          text="Adjust Stock"
          icon={<Plus size={13} />}
          type="button"
          btnStyle="text-xs bg-primary text-white hover:bg-primary/90 rounded-lg px-3 py-2 h-auto"
        />
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-3 gap-3">
        {[
          {
            label: "Total In Stock",
            value: totals.inStock,
            color: "text-[#2e7d52]",
            bg: "bg-[#edf7f2]",
          },
          {
            label: "Reserved",
            value: totals.reserved,
            color: "text-[#8a6300]",
            bg: "bg-[#fdf5e0]",
          },
          {
            label: "Available",
            value: totals.available,
            color: "text-[#1a56c4]",
            bg: "bg-[#edf2fb]",
          },
        ].map((card) => (
          <div
            key={card.label}
            className={`${card.bg} rounded-xl p-3 border border-[#ede8e2]`}
          >
            <App_Text variant="tableCellMuted" className="mb-1">
              {card.label}
            </App_Text>
            <App_Text variant="statValue" className={`text-xl ${card.color}`}>
              {card.value}
            </App_Text>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="border border-[#ede8e2] rounded-2xl overflow-hidden">
        <div className="flex items-center border-b border-[#ede8e2] overflow-x-auto scrollbar-none px-4">
          {inventoryTabs.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`flex items-center gap-1.5 px-3 py-3 whitespace-nowrap border-b-2 transition-colors text-xs ${
                activeTab === tab
                  ? "border-primary text-primary font-medium"
                  : "border-transparent text-muted-foreground hover:text-[#1e1a17]"
              }`}
            >
              {tab}
              {tab === "Low Stock Alerts" && lowStockAlerts.length > 0 && (
                <span className="bg-[#fdecea] text-[#c0392b] text-[10px] px-1.5 py-0.5 rounded-full">
                  {lowStockAlerts.length}
                </span>
              )}
            </button>
          ))}
        </div>

        <div className="p-1">
          {activeTab === "Current Stock" && (
            <App_Table
              columns={warehouseColumns}
              data={warehouseStock}
              style="mt-0"
              childRowStyle="hover:bg-[#faf9f7]"
            />
          )}

          {activeTab === "Stock History" && (
            <App_Table
              columns={historyColumns}
              data={stockHistory}
              style="mt-0"
              childRowStyle="hover:bg-[#faf9f7]"
            />
          )}

          {activeTab === "Low Stock Alerts" && (
            <div className="p-3 space-y-3">
              {lowStockAlerts.map((alert) => (
                <div
                  key={alert.id}
                  className="flex items-center gap-3 p-3 rounded-xl bg-[#fdf5e0] border border-[#f5e0a0]"
                >
                  <AlertTriangle
                    size={16}
                    className="text-[#8a6300] flex-shrink-0"
                  />
                  <div className="flex-1">
                    <App_Text variant="tableCell" className="font-medium">
                      {alert.warehouse}
                    </App_Text>
                    <App_Text variant="tableCellMuted">
                      {alert.available} units available — threshold is{" "}
                      {alert.threshold}
                    </App_Text>
                  </div>
                  <App_Button
                    text="Restock"
                    type="button"
                    btnStyle="text-xs bg-[#8a6300] text-white hover:bg-[#6d4e00] rounded-lg px-3 py-1.5 h-auto"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Tab_Inventory;
