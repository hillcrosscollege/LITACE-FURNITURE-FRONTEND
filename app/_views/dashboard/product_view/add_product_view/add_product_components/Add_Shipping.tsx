// components/products/add/steps/Step_Shipping.tsx
"use client";

import App_Input from "@/components/app_ui/App_Input";
import App_Text from "@/components/app_ui/App_Text";
import { UseFormReturn } from "react-hook-form";
import { shippingClasses } from "../add_product_data/add_product_data";
import { ProductFormData } from "../add_product_types";

type Props = { form: UseFormReturn<ProductFormData> };

const Step_Shipping = ({ form }: Props) => {
  const {
    register,
    formState: { errors },
  } = form;
  return (
    <div className="space-y-6">
      <div>
        <App_Text variant="cardHeading" className="text-base mb-0.5">
          Shipping
        </App_Text>
        <App_Text variant="pageSub">
          Set weight, dimensions and shipping preferences.
        </App_Text>
      </div>

      <div className="bg-[#faf9f7] rounded-xl p-4 space-y-4 border border-[#ede8e2]">
        <App_Text variant="tableCell" className="font-semibold">
          Weight & Dimensions
        </App_Text>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <App_Input
            name="weight"
            register={register}
            errors={errors}
            placeholder="kg"
          />
          <App_Input
            name="length"
            register={register}
            errors={errors}
            placeholder="cm"
          />
          <App_Input
            name="width"
            register={register}
            errors={errors}
            placeholder="cm"
          />
          <App_Input
            name="height"
            register={register}
            errors={errors}
            placeholder="cm"
          />
        </div>
      </div>

      <div className="bg-[#faf9f7] rounded-xl p-4 space-y-4 border border-[#ede8e2]">
        <App_Text variant="tableCell" className="font-semibold">
          Shipping Options
        </App_Text>
        <div className="space-y-1.5">
          <label className="text-sm font-medium">Shipping Class</label>
          <select
            {...register("shippingClass")}
            className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2.5 bg-white outline-none focus:border-primary transition-colors"
          >
            <option value="">Select shipping class</option>
            {shippingClasses.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            {...register("freeShipping")}
            className="w-4 h-4 accent-primary rounded"
          />
          <div>
            <App_Text variant="tableCell" className="font-medium">
              Free Shipping
            </App_Text>
            <App_Text variant="tableCellMuted">
              Offer free shipping on this product
            </App_Text>
          </div>
        </label>
      </div>
    </div>
  );
};

export default Step_Shipping;
