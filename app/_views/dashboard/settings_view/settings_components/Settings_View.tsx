// app/dashboard/settings/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, ChevronRight } from "lucide-react";
import App_Text from "@/components/app_ui/App_Text";
import { useSystemSummary } from "../store_information_view/store_information_hooks/useStoreInformationQueries";
import { settingsNavItems } from "./settings_nav";
import App_Loader from "@/components/app_ui/App_Loader";

const Settings_View = () => {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const { data: summary, isLoading } = useSystemSummary();

  const filtered = settingsNavItems.filter((item) =>
    item.label.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <App_Text variant="pageTitle">Settings</App_Text>
          <App_Text variant="pageSub">
            Manage and configure your store settings.
          </App_Text>
        </div>
        <div className="relative w-full sm:w-64">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search settings..."
            className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2.5 pl-9 bg-white outline-none focus:border-primary transition-colors"
          />
          <Search
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
        </div>
      </div>

      {/* Settings grid */}
      <div className="space-y-2">
        <App_Text variant="cardHeading">Settings Overview</App_Text>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {filtered.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.key}
                type="button"
                onClick={() => item.built && router.push(item.path)}
                disabled={!item.built}
                className={`flex items-start gap-3 p-4 rounded-2xl border text-left transition-all ${
                  item.built
                    ? "bg-white border-[#ede8e2] shadow-sm hover:border-primary/30 hover:shadow-md group"
                    : "bg-[#faf9f7] border-[#ede8e2] opacity-60 cursor-not-allowed"
                }`}
              >
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Icon size={18} className="text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <App_Text variant="cardHeading" className="text-sm">
                      {item.label}
                    </App_Text>
                    {!item.built && (
                      <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-[#f5f2ee] text-muted-foreground font-medium flex-shrink-0">
                        Soon
                      </span>
                    )}
                  </div>
                  <App_Text
                    variant="tableCellMuted"
                    className="mt-0.5 line-clamp-2"
                  >
                    {item.desc}
                  </App_Text>
                </div>
                {item.built && (
                  <ChevronRight
                    size={15}
                    className="text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all flex-shrink-0 mt-1"
                  />
                )}
              </button>
            );
          })}
        </div>
        {filtered.length === 0 && (
          <App_Text variant="tableCellMuted" className="py-8 text-center">
            No settings found for "{search}".
          </App_Text>
        )}
      </div>

      {/* System Summary */}
      <div className="space-y-2">
        <App_Text variant="cardHeading">System Summary</App_Text>
        {isLoading || !summary ? (
          <App_Loader label="Loading system summary..." />
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              {
                label: "Admin Users",
                value: summary.adminUsers.toString(),
                sub: "Total users",
              },
              {
                label: "Roles",
                value: summary.roles.toString(),
                sub: "User roles",
              },
              {
                label: "Permissions",
                value: summary.permissions.toString(),
                sub: "Total permissions",
              },
              {
                label: "Email Templates",
                value: summary.emailTemplates.toString(),
                sub: "Active templates",
              },
              {
                label: "Last Backup",
                value: summary.lastBackup.split(",")[0],
                sub: summary.lastBackup.split(",")[1]?.trim(),
              },
              {
                label: "System Status",
                value: summary.systemStatus,
                sub: "All systems operational",
              },
            ].map(({ label, value, sub }) => (
              <div
                key={label}
                className="bg-white rounded-2xl border border-[#ede8e2] shadow-sm p-4 space-y-1"
              >
                <App_Text variant="tableCellMuted">{label}</App_Text>
                <App_Text
                  variant="statValue"
                  className={`text-lg ${label === "System Status" ? "text-[#2e7d52]" : ""}`}
                >
                  {label === "System Status" ? `● ${value}` : value}
                </App_Text>
                <App_Text variant="tableCellMuted">{sub}</App_Text>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Settings_View;
