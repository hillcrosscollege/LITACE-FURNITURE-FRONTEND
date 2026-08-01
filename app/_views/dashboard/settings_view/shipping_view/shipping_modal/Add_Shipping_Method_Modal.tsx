"use client";

import App_Button from "@/components/app_ui/App_Button";
import App_Input from "@/components/app_ui/App_Input";
import App_Text from "@/components/app_ui/App_Text";
import App_Text_Area from "@/components/app_ui/App_Text_Area";
import { X } from "lucide-react";
import { useForm } from "react-hook-form";
import { useAddShippingMethod } from "../shipping_hooks/useShippingMutation";
import { AddShippingMethodPayload } from "../shipping_types";

type Props = { onClose: () => void };

const Add_Shipping_Method_Modal = ({ onClose }: Props) => {
  const { mutate: addMethod, isPending } = useAddShippingMethod();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<AddShippingMethodPayload>({
    defaultValues: { status: true },
  });

  const statusValue = watch("status");

  const onSubmit = (data: AddShippingMethodPayload) =>
    addMethod(data, { onSuccess: onClose });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 space-y-4">
        <div className="flex items-center justify-between">
          <App_Text variant="cardHeading" className="text-base">
            Add Shipping Method
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
            placeholder="Enter method name"
            rules={{ required: "Method name is required" }}
          />

          <div className="space-y-1.5">
            <App_Text variant="tableCell" className="font-medium">
              Description
            </App_Text>
            <App_Text_Area
              name="description"
              register={register}
              errors={errors}
              placeholder="Enter description"
            />
          </div>

          <App_Input
            name="deliveryTime"
            register={register}
            errors={errors}
            placeholder="e.g. 3 - 5 business days"
            rules={{ required: "Delivery time is required" }}
          />

          <div className="flex items-center justify-between">
            <App_Text variant="tableCell" className="font-medium">
              Status
            </App_Text>
            <button
              type="button"
              onClick={() => setValue("status", !statusValue)}
              className={`w-11 h-6 rounded-full transition-colors relative flex-shrink-0 ${statusValue ? "bg-primary" : "bg-gray-200"}`}
            >
              <span
                className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${statusValue ? "translate-x-5" : "translate-x-0.5"}`}
              />
            </button>
          </div>

          <div className="flex gap-3 pt-1">
            <App_Button
              text="Cancel"
              type="button"
              onPress={onClose}
              btnStyle="flex-1 text-xs border border-[#e0dbd4] bg-white text-[text] hover:bg-[#f5f2ee] rounded-xl py-2.5 h-auto"
            />
            <App_Button
              text={isPending ? "Saving..." : "Save Method"}
              type="submit"
              btnStyle="flex-1 text-xs bg-primary text-white hover:bg-primary/90 rounded-xl py-2.5 h-auto"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Add_Shipping_Method_Modal;
