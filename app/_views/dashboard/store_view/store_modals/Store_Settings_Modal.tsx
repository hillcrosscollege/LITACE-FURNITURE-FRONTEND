"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { useForm } from "react-hook-form";
import App_Text from "@/components/app_ui/App_Text";
import App_Button from "@/components/app_ui/App_Button";
import App_Input from "@/components/app_ui/App_Input";
import App_Select from "@/components/app_ui/App_Select";
import { Store } from "../store_types";
import { useUpdateStoreSettings } from "../store_hooks/useStoreMutation";
import Settings_Toggle from "../../settings_view/email_view/email_components/Settings_Toggle";

type Props = { store: Store; onClose: () => void };
type Form = {
  storeName: string;
  storeCode: string;
  storeType: string;
  currency: string;
  timezone: string;
};

const storeTypes = [
  { label: "Warehouse", key: "Warehouse" },
  { label: "Showroom", key: "Showroom" },
  { label: "Retail", key: "Retail" },
];
const currencies = [
  { label: "NGN (₦)", key: "NGN" },
  { label: "ZAR (R)", key: "ZAR" },
  { label: "USD ($)", key: "USD" },
];
const timezones = [
  { label: "(GMT+01:00) West Africa Time", key: "WAT" },
  { label: "(GMT+02:00) SAST", key: "SAST" },
  { label: "(GMT+00:00) UTC", key: "UTC" },
];
const tabs = ["General", "Operating Hours", "Notifications"];

const Store_Settings_Modal = ({ store, onClose }: Props) => {
  const [activeTab, setActiveTab] = useState("General");
  const [autoUpdateStock, setAutoUpdate] = useState(true);
  const { mutate, isPending } = useUpdateStoreSettings();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<Form>({
    defaultValues: {
      storeName: store.name,
      storeCode: store.storeCode,
      storeType: store.storeType,
      currency: "NGN",
      timezone: "WAT",
    },
  });

  const typeValue = watch("storeType") ?? "";
  const currencyValue = watch("currency") ?? "";
  const timezoneValue = watch("timezone") ?? "";

  const onSubmit = (data: Form) =>
    mutate(
      { id: store.id, data: { ...data, autoUpdateStock } },
      { onSuccess: onClose },
    );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-md max-h-[85vh] overflow-y-auto">
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#ede8e2] sticky top-0 bg-white z-10">
          <App_Text variant="cardHeading" className="text-base">
            Store Settings
          </App_Text>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-[#f5f2ee] text-muted-foreground"
          >
            <X size={16} />
          </button>
        </div>

        <div className="flex items-center gap-1 px-6 border-b border-[#ede8e2]">
          {tabs.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-2.5 text-xs border-b-2 transition-colors ${activeTab === tab ? "border-primary text-primary font-medium" : "border-transparent text-muted-foreground hover:text-[#1e1a17]"}`}
            >
              {tab}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
          {activeTab === "General" && (
            <>
              <div className="grid grid-cols-2 gap-3">
                <App_Input
                  name="storeName"
                  register={register}
                  errors={errors}
                  placeholder="Store Name"
                  rules={{ required: "Required" }}
                />
                <App_Input
                  name="storeCode"
                  register={register}
                  errors={errors}
                  placeholder="ST-001"
                />
              </div>
              <App_Select
                data={storeTypes}
                value={typeValue}
                placeholder="Store Type"
                title="Store Type *"
                onChange={(v) => setValue("storeType", v)}
                style="gap-1.5"
              />
              <App_Select
                data={currencies}
                value={currencyValue}
                placeholder="Currency"
                title="Currency"
                onChange={(v) => setValue("currency", v)}
                style="gap-1.5"
              />
              <App_Select
                data={timezones}
                value={timezoneValue}
                placeholder="Time Zone"
                title="Time Zone"
                onChange={(v) => setValue("timezone", v)}
                style="gap-1.5"
              />
              <div className="flex items-center justify-between p-3 bg-[#faf9f7] rounded-xl border border-[#ede8e2]">
                <div>
                  <App_Text variant="tableCell" className="font-medium">
                    Auto Update Stock
                  </App_Text>
                  <App_Text variant="tableCellMuted">
                    Automatically sync stock levels
                  </App_Text>
                </div>
                <Settings_Toggle
                  value={autoUpdateStock}
                  onChange={setAutoUpdate}
                />
              </div>
            </>
          )}
          {activeTab === "Operating Hours" && (
            <div className="space-y-3">
              {(
                [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday",
                  "Sunday",
                ] as const
              ).map((day) => (
                <div
                  key={day}
                  className="flex items-center justify-between gap-3"
                >
                  <App_Text
                    variant="tableCell"
                    className="font-medium w-24 shrink-0"
                  >
                    {day}
                  </App_Text>
                  <input
                    defaultValue={
                      day === "Sunday" ? "Closed" : "8:00 AM - 6:00 PM"
                    }
                    className="flex-1 text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white outline-none focus:border-primary"
                  />
                </div>
              ))}
            </div>
          )}
          {activeTab === "Notifications" && (
            <div className="space-y-3">
              {[
                {
                  label: "Low Stock Alert",
                  desc: "Get notified when stock is low",
                },
                {
                  label: "Out of Stock Alert",
                  desc: "Get notified when stock runs out",
                },
                {
                  label: "Transfer Alerts",
                  desc: "Get notified on stock transfers",
                },
              ].map(({ label, desc }) => (
                <div
                  key={label}
                  className="flex items-center justify-between p-3 bg-[#faf9f7] rounded-xl border border-[#ede8e2]"
                >
                  <div>
                    <App_Text variant="tableCell" className="font-medium">
                      {label}
                    </App_Text>
                    <App_Text variant="tableCellMuted">{desc}</App_Text>
                  </div>
                  <Settings_Toggle value={true} onChange={() => {}} />
                </div>
              ))}
            </div>
          )}

          <div className="flex gap-3 pt-1">
            <App_Button
              text="Cancel"
              type="button"
              onPress={onClose}
              btnStyle="flex-1 text-xs border border-[#e0dbd4] bg-white text-[#1e1a17] hover:bg-[#f5f2ee] rounded-xl py-2.5 h-auto"
            />
            <App_Button
              text={isPending ? "Saving..." : "Save Settings"}
              type="submit"
              btnStyle="flex-1 text-xs bg-primary text-white hover:bg-primary/90 rounded-xl py-2.5 h-auto"
            />
          </div>
        </form>
      </div>
    </div>
  );
};
export default Store_Settings_Modal;
