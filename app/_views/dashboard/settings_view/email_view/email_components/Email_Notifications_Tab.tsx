"use client";

import App_Text from "@/components/app_ui/App_Text";
import {
  useEmailNotifications,
  useUpdateEmailNotification,
} from "../email_hooks/useEmailMutation";
import Settings_Toggle from "./Settings_Toggle";
import App_Loader from "@/components/app_ui/App_Loader";

const Email_Notifications_Tab = () => {
  const { data: notifications, isLoading } = useEmailNotifications();
  const { mutate: updateNotif } = useUpdateEmailNotification();

  if (isLoading || !notifications)
    return <App_Loader label="Loading notification settings..." />;

  return (
    <div className="max-w-2xl space-y-3">
      <App_Text variant="tableCellMuted">
        Choose which events trigger an email notification to the store admin.
      </App_Text>

      <div className="bg-white rounded-2xl border border-[#ede8e2] shadow-sm divide-y divide-[#f5f2ee]">
        {notifications.map((notif) => (
          <div
            key={notif.id}
            className="flex items-center justify-between gap-3 px-4 py-3.5"
          >
            <div className="flex-1">
              <App_Text variant="tableCell" className="font-medium">
                {notif.label}
              </App_Text>
              <App_Text variant="tableCellMuted">{notif.description}</App_Text>
            </div>
            <Settings_Toggle
              value={notif.email}
              onChange={(v) => updateNotif({ id: notif.id, email: v })}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Email_Notifications_Tab;
