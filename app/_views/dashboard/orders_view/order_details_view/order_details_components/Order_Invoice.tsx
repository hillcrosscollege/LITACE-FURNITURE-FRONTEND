"use client";

import App_Text from "@/components/app_ui/App_Text";
import { orderDetail } from "../../orders_view_data/orders_data";
import { useOrderContext } from "@/app/contexts/admin/Orders_Context";

const Order_Invoice = () => {
  const { order } = useOrderContext();
  const { id, placedAt, customer, items, summary, shippingAddress } = order!;

  return (
    <div className="bg-white rounded-2xl border border-[#ede8e2] p-8 max-w-2xl mx-auto print:shadow-none">
      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-white font-bold text-sm">F</span>
          </div>
          <div>
            <App_Text variant="cardHeading">FurniCasa</App_Text>
            <App_Text variant="tableCellMuted">Furniture Store</App_Text>
          </div>
        </div>
        <div className="text-right">
          <App_Text variant="cardHeading">Invoice</App_Text>
          <App_Text variant="tableCellMuted">
            #{id.replace("#FC", "INV-")}
          </App_Text>
        </div>
      </div>

      {/* Bill To + Order Info */}
      <div className="grid grid-cols-2 gap-6 mb-8">
        <div className="space-y-1">
          <App_Text variant="tableHeader">Bill To</App_Text>
          <App_Text variant="tableCell" className="font-semibold">
            {customer.name}
          </App_Text>
          <App_Text variant="tableCellMuted">
            {shippingAddress.address}
          </App_Text>
          <App_Text variant="tableCellMuted">{shippingAddress.city}</App_Text>
          <App_Text variant="tableCellMuted">{customer.phone}</App_Text>
        </div>
        <div className="space-y-1 text-right">
          <App_Text variant="tableHeader">Order Date</App_Text>
          <App_Text variant="tableCell">{placedAt}</App_Text>
        </div>
      </div>

      {/* Items table */}
      <div className="border border-[#ede8e2] rounded-xl overflow-hidden mb-6">
        <div className="grid grid-cols-[2fr_1fr_1fr_1fr] gap-3 px-4 py-3 bg-[#faf9f7] border-b border-[#ede8e2]">
          {["Item", "Qty", "Price", "Total"].map((h) => (
            <App_Text key={h} variant="tableHeader">
              {h}
            </App_Text>
          ))}
        </div>
        {items.map((item, i) => (
          <div
            key={item.id}
            className={`grid grid-cols-[2fr_1fr_1fr_1fr] gap-3 px-4 py-3 items-center ${i < items.length - 1 ? "border-b border-[#f5f2ee]" : ""}`}
          >
            <App_Text variant="tableCell" className="font-medium">
              {item.name}
            </App_Text>
            <App_Text variant="tableCell">{item.qty}</App_Text>
            <App_Text variant="tableCell">
              ₦{item.price.toLocaleString()}
            </App_Text>
            <App_Text variant="tableCell" className="font-semibold">
              ₦{(item.price * item.qty).toLocaleString()}
            </App_Text>
          </div>
        ))}
      </div>

      {/* Totals */}
      <div className="flex justify-end mb-8">
        <div className="w-64 space-y-2">
          {[
            { label: "Items Total", value: summary.itemsTotal },
            { label: "Shipping Fee", value: summary.shippingFee },
            { label: "Tax (7.5%)", value: summary.tax },
          ].map(({ label, value }) => (
            <div key={label} className="flex items-center justify-between">
              <App_Text variant="tableCellMuted">{label}</App_Text>
              <App_Text variant="tableCell">₦{value.toLocaleString()}</App_Text>
            </div>
          ))}
          <div className="flex items-center justify-between pt-2 border-t border-[#ede8e2]">
            <App_Text variant="cardHeading">Total Amount</App_Text>
            <App_Text variant="statValue" className="text-primary text-lg">
              ₦{summary.totalAmount.toLocaleString()}
            </App_Text>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center pt-4 border-t border-[#ede8e2]">
        <App_Text variant="tableCellMuted">
          Thank you for shopping with FurniCasa!
        </App_Text>
      </div>
    </div>
  );
};

export default Order_Invoice;
