"use client";

import { X } from "lucide-react";
import { useForm } from "react-hook-form";
import App_Text from "@/components/app_ui/App_Text";
import App_Button from "@/components/app_ui/App_Button";
import App_Input from "@/components/app_ui/App_Input";
import App_Select from "@/components/app_ui/App_Select";
import { useAddManager } from "../store_hooks/useStoreMutation";

type Props = { storeId: string; onClose: () => void };
type Form = { name: string; role: string; phone: string; email: string };

const roles = [
  { label: "Store Manager", key: "Store Manager" },
  { label: "Assistant Manager", key: "Assistant Manager" },
  { label: "Inventory Officer", key: "Inventory Officer" },
];

const Add_Manager_Modal = ({ storeId, onClose }: Props) => {
  const { mutate, isPending } = useAddManager();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<Form>();
  const roleValue = watch("role") ?? "";

  const onSubmit = (data: Form) =>
    mutate({ storeId, data }, { onSuccess: onClose });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 space-y-4">
        <div className="flex items-center justify-between">
          <App_Text variant="cardHeading" className="text-base">
            Add Manager
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
          <App_Input
            name="name"
            register={register}
            errors={errors}
            placeholder="Full name"
            rules={{ required: "Name is required" }}
          />
          <App_Select
            data={roles}
            value={roleValue}
            placeholder="Select role"
            title="Role *"
            onChange={(v) => setValue("role", v)}
            style="gap-1.5"
          />
          <App_Input
            name="phone"
            register={register}
            errors={errors}
            placeholder="Phone number"
          />
          <App_Input
            name="email"
            register={register}
            errors={errors}
            placeholder="Email address"
            rules={{ required: "Email is required" }}
          />
          <div className="flex gap-3 pt-1">
            <App_Button
              text="Cancel"
              type="button"
              onPress={onClose}
              btnStyle="flex-1 text-xs border border-[#e0dbd4] bg-white text-[#1e1a17] hover:bg-[#f5f2ee] rounded-xl py-2.5 h-auto"
            />
            <App_Button
              text={isPending ? "Adding..." : "Add Manager"}
              type="submit"
              btnStyle="flex-1 text-xs bg-primary text-white hover:bg-primary/90 rounded-xl py-2.5 h-auto"
            />
          </div>
        </form>
      </div>
    </div>
  );
};
export default Add_Manager_Modal;
