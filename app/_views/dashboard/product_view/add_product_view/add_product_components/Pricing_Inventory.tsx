// components/products/add/steps/Step_Pricing.tsx
"use client";

import { UseFormReturn } from "react-hook-form";
import { ProductFormData } from "../add_product_types";
import App_Input from "@/components/app_ui/App_Input";
import App_Text from "@/components/app_ui/App_Text";

type Props = { form: UseFormReturn<ProductFormData> };

const Step_Pricing = ({ form }: Props) => {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = form;
  const price = watch("price") ?? 0;
  const costPrice = watch("costPrice") ?? 0;
  const margin =
    price > 0 ? Math.round(((price - costPrice) / price) * 100) : 0;

  return (
    <div className="space-y-6">
      <div>
        <App_Text variant="cardHeading" className="text-base mb-0.5">
          Pricing & Inventory
        </App_Text>
        <App_Text variant="pageSub">
          Set your product pricing and stock levels.
        </App_Text>
      </div>

      {/* Pricing */}
      <div className="bg-[#faf9f7] rounded-xl p-4 space-y-4 border border-[#ede8e2]">
        <App_Text variant="tableCell" className="font-semibold">
          Pricing
        </App_Text>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <App_Input
            name="price"
            register={register}
            errors={errors}
            placeholder="R 0.00"
            rules={{
              required: "Price is required",
              min: { value: 0, message: "Must be positive" },
            }}
          />
          <App_Input
            name="comparePrice"
            register={register}
            errors={errors}
            placeholder="R 0.00"
          />
          <App_Input
            name="costPrice"
            register={register}
            errors={errors}
            placeholder="R 0.00"
          />
          <div className="space-y-1.5">
            <label className="text-sm font-medium">Profit Margin</label>
            <div className="flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-2.5 bg-[#f5f2ee]">
              <App_Text
                variant="tableCell"
                className={
                  margin >= 0
                    ? "text-[#2e7d52] font-semibold"
                    : "text-[#c0392b] font-semibold"
                }
              >
                {margin}%
              </App_Text>
              <App_Text variant="tableCellMuted">auto-calculated</App_Text>
            </div>
          </div>
        </div>
      </div>

      {/* Inventory */}
      <div className="bg-[#faf9f7] rounded-xl p-4 space-y-4 border border-[#ede8e2]">
        <App_Text variant="tableCell" className="font-semibold">
          Inventory
        </App_Text>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <App_Input
            name="quantity"
            register={register}
            errors={errors}
            placeholder="0"
            rules={{
              required: "Quantity is required",
              min: { value: 0, message: "Must be positive" },
            }}
          />
          <App_Input
            name="lowStockThreshold"
            register={register}
            errors={errors}
            placeholder="5"
          />
        </div>

        <div className="flex flex-col gap-3 pt-1">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              {...register("trackInventory")}
              className="w-4 h-4 accent-primary rounded"
            />
            <div>
              <App_Text variant="tableCell" className="font-medium">
                Track Inventory
              </App_Text>
              <App_Text variant="tableCellMuted">
                Monitor stock levels for this product
              </App_Text>
            </div>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              {...register("allowBackorders")}
              className="w-4 h-4 accent-primary rounded"
            />
            <div>
              <App_Text variant="tableCell" className="font-medium">
                Allow Backorders
              </App_Text>
              <App_Text variant="tableCellMuted">
                Let customers order when out of stock
              </App_Text>
            </div>
          </label>
        </div>
      </div>
    </div>
  );
};

export default Step_Pricing;
