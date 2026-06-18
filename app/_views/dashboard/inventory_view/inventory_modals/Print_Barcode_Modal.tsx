"use client";

import App_Button from "@/components/app_ui/App_Button";
import App_Text from "@/components/app_ui/App_Text";
import { X, Download } from "lucide-react";
import { InventoryProduct } from "../inventory_types";

type Props = { product: InventoryProduct; onClose: () => void };

const Print_Barcode_Modal = ({ product, onClose }: Props) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
    <div
      className="absolute inset-0 bg-black/40 backdrop-blur-sm"
      onClick={onClose}
    />
    <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 space-y-5 text-center">
      <div className="flex items-center justify-between">
        <App_Text variant="cardHeading" className="text-base">
          Print Barcode
        </App_Text>
        <button
          type="button"
          onClick={onClose}
          className="p-1.5 rounded-lg hover:bg-[#f5f2ee] text-muted-foreground"
        >
          <X size={16} />
        </button>
      </div>

      <App_Text variant="cardHeading" className="text-lg">
        {product.name}
      </App_Text>
      <App_Text variant="tableCellMuted">SKU: {product.sku}</App_Text>

      {/* Barcode visual */}
      <div className="bg-white border border-[#ede8e2] rounded-xl p-4 space-y-2">
        <div className="flex justify-center gap-px h-16">
          {Array.from({ length: 60 }).map((_, i) => (
            <div
              key={i}
              className="bg-black"
              style={{
                width: `${Math.random() > 0.5 ? 2 : 1}px`,
                opacity: Math.random() > 0.3 ? 1 : 0,
              }}
            />
          ))}
        </div>
        <App_Text
          variant="tableCellMuted"
          className="font-mono text-xs tracking-widest"
        >
          {product.sku}
        </App_Text>
      </div>

      <div className="space-y-1">
        <App_Text variant="tableCell" className="font-medium">
          Price: ₦{product.sellingPrice.toLocaleString()}
        </App_Text>
        <App_Text variant="tableCellMuted">
          Available: {product.available} Units
        </App_Text>
      </div>

      <div className="flex gap-3">
        <App_Button
          text="Download / Print"
          icon={<Download size={13} />}
          type="button"
          onPress={() => window.print()}
          btnStyle="flex-1 text-xs bg-primary text-white hover:bg-primary/90 rounded-xl py-2.5 h-auto"
        />
        <App_Button
          text="Close"
          type="button"
          onPress={onClose}
          btnStyle="text-xs border border-[#e0dbd4] bg-white text-[#1e1a17] hover:bg-[#f5f2ee] rounded-lg px-4 py-2.5 h-auto"
        />
      </div>
    </div>
  </div>
);

export default Print_Barcode_Modal;
