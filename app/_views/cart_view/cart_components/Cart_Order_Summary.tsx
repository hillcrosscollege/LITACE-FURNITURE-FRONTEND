"use client";
import App_Button from "@/components/app_ui/App_Button";
import App_Text from "@/components/app_ui/App_Text";
import { ArrowRight, ShieldCheck, Truck } from "lucide-react";
import React, { useState } from "react";

const Cart_Order_Summary = ({
  subtotal,
  tax,
  shipping,
  total,
}: {
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
}) => {
  const [coupon, setCoupon] = useState("");
  return (
    <div className="w-full lg:w-100 shrink-0 space-y-4">
      <div className="bg-white rounded-2xl border border-[#ede8e2] shadow-sm p-5 space-y-4">
        <App_Text variant="cardHeading">Order Summary</App_Text>

        <div className="space-y-3 border-b border-[#f5f2ee] pb-4">
          <div className="flex items-center justify-between">
            <App_Text variant="cardText">Subtotal</App_Text>
            <App_Text variant="cardText" className="font-medium">
              ₦{subtotal.toLocaleString()}
            </App_Text>
          </div>
          <div className="flex items-center justify-between">
            <App_Text variant="cardText">Shipping</App_Text>
            <App_Text variant="cardText" className="font-medium">
              ₦{shipping.toLocaleString()}
            </App_Text>
          </div>
          <div className="flex items-center justify-between">
            <App_Text variant="cardText">Tax (7.5%)</App_Text>
            <App_Text variant="cardText" className="font-medium">
              ₦{tax.toLocaleString()}
            </App_Text>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <App_Text variant="cardHeading" className="text-base">
            Total
          </App_Text>
          <App_Text variant="statValue" className="text-xl">
            ₦{total.toLocaleString()}
          </App_Text>
        </div>

        <App_Button
          text="Proceed to Checkout"
          icon={<ArrowRight size={14} />}
          btnStyle="w-full bg-primary text-white hover:bg-[#8b4513] rounded-xl py-3 h-auto text-sm font-medium justify-center"
        />

        <div className="flex items-center justify-center gap-2">
          <ShieldCheck size={14} className="text-muted-foreground" />
          <App_Text variant="cardText">
            Secure checkout. Your data is protected.
          </App_Text>
        </div>
      </div>

      {/* Coupon */}
      <div className="bg-white rounded-2xl border border-[#ede8e2] shadow-sm p-5 space-y-3">
        <App_Text variant="cardHeading">Have a coupon?</App_Text>
        <div className="flex gap-2">
          <input
            value={coupon}
            onChange={(e) => setCoupon(e.target.value)}
            placeholder="Enter coupon code"
            className="flex-1 text-xs border border-[#e0dbd4] rounded-lg px-3 py-2 bg-[#faf9f7] outline-none focus:border-[#a0522d]"
          />
          <App_Button
            text="Apply"
            btnStyle="text-xs border border-[#e0dbd4] bg-white text-[#1e1a17] hover:bg-[#f5f2ee] rounded-lg px-3 py-2 h-auto flex-shrink-0"
          />
        </div>
      </div>

      {/* Free shipping promo */}
      <div className="bg-[#fdf5e0] border border-[#f5e0a0] rounded-2xl p-4 flex items-center gap-3">
        <Truck size={18} className="text-[#8a6300] shrink-0" />
        <App_Text variant="sectionLabel" className="text-[#8a6300]">
          Free shipping on orders over ₦1,000,000
        </App_Text>
      </div>
    </div>
  );
};

export default Cart_Order_Summary;
