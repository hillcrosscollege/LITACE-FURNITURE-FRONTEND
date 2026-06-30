"use client";

import Image from "next/image";
import { CheckCircle2, Package, ExternalLink } from "lucide-react";
import App_Text from "@/components/app_ui/App_Text";
import { orderDetail } from "../../orders_view_data/orders_data";
import { useOrderContext } from "@/app/contexts/admin/Orders_Context";

const Tab_Order_Overview = () => {
  const { order } = useOrderContext();
  const {
    customer,
    items,
    summary,
    shippingAddress,
    shippingMethod,
    payment,
    timeline,
    notes,
  } = order!;

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
      {/* Left — main content */}
      <div className="xl:col-span-2 space-y-4">
        {/* Customer */}
        <div className="bg-[#faf9f7] rounded-xl border border-[#ede8e2] p-4 space-y-3">
          <App_Text variant="cardHeading">Customer</App_Text>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden bg-[#f0e8df] shrink-0">
              <Image
                src={customer.avatar}
                alt={customer.name}
                width={40}
                height={40}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <App_Text variant="tableCell" className="font-semibold">
                {customer.name}
              </App_Text>
              <App_Text variant="tableCellMuted">{customer.email}</App_Text>
              <App_Text variant="tableCellMuted">{customer.phone}</App_Text>
            </div>
          </div>
          <button
            type="button"
            className="text-xs text-primary hover:underline flex items-center gap-1"
          >
            <ExternalLink size={12} /> View Profile
          </button>
        </div>

        {/* Order Items */}
        <div className="bg-[#faf9f7] rounded-xl border border-[#ede8e2] p-4 space-y-3">
          <App_Text variant="cardHeading">Order Items</App_Text>
          <div className="space-y-0 divide-y divide-[#ede8e2]">
            {/* Header */}
            <div className="grid grid-cols-[2fr_1fr_1fr_1fr] gap-3 pb-2">
              {["Item", "Qty", "Price", "Total"].map((h) => (
                <App_Text key={h} variant="tableHeader">
                  {h}
                </App_Text>
              ))}
            </div>
            {items.map((item) => (
              <div
                key={item.id}
                className="grid grid-cols-[2fr_1fr_1fr_1fr] gap-3 py-3 items-center"
              >
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-lg bg-[#f0e8df] overflow-hidden shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={40}
                      height={40}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <App_Text variant="tableCell" className="font-medium">
                      {item.name}
                    </App_Text>
                    <App_Text variant="tableCellMuted">
                      SKU: {item.sku}
                    </App_Text>
                  </div>
                </div>
                <App_Text variant="tableCell">{item.qty}</App_Text>
                <App_Text variant="tableCell">
                  R {item.price.toLocaleString()}
                </App_Text>
                <App_Text variant="tableCell" className="font-semibold">
                  R {(item.price * item.qty).toLocaleString()}
                </App_Text>
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-[#faf9f7] rounded-xl border border-[#ede8e2] p-4 space-y-3">
          <App_Text variant="cardHeading">Order Summary</App_Text>
          <div className="space-y-2">
            {[
              {
                label: "Items Total",
                value: `R ${summary.itemsTotal.toLocaleString()}`,
              },
              {
                label: "Shipping Fee",
                value: `R ${summary.shippingFee.toLocaleString()}`,
              },
              {
                label: "Tax (7.5%)",
                value: `R ${summary.tax.toLocaleString()}`,
              },
              {
                label: "Discount",
                value:
                  summary.discount > 0
                    ? `-R ${summary.discount.toLocaleString()}`
                    : "—R 0",
              },
            ].map(({ label, value }) => (
              <div key={label} className="flex items-center justify-between">
                <App_Text variant="tableCellMuted">{label}</App_Text>
                <App_Text variant="tableCell">{value}</App_Text>
              </div>
            ))}
            <div className="flex items-center justify-between pt-2 border-t border-[#ede8e2]">
              <App_Text variant="cardHeading">Total Amount</App_Text>
              <App_Text variant="statValue" className="text-lg text-primary">
                R {summary.totalAmount.toLocaleString()}
              </App_Text>
            </div>
          </div>
        </div>

        {/* Bottom 3 columns */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Shipping Address */}
          <div className="bg-[#faf9f7] rounded-xl border border-[#ede8e2] p-4 space-y-2">
            <App_Text variant="cardHeading">Shipping Address</App_Text>
            <App_Text variant="tableCell" className="font-medium">
              {shippingAddress.name}
            </App_Text>
            <App_Text variant="tableCellMuted">
              {shippingAddress.address}
            </App_Text>
            <App_Text variant="tableCellMuted">{shippingAddress.city}</App_Text>
            <App_Text variant="tableCellMuted">
              {shippingAddress.phone}
            </App_Text>
          </div>

          {/* Shipping Method */}
          <div className="bg-[#faf9f7] rounded-xl border border-[#ede8e2] p-4 space-y-2">
            <App_Text variant="cardHeading">Shipping Method</App_Text>
            <App_Text variant="tableCell" className="font-medium">
              {shippingMethod.method}
            </App_Text>
            <App_Text variant="tableCellMuted">
              {shippingMethod.duration}
            </App_Text>
            <div className="flex items-center gap-1 mt-2">
              <App_Text variant="tableCellMuted">Tracking ID:</App_Text>
              <App_Text
                variant="tableCell"
                className="font-medium text-primary"
              >
                {shippingMethod.trackingId}
              </App_Text>
            </div>
            <button
              type="button"
              className="flex items-center gap-1 text-xs text-primary hover:underline mt-1"
            >
              <Package size={12} /> Track Package
            </button>
          </div>

          {/* Payment */}
          <div className="bg-[#faf9f7] rounded-xl border border-[#ede8e2] p-4 space-y-2">
            <App_Text variant="cardHeading">Payment Information</App_Text>
            <div className="space-y-1.5">
              {[
                { label: "Payment Method", value: payment.method },
                { label: "Transaction ID", value: payment.transactionId },
                { label: "Payment Status", value: payment.status },
              ].map(({ label, value }) => (
                <div key={label}>
                  <App_Text variant="tableCellMuted">{label}</App_Text>
                  <App_Text
                    variant="tableCell"
                    className={`font-medium ${value === "Paid" ? "text-[#157a45]" : ""}`}
                  >
                    {value}
                  </App_Text>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Order Notes */}
        <div className="bg-[#faf9f7] rounded-xl border border-[#ede8e2] p-4 space-y-3">
          <div className="flex items-center justify-between">
            <App_Text variant="cardHeading">Order Notes</App_Text>
            <button
              type="button"
              className="text-xs text-primary hover:underline"
            >
              + Add Note
            </button>
          </div>
          {notes.length === 0 ? (
            <App_Text variant="tableCellMuted">No notes added</App_Text>
          ) : (
            notes.map((note) => (
              <div key={note.id} className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-full overflow-hidden bg-[#f0e8df] shrink-0">
                  <Image
                    src={note.avatar}
                    alt={note.user}
                    width={28}
                    height={28}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <App_Text variant="tableCell" className="font-medium">
                      {note.user}
                    </App_Text>
                    <App_Text variant="tableCellMuted">({note.role})</App_Text>
                  </div>
                  <App_Text variant="tableCellMuted">{note.message}</App_Text>
                  <App_Text
                    variant="tableCellMuted"
                    className="text-[10px] mt-0.5"
                  >
                    {note.date}
                  </App_Text>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Right — Order Status timeline */}
      <div className="space-y-4">
        <div className="bg-white rounded-xl border border-[#ede8e2] shadow-sm p-4 space-y-4">
          <App_Text variant="cardHeading">Order Status</App_Text>
          <div className="flex flex-col gap-0 relative">
            <div className="absolute left-3.5 top-4 bottom-4 w-px bg-[#ede8e2]" />
            {timeline.map((event, i) => (
              <div
                key={event.id}
                className="flex items-start gap-3 py-3 relative"
              >
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 z-10 border-2 border-white ${
                    event.completed ? "bg-primary" : "bg-[#f5f2ee]"
                  }`}
                >
                  {event.completed ? (
                    <CheckCircle2 size={14} className="text-white" />
                  ) : (
                    <div className="w-2 h-2 rounded-full bg-[#d0c8c0]" />
                  )}
                </div>
                <div className="flex-1 pt-0.5">
                  <App_Text
                    variant="tableCell"
                    className={`font-medium ${event.completed ? "" : "text-muted-foreground"}`}
                  >
                    {event.label}
                  </App_Text>
                  <App_Text variant="tableCellMuted">{event.date}</App_Text>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tab_Order_Overview;
