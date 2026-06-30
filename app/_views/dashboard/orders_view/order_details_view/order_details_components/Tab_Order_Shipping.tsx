// components/orders/details/tabs/Tab_Order_Shipping.tsx
"use client";

import App_Text from "@/components/app_ui/App_Text";
import { Package } from "lucide-react";
import { orderDetail } from "../../orders_view_data/orders_data";
import { useOrderContext } from "@/app/contexts/admin/Orders_Context";

const deliveryOptions = [
  {
    label: "Standard Delivery",
    duration: "3 - 5 Business Days",
    price: 15000,
    id: "standard",
  },
  {
    label: "Express Delivery",
    duration: "1 - 2 Business Days",
    price: 30000,
    id: "express",
  },
  {
    label: "Local Pickup",
    duration: "Pick up from store",
    price: 0,
    id: "pickup",
  },
];

const Tab_Order_Shipping = () => {
  const { order } = useOrderContext();
  const { shippingAddress, shippingMethod } = order!;
  return (
    <div className="space-y-4 max-w-2xl">
      <App_Text variant="cardHeading">Shipping Information</App_Text>

      {/* Address */}
      <div className="bg-[#faf9f7] rounded-xl border border-[#ede8e2] p-4 space-y-2">
        <App_Text variant="tableCell" className="font-semibold">
          Shipping Address
        </App_Text>
        <App_Text variant="tableCell" className="font-medium">
          {shippingAddress.name}
        </App_Text>
        <App_Text variant="tableCellMuted">{shippingAddress.address}</App_Text>
        <App_Text variant="tableCellMuted">{shippingAddress.city}</App_Text>
        <App_Text variant="tableCellMuted">{shippingAddress.phone}</App_Text>
      </div>

      {/* Delivery method */}
      <div className="bg-[#faf9f7] rounded-xl border border-[#ede8e2] p-4 space-y-3">
        <App_Text variant="tableCell" className="font-semibold">
          Delivery Method
        </App_Text>
        <div className="space-y-2">
          {deliveryOptions.map((opt) => (
            <div
              key={opt.id}
              className={`flex items-center justify-between p-3 rounded-xl border transition-colors ${
                opt.label === shippingMethod.method
                  ? "border-primary bg-primary/5"
                  : "border-[#ede8e2] bg-white"
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                    opt.label === shippingMethod.method
                      ? "border-primary"
                      : "border-gray-300"
                  }`}
                >
                  {opt.label === shippingMethod.method && (
                    <div className="w-2 h-2 rounded-full bg-primary" />
                  )}
                </div>
                <div>
                  <App_Text variant="tableCell" className="font-medium">
                    {opt.label}
                  </App_Text>
                  <App_Text variant="tableCellMuted">{opt.duration}</App_Text>
                </div>
              </div>
              <App_Text variant="tableCell" className="font-semibold">
                {opt.price === 0 ? "Free" : `R ${opt.price.toLocaleString()}`}
              </App_Text>
            </div>
          ))}
        </div>
      </div>

      {/* Tracking */}
      <div className="bg-[#faf9f7] rounded-xl border border-[#ede8e2] p-4 space-y-2">
        <App_Text variant="tableCell" className="font-semibold">
          Tracking
        </App_Text>
        <div className="flex items-center gap-2">
          <App_Text variant="tableCellMuted">Tracking ID:</App_Text>
          <App_Text variant="tableCell" className="font-medium text-primary">
            {shippingMethod.trackingId}
          </App_Text>
        </div>
        <button
          type="button"
          className="flex items-center gap-1.5 text-xs text-primary hover:underline"
        >
          <Package size={13} /> Track Package
        </button>
      </div>
    </div>
  );
};

export default Tab_Order_Shipping;
