"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronRight, Plus } from "lucide-react";
import App_Button from "@/components/app_ui/App_Button";
import App_Text from "@/components/app_ui/App_Text";
import Settings_Mobile_Nav from "../store_information_view/store_information_components/Settings_Mobile_Nav";
import Settings_Sidebar_Nav from "../store_information_view/store_information_components/Settings_Sidebar_Nav";
import Shipping_Methods_Tab from "./shipping_components/Shipping_Methods_Tab";
import Shipping_Rates_Tab from "./shipping_components/Shipping_Rates_Tab";
import Shipping_Zones_Tab from "./shipping_components/Shipping_Zones_Tab";
import Add_Shipping_Method_Modal from "./shipping_modal/Add_Shipping_Method_Modal";

const tabs = ["Shipping Methods", "Shipping Zones", "Shipping Rates"];

const Shipping_View = () => {
  const [activeTab, setActiveTab] = useState("Shipping Methods");
  const [showQuickAdd, setShowQuickAdd] = useState(false);

  return (
    <div className="">
      <div className="flex-1 min-w-0 space-y-4">
        {/* Breadcrumb */}
        <div className="flex items-center gap-1.5">
          <Link href="/dashboard/settings">
            <App_Text
              variant="tableCellMuted"
              className="hover:text-primary cursor-pointer"
            >
              Settings
            </App_Text>
          </Link>
          <ChevronRight size={13} className="text-muted-foreground" />
          <App_Text variant="tableCellMuted" className="text-[text]">
            Shipping Settings
          </App_Text>
        </div>

        <Settings_Mobile_Nav />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <App_Text variant="pageTitle">Shipping Settings</App_Text>
            <App_Text variant="pageSub">
              Manage shipping methods, zones and delivery rates.
            </App_Text>
          </div>
          {activeTab === "Shipping Methods" && (
            <App_Button
              text="Add Shipping Method"
              icon={<Plus size={13} />}
              type="button"
              onPress={() => setShowQuickAdd(true)}
              btnStyle="text-xs bg-primary text-white hover:bg-primary/90 rounded-lg px-3 py-2 h-auto"
            />
          )}
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-1 border-b border-[#ede8e2]">
          {tabs.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-2.5 text-xs border-b-2 transition-colors ${
                activeTab === tab
                  ? "border-primary text-primary font-medium"
                  : "border-transparent text-muted-foreground hover:text-[text]"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {activeTab === "Shipping Methods" && <Shipping_Methods_Tab />}
        {activeTab === "Shipping Zones" && <Shipping_Zones_Tab />}
        {activeTab === "Shipping Rates" && <Shipping_Rates_Tab />}
      </div>

      {showQuickAdd && (
        <Add_Shipping_Method_Modal onClose={() => setShowQuickAdd(false)} />
      )}
    </div>
  );
};

export default Shipping_View;
