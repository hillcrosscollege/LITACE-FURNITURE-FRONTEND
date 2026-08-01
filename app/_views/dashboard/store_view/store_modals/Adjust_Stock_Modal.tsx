"use client";

import { X } from "lucide-react";
import { useForm } from "react-hook-form";
import App_Text from "@/components/app_ui/App_Text";
import App_Button from "@/components/app_ui/App_Button";
import App_Input from "@/components/app_ui/App_Input";
import App_Select from "@/components/app_ui/App_Select";
import App_Text_Area from "@/components/app_ui/App_Text_Area";
import { useAdjustStock } from "../store_hooks/useStoreMutation";

type Props = { storeId?: string; onClose: () => void };
type Form = {
  product: string;
  fromStore: string;
  adjustmentType: string;
  quantity: number;
  reason: string;
  notes: string;
};

const products = [
  { label: "Modern L-Shaped Sofa (SOF-LS-001)", key: "1" },
  { label: "Wooden Dining Set (DIN-WD-002)", key: "2" },
];
const stores = [
  { label: "Main Warehouse", key: "1" },
  { label: "Lekki Showroom", key: "2" },
  { label: "Victoria Island Showroom", key: "3" },
  { label: "Abuja Showroom", key: "4" },
];
const reasons = [
  { label: "Balance stock", key: "balance" },
  { label: "Damaged item", key: "damaged" },
  { label: "New stock received", key: "new_stock" },
  { label: "Sold / Customer Order", key: "sold" },
  { label: "Other", key: "other" },
];

const Adjust_Stock_Modal = ({ storeId, onClose }: Props) => {
  const { mutate, isPending } = useAdjustStock();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<Form>({
    defaultValues: { adjustmentType: "Increase Stock", quantity: 5 },
  });
  const productValue = watch("product") ?? "";
  const storeValue = watch("fromStore") ?? "";
  const typeValue = watch("adjustmentType") ?? "Increase Stock";
  const reasonValue = watch("reason") ?? "";

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
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <App_Select
            data={products}
            value={productValue}
            placeholder="Select product"
            title="Product *"
            onChange={(v) => setValue("product", v)}
            style="gap-1.5"
          />
          <App_Select
            data={stores}
            value={storeValue}
            placeholder="Select store"
            title="From Store *"
            onChange={(v) => setValue("fromStore", v)}
            style="gap-1.5"
          />
          <div className="space-y-1.5">
            <App_Text variant="tableCell" className="font-medium">
              Adjustment Type
            </App_Text>
            <div className="flex gap-4">
              {["Increase Stock", "Decrease Stock"].map((opt) => (
                <label
                  key={opt}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="radio"
                    checked={typeValue === opt}
                    onChange={() => setValue("adjustmentType", opt)}
                    className="accent-primary"
                  />
                  <App_Text
                    variant="tableCell"
                    className={
                      typeValue === opt ? "text-primary font-medium" : ""
                    }
                  >
                    {opt}
                  </App_Text>
                </label>
              ))}
            </div>
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
              Notes
            </App_Text>
            <App_Text_Area
              name="notes"
              register={register}
              errors={errors}
              placeholder="One unit damaged during delivery."
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
              text={isPending ? "Saving..." : "Save Changes"}
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
