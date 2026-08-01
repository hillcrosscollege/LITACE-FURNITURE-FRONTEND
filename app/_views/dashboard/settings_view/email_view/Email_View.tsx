"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import App_Text from "@/components/app_ui/App_Text";
import Settings_Mobile_Nav from "../store_information_view/store_information_components/Settings_Mobile_Nav";
import Email_Notifications_Tab from "./email_components/Email_Notifications_Tab";
import Email_Templates_Tab from "./email_components/Email_Templates_Tab";
import SMTP_Settings_Tab from "./email_components/SMTP_Settings_Tab";

const tabs = ["Email Templates", "SMTP Settings", "Email Notifications"];

const Email_Settings_View = () => {
  const [activeTab, setActiveTab] = useState("Email Templates");

  return (
    <div className="">
      <div className="flex-1 min-w-0 space-y-4">
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
            Email Settings
          </App_Text>
        </div>

        <Settings_Mobile_Nav />

        <div>
          <App_Text variant="pageTitle">Email Settings</App_Text>
          <App_Text variant="pageSub">
            Configure email templates and notification preferences.
          </App_Text>
        </div>

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

        {activeTab === "Email Templates" && <Email_Templates_Tab />}
        {activeTab === "SMTP Settings" && <SMTP_Settings_Tab />}
        {activeTab === "Email Notifications" && <Email_Notifications_Tab />}
      </div>
    </div>
  );
};

export default Email_Settings_View;
