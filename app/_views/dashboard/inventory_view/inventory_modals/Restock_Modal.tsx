"use client";

import { X } from "lucide-react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import App_Text from "@/components/app_ui/App_Text";
import App_Button from "@/components/app_ui/App_Button";
import App_Input from "@/components/app_ui/App_Input";
import App_Select from "@/components/app_ui/App_Select";
import App_Text_Area from "@/components/app_ui/App_Text_Area";
import { useRestockInventory } from "../inventory_hooks/useInventoryMutation";
import { InventoryProduct } from "../inventory_types";

type Props = { product: InventoryProduct; onClose: () => void };
type Form = {
  store: string;
  supplier: string;
  quantity: number;
  unitCost: number;
  invoiceNumber: string;
  date: string;
  notes: string;
};

const stores = [
  { label: "Main Warehouse", key: "main" },
  { label: "Lekki Showroom", key: "lekki" },
  { label: "Victoria Island Showroom", key: "vi" },
];
const suppliers = [
  { label: "Royal Furniture Co.", key: "royal" },
  { label: "Interior Hub Ltd.", key: "interior" },
  { label: "FurniCasa Furnitures", key: "furnicasa" },
];

const Restock_Modal = ({ product, onClose }: Props) => {
  const { mutate, isPending } = useRestockInventory();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<Form>({
    defaultValues: { quantity: 20, unitCost: product.costPrice },
  });
  const storeValue = watch("store") ?? "";
  const supplierValue = watch("supplier") ?? "";
  const qty = watch("quantity") ?? 0;
  const unitCost = watch("unitCost") ?? 0;
  const totalCost = qty * unitCost;

  const onSubmit = (data: Form) =>
    mutate(
      { ...data, productId: product.id, totalCost },
      { onSuccess: onClose },
    );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-md p-6 space-y-4">
        <div className="flex items-center justify-between">
          <App_Text variant="cardHeading" className="text-base">
            Restock Inventory
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
              value={storeValue}
              placeholder="Select store"
              title="Store *"
              onChange={(v) => setValue("store", v)}
              style="gap-1.5"
            />
            <App_Select
              data={suppliers}
              value={supplierValue}
              placeholder="Select supplier"
              title="Supplier *"
              onChange={(v) => setValue("supplier", v)}
              style="gap-1.5"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <App_Input
              name="quantity"
              register={register}
              errors={errors}
              placeholder="20"
              rules={{ required: "Quantity required" }}
            />
            <App_Input
              name="unitCost"
              register={register}
              errors={errors}
              placeholder="520000"
              rules={{ required: "Unit cost required" }}
            />
          </div>

          <div className="flex items-center justify-between p-3 bg-[#faf9f7] rounded-xl border border-[#ede8e2]">
            <App_Text variant="tableCellMuted">Total Cost</App_Text>
            <App_Text
              variant="tableCell"
              className="font-semibold text-primary"
            >
              R{totalCost.toLocaleString()}
            </App_Text>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <App_Input
              name="invoiceNumber"
              register={register}
              errors={errors}
              placeholder="INV-0062"
            />
            <App_Input
              name="date"
              register={register}
              errors={errors}
              placeholder="18 May 2024"
            />
          </div>
          <div className="space-y-1.5">
            <App_Text variant="tableCell" className="font-medium">
              Notes (Optional)
            </App_Text>
            <App_Text_Area
              name="notes"
              register={register}
              errors={errors}
              placeholder="Restocked 20 units of L-shaped sofa."
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
              text={isPending ? "Saving..." : "Receive Stock"}
              type="submit"
              btnStyle="flex-1 text-xs bg-primary text-white hover:bg-primary/90 rounded-xl py-2.5 h-auto"
            />
          </div>
        </form>
      </div>
    </div>
  );
};
export default Restock_Modal;
