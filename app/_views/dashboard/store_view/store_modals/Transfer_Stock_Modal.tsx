"use client";

import { X } from "lucide-react";
import { useForm } from "react-hook-form";
import App_Text from "@/components/app_ui/App_Text";
import App_Button from "@/components/app_ui/App_Button";
import App_Input from "@/components/app_ui/App_Input";
import App_Select from "@/components/app_ui/App_Select";
import App_Text_Area from "@/components/app_ui/App_Text_Area";
import { useTransferStock } from "../store_hooks/useStoreMutation";

type Props = { storeId?: string; onClose: () => void };
type Form = {
  product: string;
  fromStore: string;
  toStore: string;
  quantity: number;
  reason: string;
  notes: string;
};

const products = [
  { label: "Modern L-Shaped Sofa (SOF-LS-001)", key: "1" },
  { label: "Wooden Dining Set (DIN-WD-002)", key: "2" },
  { label: "Luxury Wooden Bed (BED-LX-003)", key: "3" },
];
const stores = [
  { label: "Main Warehouse", key: "1" },
  { label: "Lekki Showroom", key: "2" },
  { label: "Victoria Island Showroom", key: "3" },
  { label: "Abuja Showroom", key: "4" },
];
const reasons = [
  { label: "Balance stock", key: "balance" },
  { label: "Moving stock closer to demand area", key: "demand" },
  { label: "Other", key: "other" },
];

const Transfer_Stock_Modal = ({ storeId, onClose }: Props) => {
  const { mutate, isPending } = useTransferStock();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<Form>({ defaultValues: { quantity: 5 } });
  const productValue = watch("product") ?? "";
  const fromValue = watch("fromStore") ?? "";
  const toValue = watch("toStore") ?? "";
  const reasonValue = watch("reason") ?? "";
  const toOptions = stores.filter((s) => s.key !== fromValue);

  const onSubmit = (data: Form) => mutate(data, { onSuccess: onClose });

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
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <App_Select
            data={products}
            value={productValue}
            placeholder="Select product"
            title="Product *"
            onChange={(v) => setValue("product", v)}
            style="gap-1.5"
          />
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
          <div className="flex items-center gap-2">
            <div className="flex-1">
              <App_Input
                name="quantity"
                register={register}
                errors={errors}
                placeholder="5 units"
                rules={{ required: "Quantity required" }}
              />
            </div>
            <App_Text variant="tableCellMuted" className="shrink-0">
              Available: 18 units
            </App_Text>
          </div>
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
              Notes
            </App_Text>
            <App_Text_Area
              name="notes"
              register={register}
              errors={errors}
              placeholder="Moving stock to meet showroom demand."
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
