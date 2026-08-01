"use client";

import { useState } from "react";
import { X, Plus, Trash2 } from "lucide-react";
import { useForm } from "react-hook-form";
import App_Button from "@/components/app_ui/App_Button";
import App_Input from "@/components/app_ui/App_Input";
import App_Text from "@/components/app_ui/App_Text";
import { useAddShippingZone } from "../shipping_hooks/useShippingMutation";

type Props = { onClose: () => void };
type Form = { name: string };

const Add_Shipping_Zone_Modal = ({ onClose }: Props) => {
  const [regions, setRegions] = useState<string[]>([""]);
  const [status, setStatus] = useState(true);
  const { mutate: addZone, isPending } = useAddShippingZone();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Form>();

  const updateRegion = (i: number, val: string) =>
    setRegions((prev) => prev.map((r, idx) => (idx === i ? val : r)));

  const addRegionField = () => setRegions((prev) => [...prev, ""]);
  const removeRegionField = (i: number) =>
    setRegions((prev) => prev.filter((_, idx) => idx !== i));

  const onSubmit = (data: Form) => {
    addZone(
      {
        name: data.name,
        regions: regions.filter((r) => r.trim() !== ""),
        status,
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
      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 space-y-4">
        <div className="flex items-center justify-between">
          <App_Text variant="cardHeading" className="text-base">
            Add Shipping Zone
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
            placeholder="e.g. Gauteng"
            rules={{ required: "Zone name is required" }}
          />

          <div className="space-y-1.5">
            <App_Text variant="tableCell" className="font-medium">
              Regions / Cities
            </App_Text>
            <div className="space-y-2">
              {regions.map((region, i) => (
                <div key={i} className="flex items-center gap-2">
                  <input
                    value={region}
                    onChange={(e) => updateRegion(i, e.target.value)}
                    placeholder="e.g. Johannesburg"
                    className="flex-1 text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white outline-none focus:border-primary"
                  />
                  {regions.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeRegionField(i)}
                      className="p-2 rounded-lg hover:bg-[#fdecea] text-[#c0392b]"
                    >
                      <Trash2 size={13} />
                    </button>
                  )}
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={addRegionField}
              className="flex items-center gap-1.5 text-xs text-primary hover:underline"
            >
              <Plus size={12} /> Add region
            </button>
          </div>

          <div className="flex items-center justify-between">
            <App_Text variant="tableCell" className="font-medium">
              Status
            </App_Text>
            <button
              type="button"
              onClick={() => setStatus((s) => !s)}
              className={`w-11 h-6 rounded-full transition-colors relative flex-shrink-0 ${status ? "bg-primary" : "bg-gray-200"}`}
            >
              <span
                className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${status ? "translate-x-5" : "translate-x-0.5"}`}
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
              text={isPending ? "Saving..." : "Save Zone"}
              type="submit"
              btnStyle="flex-1 text-xs bg-primary text-white hover:bg-primary/90 rounded-xl py-2.5 h-auto"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Add_Shipping_Zone_Modal;
