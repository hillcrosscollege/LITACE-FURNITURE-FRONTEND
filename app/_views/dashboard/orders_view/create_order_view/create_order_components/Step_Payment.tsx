// components/orders/create/steps/Step_Payment.tsx
"use client";

import { UseFormReturn } from "react-hook-form";
import { CreditCard, Building2, Truck } from "lucide-react";
import App_Text from "@/components/app_ui/App_Text";
import App_Text_Area from "@/components/app_ui/App_Text_Area";
import { PaymentForm } from "../../order_view_types";

const paymentOptions = [
  {
    id: "bank_transfer",
    label: "Bank Transfer",
    icon: Building2,
    description: "Direct bank transfer",
  },
  {
    id: "card",
    label: "Credit / Debit Card",
    icon: CreditCard,
    description: "Visa, Mastercard accepted",
  },
  {
    id: "pay_on_delivery",
    label: "Pay on Delivery",
    icon: Truck,
    description: "Cash on delivery",
  },
];

type Props = {
  form: UseFormReturn<PaymentForm>;
  paymentMethod: string;
  onMethodChange: (method: string) => void;
  subtotal: number;
  shippingFee: number;
  tax: number;
  total: number;
};

const Step_Payment = ({
  form,
  paymentMethod,
  onMethodChange,
  subtotal,
  shippingFee,
  tax,
  total,
}: Props) => {
  const {
    register,
    formState: { errors },
  } = form;

  return (
    <div className="flex flex-col lg:flex-row gap-5">
      {/* Left — payment method + note */}
      <div className="flex-1 space-y-5">
        <div>
          <App_Text variant="cardHeading" className="text-base mb-0.5">
            Payment Information
          </App_Text>
          <App_Text variant="pageSub">
            Choose payment method for this order.
          </App_Text>
        </div>

        <div className="space-y-3 bg-[#faf9f7] rounded-xl border border-[#ede8e2] p-4">
          <App_Text variant="tableCell" className="font-semibold">
            Payment Method
          </App_Text>
          <div className="flex flex-col gap-2">
            {paymentOptions.map((opt) => {
              const Icon = opt.icon;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => onMethodChange(opt.id)}
                  className={`flex items-center gap-3 p-3 rounded-xl border transition-colors text-left ${
                    paymentMethod === opt.id
                      ? "border-primary bg-primary/5"
                      : "border-[#ede8e2] bg-white hover:bg-[#faf9f7]"
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                      paymentMethod === opt.id
                        ? "border-primary"
                        : "border-gray-300"
                    }`}
                  >
                    {paymentMethod === opt.id && (
                      <div className="w-2 h-2 rounded-full bg-primary" />
                    )}
                  </div>
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      paymentMethod === opt.id
                        ? "bg-primary/10"
                        : "bg-[#f5f2ee]"
                    }`}
                  >
                    <Icon
                      size={15}
                      className={
                        paymentMethod === opt.id
                          ? "text-primary"
                          : "text-muted-foreground"
                      }
                    />
                  </div>
                  <div>
                    <App_Text variant="tableCell" className="font-medium">
                      {opt.label}
                    </App_Text>
                    <App_Text variant="tableCellMuted">
                      {opt.description}
                    </App_Text>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Note */}
        <div className="space-y-1.5">
          <App_Text variant="tableCell" className="font-medium">
            Order Note (optional)
          </App_Text>
          <App_Text_Area
            name="note"
            register={register}
            errors={errors}
            placeholder="Add any notes about this order..."
          />
        </div>
      </div>

      {/* Right — order summary */}
      <div className="w-full lg:w-72 flex-shrink-0">
        <div className="bg-white rounded-xl border border-[#ede8e2] shadow-sm p-4 space-y-3 sticky top-6">
          <App_Text variant="cardHeading">Order Summary</App_Text>
          <div className="space-y-2 pb-3 border-b border-[#ede8e2]">
            {[
              { label: "Items Total", value: subtotal },
              { label: "Shipping Fee", value: shippingFee },
              { label: "Tax (7.5%)", value: tax },
            ].map(({ label, value }) => (
              <div key={label} className="flex items-center justify-between">
                <App_Text variant="tableCellMuted">{label}</App_Text>
                <App_Text variant="tableCell">
                  ₦{value.toLocaleString()}
                </App_Text>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between">
            <App_Text variant="cardHeading">Total Amount</App_Text>
            <App_Text variant="statValue" className="text-lg text-primary">
              ₦{total.toLocaleString()}
            </App_Text>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step_Payment;
