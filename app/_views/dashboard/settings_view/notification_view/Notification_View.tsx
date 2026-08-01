"use client";

import App_Text from "@/components/app_ui/App_Text";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import Settings_Toggle from "../email_view/email_components/Settings_Toggle";
import {
  useNotificationSettings,
  useUpdateNotificationSetting,
} from "../email_view/email_hooks/useEmailMutation";
import Settings_Mobile_Nav from "../store_information_view/store_information_components/Settings_Mobile_Nav";
import Settings_Sidebar_Nav from "../store_information_view/store_information_components/Settings_Sidebar_Nav";
import App_Loader from "@/components/app_ui/App_Loader";

const Notification_Settings_View = () => {
  const { data: settings, isLoading } = useNotificationSettings();
  const { mutate: updateSetting } = useUpdateNotificationSetting();

  // Group settings by their group field
  const grouped =
    settings?.reduce(
      (acc, s) => {
        acc[s.group] = acc[s.group] ?? [];
        acc[s.group].push(s);
        return acc;
      },
      {} as Record<string, typeof settings>,
    ) ?? {};

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
            Notification Settings
          </App_Text>
        </div>

        <Settings_Mobile_Nav />

        <div>
          <App_Text variant="pageTitle">Notification Settings</App_Text>
          <App_Text variant="pageSub">
            Manage in-app and push notifications.
          </App_Text>
        </div>

        {isLoading || !settings ? (
          <App_Loader label="Loading notification settings..." />
        ) : (
          <div className="space-y-4 max-w-2xl">
            {/* Column header */}
            {/* <div className="flex items-center justify-end gap-6 pr-2">
              <App_Text variant="tableHeader">In-App</App_Text>
              <App_Text variant="tableHeader">Push</App_Text>
            </div> */}

            {Object.entries(grouped).map(([group, items]) => (
              <div key={group} className="space-y-1">
                <App_Text
                  variant="tableCellMuted"
                  className="font-semibold uppercase text-[10px] tracking-wider px-1"
                >
                  {group}
                </App_Text>
                <div className="bg-white rounded-2xl border border-[#ede8e2] shadow-sm divide-y divide-[#f5f2ee]">
                  {items?.map((setting) => (
                    <div
                      key={setting.id}
                      className="flex items-center gap-3 px-4 py-3.5"
                    >
                      <div className="flex-1 min-w-0">
                        <App_Text variant="tableCell" className="font-medium">
                          {setting.label}
                        </App_Text>
                        <App_Text variant="tableCellMuted">
                          {setting.description}
                        </App_Text>
                      </div>
                      <div className="flex items-center gap-6 shrink-0">
                        <Settings_Toggle
                          value={setting.inApp}
                          onChange={(v) =>
                            updateSetting({
                              id: setting.id,
                              field: "inApp",
                              value: v,
                            })
                          }
                        />
                        <Settings_Toggle
                          value={setting.push}
                          onChange={(v) =>
                            updateSetting({
                              id: setting.id,
                              field: "push",
                              value: v,
                            })
                          }
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Notification_Settings_View;
