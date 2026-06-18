"use client";

import { X } from "lucide-react";
import { useForm } from "react-hook-form";
import Image from "next/image";
import App_Button from "@/components/app_ui/App_Button";
import App_Input from "@/components/app_ui/App_Input";
import App_Select from "@/components/app_ui/App_Select";
import App_Text from "@/components/app_ui/App_Text";
import App_Text_Area from "@/components/app_ui/App_Text_Area";
import { useAdjustStock } from "../inventory_hooks/useInventoryQueries";
import { InventoryProduct } from "../inventory_types";

type Props = { product: InventoryProduct; onClose: () => void };
type Form = { type: string; qty: number; reason: string; note: string };

const reasons = [
  { label: "New stock received", key: "new_stock" },
  { label: "Sold / Customer Order", key: "sold" },
  { label: "Damaged unit", key: "damaged" },
  { label: "Stock count correction", key: "correction" },
  { label: "Other", key: "other" },
];

const Adjust_Stock_Modal = ({ product, onClose }: Props) => {
  const { mutate: adjustStock, isPending } = useAdjustStock();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<Form>({
    defaultValues: { type: "Increase Stock", qty: 1 },
  });

  const typeValue = watch("type") ?? "Increase Stock";
  const reasonValue = watch("reason") ?? "";

  const onSubmit = (data: Form) => {
    adjustStock(
      {
        productId: product.id,
        type: data.type as any,
        qty: data.qty,
        reason: data.reason,
        note: data.note,
      },
      { onSuccess: onClose },
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-md p-6 space-y-5">
        <div className="flex items-center justify-between">
          <App_Text variant="cardHeading" className="text-base">
            Adjust Stock
          </App_Text>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-[#f5f2ee] text-muted-foreground"
          >
            <X size={16} />
          </button>
        </div>

        {/* Product info */}
        <div className="flex items-center gap-3 p-3 bg-[#faf9f7] rounded-xl border border-[#ede8e2]">
          <div className="w-10 h-10 rounded-lg bg-[#f0e8df] overflow-hidden shrink-0">
            <Image
              src={product.image}
              alt={product.name}
              width={40}
              height={40}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <App_Text variant="tableCell" className="font-medium">
              {product.name}
            </App_Text>
            <App_Text variant="tableCellMuted">SKU: {product.sku}</App_Text>
            <App_Text variant="tableCellMuted">
              Available Stock: {product.available} Units
            </App_Text>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Adjustment Type */}
          <div className="space-y-1.5">
            <App_Text variant="tableCell" className="font-medium">
              Adjustment Type
            </App_Text>
            <App_Select
              data={[
                { label: "Decrease Stock", key: "Decrease Stock" },
                { label: "Increase Stock", key: "Increase Stock" },
              ]}
              value={typeValue}
              placeholder="Select type"
              title=""
              onChange={(val) => setValue("type", val)}
              style="gap-0"
            />
          </div>

          <App_Input
            name="qty"
            register={register}
            errors={errors}
            placeholder="Enter quantity"
            rules={{
              required: "Quantity is required",
              min: { value: 1, message: "Must be at least 1" },
            }}
          />

          <App_Select
            data={reasons}
            value={reasonValue}
            placeholder="Select a reason"
            title="Reason"
            onChange={(val) => setValue("reason", val)}
            style="gap-1.5"
          />

          <div className="space-y-1.5">
            <App_Text variant="tableCell" className="font-medium">
              Notes (Optional)
            </App_Text>
            <App_Text_Area
              name="note"
              register={register}
              errors={errors}
              placeholder="Add a note..."
            />
          </div>

          <div className="flex gap-3 pt-1">
            <App_Button
              text="Cancel"
              type="button"
              onPress={onClose}
              btnStyle="flex-1 text-xs border border-[#e0dbd4] bg-white text-[#1e1a17] hover:bg-[#f5f2ee] rounded-xl py-2.5 h-auto"
            />
            <App_Button
              text={isPending ? "Updating..." : "Update Stock"}
              type="submit"
              btnStyle="flex-1 text-xs bg-primary text-white hover:bg-primary/90 rounded-xl py-2.5 h-auto"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Adjust_Stock_Modal;
