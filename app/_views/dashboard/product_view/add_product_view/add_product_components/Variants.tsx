// components/products/add/steps/Step_Variants.tsx
"use client";

import App_Button from "@/components/app_ui/App_Button";
import App_Text from "@/components/app_ui/App_Text";
import { Plus } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { ProductFormData } from "../add_product_types";

type Props = { form: UseFormReturn<ProductFormData> };

const Step_Variants = ({ form }: Props) => {
  const { register } = form;
  return (
    <div className="space-y-6">
      <div>
        <App_Text variant="cardHeading" className="text-base mb-0.5">
          Variants
        </App_Text>
        <App_Text variant="pageSub">
          Add product variations like color, size or material.
        </App_Text>
      </div>

      <label className="flex items-center gap-3 cursor-pointer p-4 rounded-xl border border-[#ede8e2] bg-[#faf9f7]">
        <input
          type="checkbox"
          {...register("hasVariants")}
          className="w-4 h-4 accent-primary"
        />
        <div>
          <App_Text variant="tableCell" className="font-medium">
            This product has variants
          </App_Text>
          <App_Text variant="tableCellMuted">
            Enable if product comes in different options
          </App_Text>
        </div>
      </label>

      <div className="flex flex-col items-center justify-center py-16 border-2 border-dashed border-[#ede8e2] rounded-2xl gap-3">
        <App_Text variant="tableCellMuted">No variants added yet</App_Text>
        <App_Button
          text="Add Variant"
          icon={<Plus size={13} />}
          btnStyle="text-xs bg-primary text-white hover:bg-primary/90 rounded-lg px-4 py-2 h-auto"
        />
      </div>
    </div>
  );
};

export default Step_Variants;
