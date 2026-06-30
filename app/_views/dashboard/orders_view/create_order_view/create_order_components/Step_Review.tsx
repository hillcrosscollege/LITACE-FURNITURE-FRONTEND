// components/orders/create/steps/Step_Review.tsx
"use client";

import Image from "next/image";
import { User, Package, Truck, CreditCard } from "lucide-react";
import App_Text from "@/components/app_ui/App_Text";
import {
  CreateOrderCustomer,
  CreateOrderItem,
  ShippingForm,
  PaymentForm,
} from "../../order_view_types";

const deliveryLabels: Record<string, string> = {
  standard: "Standard Delivery (3-5 Business Days)",
  express: "Express Delivery (1-2 Business Days)",
  pickup: "Local Pickup",
};

const paymentLabels: Record<string, string> = {
  bank_transfer: "Bank Transfer",
  card: "Credit / Debit Card",
  pay_on_delivery: "Pay on Delivery",
};

type Props = {
  customer: CreateOrderCustomer | null;
  orderItems: CreateOrderItem[];
  shippingData: ShippingForm;
  paymentData: PaymentForm;
  deliveryMethod: string;
  paymentMethod: string;
  subtotal: number;
  shippingFee: number;
  tax: number;
  total: number;
};

const ReviewSection = ({
  icon: Icon,
  title,
  children,
}: {
  icon: React.ElementType;
  title: string;
  children: React.ReactNode;
}) => (
  <div className="bg-[#faf9f7] rounded-xl border border-[#ede8e2] p-4 space-y-3">
    <div className="flex items-center gap-2">
      <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
        <Icon size={14} className="text-primary" />
      </div>
      <App_Text variant="cardHeading">{title}</App_Text>
    </div>
    {children}
  </div>
);

const Step_Review = ({
  customer,
  orderItems,
  shippingData,
  paymentData,
  deliveryMethod,
  paymentMethod,
  subtotal,
  shippingFee,
  tax,
  total,
}: Props) => {
  return (
    <div className="space-y-4">
      <div>
        <App_Text variant="cardHeading" className="text-base mb-0.5">
          Review Order
        </App_Text>
        <App_Text variant="pageSub">
          Review all details before placing the order.
        </App_Text>
      </div>

      {/* Customer */}
      <ReviewSection icon={User} title="Customer">
        {customer ? (
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full overflow-hidden bg-[#f0e8df] flex-shrink-0">
              <Image
                src={customer.avatar}
                alt={customer.name}
                width={36}
                height={36}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <App_Text variant="tableCell" className="font-medium">
                {customer.name}
              </App_Text>
              <App_Text variant="tableCellMuted">{customer.email}</App_Text>
              <App_Text variant="tableCellMuted">{customer.phone}</App_Text>
            </div>
          </div>
        ) : (
          <App_Text variant="tableCellMuted">No customer selected</App_Text>
        )}
      </ReviewSection>

      {/* Items */}
      <ReviewSection icon={Package} title="Order Items">
        <div className="flex flex-col gap-2">
          {orderItems.map((item) => (
            <div key={item.id} className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-[#f0e8df] overflow-hidden flex-shrink-0">
                <Image
                  src={item.image}
                  alt={item.name}
                  width={36}
                  height={36}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <App_Text variant="tableCell" className="font-medium truncate">
                  {item.name}
                </App_Text>
                <App_Text variant="tableCellMuted">Qty: {item.qty}</App_Text>
              </div>
              <App_Text
                variant="tableCell"
                className="font-semibold flex-shrink-0"
              >
                R {(item.price * item.qty).toLocaleString()}
              </App_Text>
            </div>
          ))}
        </div>
      </ReviewSection>

      {/* Shipping */}
      <ReviewSection icon={Truck} title="Shipping">
        <div className="space-y-1">
          <App_Text variant="tableCell" className="font-medium">
            {shippingData.fullName}
          </App_Text>
          <App_Text variant="tableCellMuted">{shippingData.address}</App_Text>
          <App_Text variant="tableCellMuted">
            {shippingData.city}, {shippingData.state}
          </App_Text>
          <App_Text variant="tableCellMuted">{shippingData.phone}</App_Text>
          <div className="pt-2 border-t border-[#ede8e2] mt-2">
            <App_Text variant="tableCellMuted">
              {deliveryLabels[deliveryMethod]} —{" "}
              <span className="font-medium text-[#1e1a17]">
                {shippingFee === 0
                  ? "Free"
                  : `R ${shippingFee.toLocaleString()}`}
              </span>
            </App_Text>
          </div>
        </div>
      </ReviewSection>

      {/* Payment */}
      <ReviewSection icon={CreditCard} title="Payment">
        <App_Text variant="tableCell" className="font-medium">
          {paymentLabels[paymentMethod]}
        </App_Text>
        {paymentData.note && (
          <App_Text variant="tableCellMuted">Note: {paymentData.note}</App_Text>
        )}
      </ReviewSection>

      {/* Total */}
      <div className="bg-white rounded-xl border border-[#ede8e2] shadow-sm p-4 space-y-2">
        {[
          { label: "Items Total", value: subtotal },
          { label: "Shipping Fee", value: shippingFee },
          { label: "Tax (7.5%)", value: tax },
        ].map(({ label, value }) => (
          <div key={label} className="flex items-center justify-between">
            <App_Text variant="tableCellMuted">{label}</App_Text>
            <App_Text variant="tableCell">R {value.toLocaleString()}</App_Text>
          </div>
        ))}
        <div className="flex items-center justify-between pt-3 border-t border-[#ede8e2]">
          <App_Text variant="cardHeading" className="text-base">
            Total Amount
          </App_Text>
          <App_Text variant="statValue" className="text-xl text-primary">
            R {total.toLocaleString()}
          </App_Text>
        </div>
      </div>
    </div>
  );
};

export default Step_Review;
