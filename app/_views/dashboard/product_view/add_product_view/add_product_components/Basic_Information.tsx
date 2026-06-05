// components/products/add/steps/Step_Basic_Info.tsx
"use client";

import { UseFormReturn } from "react-hook-form";
import {
  Wand2,
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  Link,
  AlignLeft,
  AlignCenter,
  AlignRight,
} from "lucide-react";

import { categories, brands } from "../add_product_data/add_product_data";
import { ProductFormData } from "../add_product_types";
import App_Text from "@/components/app_ui/App_Text";
import App_Input from "@/components/app_ui/App_Input";

type Props = { form: UseFormReturn<ProductFormData> };

const Step_Basic_Info = ({ form }: Props) => {
  const {
    register,
    formState: { errors },
    setValue,
    watch,
  } = form;
  const shortDesc = watch("shortDescription") ?? "";

  const generateSKU = () => {
    const name = watch("name") ?? "";
    const sku =
      "FC-" +
      name.toUpperCase().slice(0, 4).replace(/\s/g, "") +
      "-" +
      Math.floor(Math.random() * 900 + 100);
    setValue("sku", sku);
  };

  return (
    <div className="space-y-6">
      <div>
        <App_Text variant="cardHeading" className="text-base mb-0.5">
          Basic Information
        </App_Text>
        <App_Text variant="pageSub">
          Enter the core details about your product.
        </App_Text>
      </div>

      {/* Name + SKU */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <App_Input
          name="name"
          register={register}
          errors={errors}
          placeholder="Enter product name"
          rules={{ required: "Product name is required" }}
          containerStyle="flex-1"
        />

        <div className="flex-1 space-y-1">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium capitalize">SKU</label>
            <button
              type="button"
              onClick={generateSKU}
              className="flex items-center gap-1 text-[10px] text-primary hover:underline"
            >
              <Wand2 size={11} /> Auto-generate
            </button>
          </div>
          <App_Input
            name="sku"
            register={register}
            errors={errors}
            placeholder="Enter SKU"
            showLabel={false}
            rules={{ required: "SKU is required" }}
          />
        </div>
      </div>

      {/* Category + Brand */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-sm font-medium">Category</label>
          <select
            {...register("category", { required: "Category is required" })}
            className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2.5 bg-white outline-none focus:border-primary transition-colors"
          >
            <option value="">Select category</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          {errors.category && (
            <p className="text-xs text-destructive">
              {errors.category.message}
            </p>
          )}
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium">Brand</label>
          <select
            {...register("brand")}
            className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2.5 bg-white outline-none focus:border-primary transition-colors"
          >
            <option value="">Select brand</option>
            {brands.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Short description */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium">Short Description</label>
          <App_Text
            variant="tableCellMuted"
            className={shortDesc.length > 160 ? "text-[#c0392b]" : ""}
          >
            {shortDesc.length}/160
          </App_Text>
        </div>
        <textarea
          {...register("shortDescription", {
            maxLength: { value: 160, message: "Max 160 characters" },
          })}
          placeholder="Enter short description"
          rows={3}
          className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2.5 bg-white outline-none focus:border-primary resize-none transition-colors"
        />
        {errors.shortDescription && (
          <p className="text-xs text-destructive">
            {errors.shortDescription.message}
          </p>
        )}
      </div>

      {/* Full description with toolbar */}
      <div className="space-y-1.5">
        <label className="text-sm font-medium">Full Description</label>
        <div className="border border-gray-200 rounded-lg overflow-hidden focus-within:border-primary transition-colors">
          {/* Toolbar */}
          <div className="flex items-center gap-0.5 px-3 py-2 border-b border-gray-100 bg-[#faf9f7] flex-wrap">
            {[
              { icon: Bold, label: "Bold" },
              { icon: Italic, label: "Italic" },
              { icon: Underline, label: "Underline" },
              { icon: AlignLeft, label: "Align Left" },
              { icon: AlignCenter, label: "Align Center" },
              { icon: AlignRight, label: "Align Right" },
              { icon: List, label: "Bullet List" },
              { icon: ListOrdered, label: "Ordered List" },
              { icon: Link, label: "Insert Link" },
            ].map(({ icon: Icon, label }) => (
              <button
                key={label}
                type="button"
                title={label}
                className="p-1.5 rounded hover:bg-[#ede8e2] text-muted-foreground hover:text-[#1e1a17] transition-colors"
              >
                <Icon size={14} />
              </button>
            ))}
          </div>

          <textarea
            {...register("fullDescription")}
            placeholder="Enter full product description..."
            rows={6}
            className="w-full text-sm px-3 py-2.5 bg-white outline-none resize-none"
          />
        </div>
      </div>
    </div>
  );
};

export default Step_Basic_Info;
