// components/products/add/steps/Step_SEO.tsx
"use client";

import App_Input from "@/components/app_ui/App_Input";
import App_Text from "@/components/app_ui/App_Text";
import { UseFormReturn } from "react-hook-form";
import { ProductFormData } from "../add_product_types";

type Props = { form: UseFormReturn<ProductFormData> };

const Step_SEO = ({ form }: Props) => {
  const {
    register,
    formState: { errors },
    watch,
  } = form;
  const metaDesc = watch("metaDescription") ?? "";

  return (
    <div className="space-y-6">
      <div>
        <App_Text variant="cardHeading" className="text-base mb-0.5">
          SEO & Settings
        </App_Text>
        <App_Text variant="pageSub">
          Optimize your product for search engines.
        </App_Text>
      </div>

      <div className="bg-[#faf9f7] rounded-xl p-4 space-y-4 border border-[#ede8e2]">
        <App_Text variant="tableCell" className="font-semibold">
          Search Engine Preview
        </App_Text>
        <div className="bg-white rounded-lg p-3 border border-[#ede8e2] space-y-0.5">
          <App_Text variant="tableCell" className="text-blue-600 font-medium">
            {watch("metaTitle") || "Product Title"}
          </App_Text>
          <App_Text variant="tableCellMuted">
            furnicasa.com/products/{watch("slug") || "product-slug"}
          </App_Text>
          <App_Text variant="tableCellMuted" className="text-xs line-clamp-2">
            {watch("metaDescription") || "Meta description will appear here..."}
          </App_Text>
        </div>
      </div>

      <div className="space-y-4">
        <App_Input
          name="metaTitle"
          register={register}
          errors={errors}
          placeholder="Enter meta title"
        />
        <App_Input
          name="slug"
          register={register}
          errors={errors}
          placeholder="product-url-slug"
        />
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">Meta Description</label>
            <App_Text
              variant="tableCellMuted"
              className={metaDesc.length > 160 ? "text-[#c0392b]" : ""}
            >
              {metaDesc.length}/160
            </App_Text>
          </div>
          <textarea
            {...register("metaDescription", {
              maxLength: { value: 160, message: "Max 160 characters" },
            })}
            placeholder="Enter meta description"
            rows={3}
            className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2.5 bg-white outline-none focus:border-primary resize-none transition-colors"
          />
        </div>
      </div>
    </div>
  );
};

export default Step_SEO;
