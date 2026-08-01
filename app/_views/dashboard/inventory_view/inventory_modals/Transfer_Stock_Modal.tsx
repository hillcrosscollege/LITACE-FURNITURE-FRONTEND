"use client";

import { X } from "lucide-react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import App_Text from "@/components/app_ui/App_Text";
import App_Button from "@/components/app_ui/App_Button";
import App_Input from "@/components/app_ui/App_Input";
import App_Select from "@/components/app_ui/App_Select";
import App_Text_Area from "@/components/app_ui/App_Text_Area";
import { useTransferStock } from "../inventory_hooks/useInventoryMutation";
import { InventoryProduct } from "../inventory_types";

type Props = { product: InventoryProduct; onClose: () => void };
type Form = {
  fromStore: string;
  toStore: string;
  quantity: number;
  reason: string;
  notes: string;
};

const stores = [
  { label: "Main Warehouse", key: "main" },
  { label: "Lekki Showroom", key: "lekki" },
  { label: "Victoria Island Showroom", key: "vi" },
];
const reasons = [
  { label: "Moving stock closer to demand area", key: "demand" },
  { label: "Balance stock levels", key: "balance" },
  { label: "Other", key: "other" },
];

const Transfer_Stock_Modal = ({ product, onClose }: Props) => {
  const { mutate, isPending } = useTransferStock();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<Form>({ defaultValues: { quantity: 5 } });
  const fromValue = watch("fromStore") ?? "";
  const toValue = watch("toStore") ?? "";
  const reasonValue = watch("reason") ?? "";

  const toOptions = stores.filter((s) => s.key !== fromValue);

  const onSubmit = (data: Form) =>
    mutate({ ...data, productId: product.id }, { onSuccess: onClose });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-md p-6 space-y-4">
        <div className="flex items-center justify-between">
          <App_Text variant="cardHeading" className="text-base">
            Transfer Stock
          </App_Text>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-[#f5f2ee] text-muted-foreground"
          >
            <X size={16} />
          </button>
        </div>

        <div className="flex items-center gap-3 p-3 bg-[#faf9f7] rounded-xl border border-[#ede8e2]">
          <div className="w-12 h-12 rounded-lg bg-[#f0e8df] overflow-hidden shrink-0">
            <Image
              src={product.image}
              alt={product.name}
              width={48}
              height={48}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <App_Text variant="tableCell" className="font-semibold">
              {product.name}
            </App_Text>
            <App_Text variant="tableCellMuted">SKU: {product.sku}</App_Text>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <App_Select
              data={stores}
              value={fromValue}
              placeholder="From Store *"
              title="From Store *"
              onChange={(v) => {
                setValue("fromStore", v);
                setValue("toStore", "");
              }}
              style="gap-1.5"
            />
            <App_Select
              data={toOptions}
              value={toValue}
              placeholder="To Store *"
              title="To Store *"
              onChange={(v) => setValue("toStore", v)}
              style="gap-1.5"
            />
          </div>
          <App_Input
            name="quantity"
            register={register}
            errors={errors}
            placeholder="5 units"
            rules={{ required: "Quantity required" }}
          />
          <App_Select
            data={reasons}
            value={reasonValue}
            placeholder="Select reason"
            title="Reason *"
            onChange={(v) => setValue("reason", v)}
            style="gap-1.5"
          />
          <div className="space-y-1.5">
            <App_Text variant="tableCell" className="font-medium">
              Notes (Optional)
            </App_Text>
            <App_Text_Area
              name="notes"
              register={register}
              errors={errors}
              placeholder="Moving stock closer to demand area."
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
              text={isPending ? "Transferring..." : "Transfer Stock"}
              type="submit"
              btnStyle="flex-1 text-xs bg-primary text-white hover:bg-primary/90 rounded-xl py-2.5 h-auto"
            />
          </div>
        </form>
      </div>
    </div>
  );
};
export default Transfer_Stock_Modal;
