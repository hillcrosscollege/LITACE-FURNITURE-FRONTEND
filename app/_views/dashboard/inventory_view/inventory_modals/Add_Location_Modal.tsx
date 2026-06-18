"use client";

import { X } from "lucide-react";
import { useForm } from "react-hook-form";
import { useAddLocation } from "../inventory_hooks/useInventoryQueries";
import App_Button from "@/components/app_ui/App_Button";
import App_Input from "@/components/app_ui/App_Input";
import App_Text from "@/components/app_ui/App_Text";
import App_Text_Area from "@/components/app_ui/App_Text_Area";

type Props = { onClose: () => void };
type Form = { name: string; address: string; manager: string; notes: string };

const Add_Location_Modal = ({ onClose }: Props) => {
  const { mutate: addLocation, isPending } = useAddLocation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Form>();

  const onSubmit = (data: Form) => {
    addLocation(
      {
        name: data.name,
        address: data.address,
        manager: data.manager,
        notes: data.notes,
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
            Add Location
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
            placeholder="Location Name"
            rules={{ required: "Location name is required" }}
          />

          <div className="space-y-1.5">
            <App_Text variant="tableCell" className="font-medium">
              Address
            </App_Text>
            <App_Text_Area
              name="address"
              register={register}
              errors={errors}
              placeholder="12 Furniture Street, Ibadan, Oyo State"
              rules={{ required: "Address is required" }}
              className="min-h-20"
            />
          </div>

          <App_Input
            name="manager"
            register={register}
            errors={errors}
            placeholder="John Manager"
          />

          <div className="space-y-1.5">
            <App_Text variant="tableCell" className="font-medium">
              Notes (Optional)
            </App_Text>
            <App_Text_Area
              name="notes"
              register={register}
              errors={errors}
              placeholder="New warehouse for Western region."
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
              text={isPending ? "Saving..." : "Save Location"}
              type="submit"
              btnStyle="flex-1 text-xs bg-primary text-white hover:bg-primary/90 rounded-xl py-2.5 h-auto"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Add_Location_Modal;
