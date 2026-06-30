// components/orders/create/steps/Step_Shipping.tsx
"use client";

import App_Input from "@/components/app_ui/App_Input";
import App_Select from "@/components/app_ui/App_Select";
import App_Text from "@/components/app_ui/App_Text";
import { UseFormReturn } from "react-hook-form";
import { ShippingForm } from "../../order_view_types";

const nigerianStates = [
  { label: "Lagos", key: "lagos" },
  { label: "Abuja (FCT)", key: "abuja" },
  { label: "Rivers", key: "rivers" },
  { label: "Kano", key: "kano" },
  { label: "Ogun", key: "ogun" },
  { label: "Oyo", key: "oyo" },
];

const deliveryOptions = [
  {
    id: "standard",
    label: "Standard Delivery",
    duration: "3 - 5 Business Days",
    price: 15000,
  },
  {
    id: "express",
    label: "Express Delivery",
    duration: "1 - 2 Business Days",
    price: 30000,
  },
  {
    id: "pickup",
    label: "Local Pickup",
    duration: "Pick up from store",
    price: 0,
  },
];

type Props = {
  form: UseFormReturn<ShippingForm>;
  deliveryMethod: string;
  onMethodChange: (method: string) => void;
};

const Step_Shipping = ({ form, deliveryMethod, onMethodChange }: Props) => {
  const {
    register,
    formState: { errors },
    setValue,
    watch,
  } = form;
  const stateValue = watch("state") ?? "";

  return (
    <div className="space-y-5">
      <div>
        <App_Text variant="cardHeading" className="text-base mb-0.5">
          Shipping Information
        </App_Text>
        <App_Text variant="pageSub">
          Enter shipping address and choose delivery method.
        </App_Text>
      </div>

      {/* Address */}
      <div className="space-y-4 bg-[#faf9f7] rounded-xl border border-[#ede8e2] p-4">
        <App_Text variant="tableCell" className="font-semibold">
          Shipping Address
        </App_Text>

        <App_Input
          name="fullName"
          register={register}
          errors={errors}
          placeholder="Full name"
          rules={{ required: "Full name is required" }}
        />
        <App_Input
          name="address"
          register={register}
          errors={errors}
          placeholder="Street address"
          rules={{ required: "Address is required" }}
        />
        <div className="grid grid-cols-2 gap-3">
          <App_Input
            name="city"
            register={register}
            errors={errors}
            placeholder="City"
            rules={{ required: "City is required" }}
          />
          <App_Select
            data={nigerianStates}
            value={stateValue}
            placeholder="Select state"
            title="State"
            onChange={(val) => setValue("state", val)}
            style="gap-1.5"
          />
        </div>
        <App_Input
          name="phone"
          register={register}
          errors={errors}
          placeholder="Phone number"
          rules={{ required: "Phone is required" }}
        />
      </div>

      {/* Delivery method */}
      <div className="space-y-3 bg-[#faf9f7] rounded-xl border border-[#ede8e2] p-4">
        <App_Text variant="tableCell" className="font-semibold">
          Delivery Method
        </App_Text>
        <div className="flex flex-col gap-2">
          {deliveryOptions.map((opt) => (
            <button
              key={opt.id}
              type="button"
              onClick={() => onMethodChange(opt.id)}
              className={`flex items-center justify-between p-3 rounded-xl border transition-colors ${
                deliveryMethod === opt.id
                  ? "border-primary bg-primary/5"
                  : "border-[#ede8e2] bg-white hover:bg-[#faf9f7]"
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                    deliveryMethod === opt.id
                      ? "border-primary"
                      : "border-gray-300"
                  }`}
                >
                  {deliveryMethod === opt.id && (
                    <div className="w-2 h-2 rounded-full bg-primary" />
                  )}
                </div>
                <div className="text-left">
                  <App_Text variant="tableCell" className="font-medium">
                    {opt.label}
                  </App_Text>
                  <App_Text variant="tableCellMuted">{opt.duration}</App_Text>
                </div>
              </div>
              <App_Text
                variant="tableCell"
                className="font-semibold flex-shrink-0"
              >
                {opt.price === 0 ? "Free" : `R ${opt.price.toLocaleString()}`}
              </App_Text>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Step_Shipping;
