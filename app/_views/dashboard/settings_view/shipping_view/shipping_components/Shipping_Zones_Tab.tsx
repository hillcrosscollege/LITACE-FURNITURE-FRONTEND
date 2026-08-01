"use client";

import { useState } from "react";
import { Plus, MapPin } from "lucide-react";
import App_Button from "@/components/app_ui/App_Button";
import App_Text from "@/components/app_ui/App_Text";
import { useShippingZones } from "../shipping_hooks/useShippingQueries";
import Add_Shipping_Zone_Modal from "../shipping_modal/Add_Shipping_Zone_Modal";
import App_Loader from "@/components/app_ui/App_Loader";

const Shipping_Zones_Tab = () => {
  const [showAdd, setShowAdd] = useState(false);
  const { data: zones, isLoading } = useShippingZones();

  return (
    <>
      <div className="space-y-3">
        <div className="flex items-center justify-end">
          <App_Button
            text="Add Zone"
            icon={<Plus size={13} />}
            type="button"
            onPress={() => setShowAdd(true)}
            btnStyle="text-xs bg-primary text-white hover:bg-primary/90 rounded-lg px-3 py-2 h-auto"
          />
        </div>

        {isLoading || !zones ? (
          <App_Loader label="Loading shipping zones..." />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {zones.map((zone) => (
              <div
                key={zone.id}
                className="bg-white rounded-2xl border border-[#ede8e2] shadow-sm p-4 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                      <MapPin size={14} className="text-primary" />
                    </div>
                    <App_Text variant="cardHeading">{zone.name}</App_Text>
                  </div>
                  <span
                    className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                      zone.status === "Active"
                        ? "bg-[#e8fdf0] text-[#157a45]"
                        : "bg-[#fdecea] text-[#a32020]"
                    }`}
                  >
                    {zone.status}
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {zone.regions.map((region) => (
                    <span
                      key={region}
                      className="text-xs px-2 py-1 rounded-lg bg-[#faf9f7] border border-[#ede8e2] text-[text]"
                    >
                      {region}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {showAdd && <Add_Shipping_Zone_Modal onClose={() => setShowAdd(false)} />}
    </>
  );
};

export default Shipping_Zones_Tab;
