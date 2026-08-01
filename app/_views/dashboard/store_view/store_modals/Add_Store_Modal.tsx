"use client";

import { X, ChevronRight } from "lucide-react";
import { useForm } from "react-hook-form";
import App_Text from "@/components/app_ui/App_Text";
import App_Button from "@/components/app_ui/App_Button";
import App_Input from "@/components/app_ui/App_Input";
import App_Select from "@/components/app_ui/App_Select";
import { useAddStore } from "../store_hooks/useStoreMutation";

type Props = { onClose: () => void; isEdit?: boolean; defaultValues?: any };
type Form = {
  name: string;
  storeType: string;
  address: string;
  phone: string;
  email: string;
  managerId: string;
};

const storeTypes = [
  { label: "Warehouse", key: "Warehouse" },
  { label: "Showroom", key: "Showroom" },
  { label: "Retail", key: "Retail" },
];
const managers = [
  { label: "Tunde Adewale", key: "1" },
  { label: "Adaeze Obi", key: "2" },
  { label: "Emeka Okafor", key: "3" },
  { label: "Halima Yusuf", key: "4" },
];

const Add_Store_Modal = ({ onClose, isEdit = false, defaultValues }: Props) => {
  const { mutate: addStore, isPending } = useAddStore();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<Form>({ defaultValues });

  const typeValue = watch("storeType") ?? "";
  const managerValue = watch("managerId") ?? "";

  const onSubmit = (data: Form) =>
    addStore(data as any, { onSuccess: onClose });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-md max-h-[85vh] overflow-y-auto">
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#ede8e2] sticky top-0 bg-white z-10">
          <App_Text variant="cardHeading" className="text-base">
            {isEdit ? "Edit Store" : "Add New Store"}
          </App_Text>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-[#f5f2ee] text-muted-foreground"
          >
            <X size={16} />
          </button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <App_Input
              name="name"
              register={register}
              errors={errors}
              placeholder="Enter store name"
              rules={{ required: "Store name is required" }}
            />
            <App_Select
              data={storeTypes}
              value={typeValue}
              placeholder="Select store type"
              title="Store Type *"
              onChange={(v) => setValue("storeType", v)}
              style="gap-1.5"
            />
          </div>
          <App_Input
            name="address"
            register={register}
            errors={errors}
            placeholder="Enter store address"
            rules={{ required: "Address is required" }}
          />
          <div className="grid grid-cols-2 gap-3">
            <App_Input
              name="phone"
              register={register}
              errors={errors}
              placeholder="Enter phone number"
            />
            <App_Input
              name="email"
              register={register}
              errors={errors}
              placeholder="Enter email"
            />
          </div>
          <App_Select
            data={managers}
            value={managerValue}
            placeholder="Select manager"
            title="Manager *"
            onChange={(v) => setValue("managerId", v)}
            style="gap-1.5"
          />
          <button
            type="button"
            className="flex items-center justify-between w-full p-3 bg-[#faf9f7] rounded-xl border border-[#ede8e2] hover:bg-[#f5f2ee] transition-colors"
          >
            <App_Text variant="tableCell" className="font-medium">
              Operating Hours
            </App_Text>
            <App_Text
              variant="tableCellMuted"
              className="flex items-center gap-1"
            >
              Set operating hours <ChevronRight size={13} />
            </App_Text>
          </button>
          <div className="flex gap-3 pt-1">
            <App_Button
              text="Cancel"
              type="button"
              onPress={onClose}
              btnStyle="flex-1 text-xs border border-[#e0dbd4] bg-white text-[#1e1a17] hover:bg-[#f5f2ee] rounded-xl py-2.5 h-auto"
            />
            <App_Button
              text={
                isPending ? "Saving..." : isEdit ? "Update Store" : "Save Store"
              }
              type="submit"
              btnStyle="flex-1 text-xs bg-primary text-white hover:bg-primary/90 rounded-xl py-2.5 h-auto"
            />
          </div>
        </form>
      </div>
    </div>
  );
};
export default Add_Store_Modal;
