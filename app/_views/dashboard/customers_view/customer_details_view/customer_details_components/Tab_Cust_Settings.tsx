"use client";

import { useState } from "react";
import { Shield, Bell, User, AlertTriangle } from "lucide-react";
import App_Button from "@/components/app_ui/App_Button";
import App_Select from "@/components/app_ui/App_Select";
import App_Text from "@/components/app_ui/App_Text";
import { Skeleton_Settings } from "../../customers_components/Customer_Skeleton";
import { useUpdateCustomerSettings } from "../../customers_hooks/useCustomersMutations";
import { useCustomerSettings } from "../../customers_hooks/useCustomersQueries";
import { CustomerSettings } from "../../customers_types";

const Toggle = ({
  value,
  onChange,
  disabled,
}: {
  value: boolean;
  onChange: (v: boolean) => void;
  disabled?: boolean;
}) => (
  <button
    type="button"
    onClick={() => !disabled && onChange(!value)}
    className={`w-11 h-6 rounded-full transition-colors relative shrink-0 ${
      value ? "bg-primary" : "bg-gray-200"
    } ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
  >
    <span
      className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
        value ? "translate-x-5" : "translate-x-0.5"
      }`}
    />
  </button>
);

const SettingsSection = ({
  icon: Icon,
  title,
  children,
}: {
  icon: React.ElementType;
  title: string;
  children: React.ReactNode;
}) => (
  <div className="bg-[#faf9f7] rounded-xl border border-[#ede8e2] p-4 space-y-3">
    <div className="flex items-center gap-2 pb-2 border-b border-[#ede8e2]">
      <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center">
        <Icon size={14} className="text-primary" />
      </div>
      <App_Text variant="cardHeading">{title}</App_Text>
    </div>
    {children}
  </div>
);

const SettingsRow = ({
  label,
  description,
  value,
  onChange,
  disabled,
}: {
  label: string;
  description?: string;
  value: boolean;
  onChange: (v: boolean) => void;
  disabled?: boolean;
}) => (
  <div className="flex items-center justify-between gap-4 py-2 border-b border-[#ede8e2] last:border-0">
    <div className="flex-1">
      <App_Text variant="tableCell" className="font-medium">
        {label}
      </App_Text>
      {description && (
        <App_Text variant="tableCellMuted">{description}</App_Text>
      )}
    </div>
    <Toggle value={value} onChange={onChange} disabled={disabled} />
  </div>
);

const Tab_Cust_Settings = ({ customerId }: { customerId: string }) => {
  const { data: settings, isLoading } = useCustomerSettings(customerId);
  const { mutate: updateSettings, isPending } = useUpdateCustomerSettings();
  const [local, setLocal] = useState<CustomerSettings | null>(null);

  const current = local ?? settings;

  const update = (key: keyof CustomerSettings, value: any) => {
    if (!current) return;
    const updated = { ...current, [key]: value };
    setLocal(updated as CustomerSettings);
  };

  const handleSave = () => {
    if (!local) return;
    updateSettings({ id: customerId, settings: local });
  };

  if (isLoading) return <Skeleton_Settings />;

  if (!current) return null;

  return (
    <div className="space-y-4 max-w-2xl">
      <div className="flex items-center justify-between">
        <App_Text variant="cardHeading">Customer Settings</App_Text>
        {local && (
          <App_Button
            text={isPending ? "Saving..." : "Save Changes"}
            type="button"
            onPress={handleSave}
            btnStyle="text-xs bg-primary text-white hover:bg-primary/90 rounded-lg px-4 py-2 h-auto"
          />
        )}
      </div>

      {/* Notifications */}
      <SettingsSection icon={Bell} title="Notification Preferences">
        <SettingsRow
          label="Email Notifications"
          description="Receive updates and alerts via email"
          value={current.emailNotifications}
          onChange={(v) => update("emailNotifications", v)}
        />
        <SettingsRow
          label="SMS Notifications"
          description="Receive updates via text message"
          value={current.smsNotifications}
          onChange={(v) => update("smsNotifications", v)}
        />
        <SettingsRow
          label="Order Updates"
          description="Get notified on order status changes"
          value={current.orderUpdates}
          onChange={(v) => update("orderUpdates", v)}
        />
        <SettingsRow
          label="Promotional Emails"
          description="Receive deals, offers and promotions"
          value={current.promotionalEmails}
          onChange={(v) => update("promotionalEmails", v)}
        />
      </SettingsSection>

      {/* Security */}
      <SettingsSection icon={Shield} title="Security">
        <SettingsRow
          label="Two-Factor Authentication"
          description="Add an extra layer of security to the account"
          value={current.twoFactorAuth}
          onChange={(v) => update("twoFactorAuth", v)}
        />
        <div className="pt-2">
          <App_Button
            text="Send Password Reset Email"
            type="button"
            btnStyle="text-xs border border-[#e0dbd4] bg-white text-[text] hover:bg-[#f5f2ee] rounded-lg px-3 py-2 h-auto"
          />
        </div>
      </SettingsSection>

      {/* Account */}
      <SettingsSection icon={User} title="Account Status">
        <div className="space-y-3">
          <App_Text variant="tableCellMuted">
            Change the customer's account status. Blocking will prevent login
            access.
          </App_Text>
          <App_Select
            data={[
              { label: "Active", key: "Active" },
              { label: "Inactive", key: "Inactive" },
              { label: "Blocked", key: "Blocked" },
            ]}
            value={current.accountStatus}
            placeholder="Select status"
            title="Account Status"
            onChange={(v) =>
              update("accountStatus", v as CustomerSettings["accountStatus"])
            }
            style="gap-1.5 max-w-xs"
          />
        </div>
      </SettingsSection>

      {/* Danger zone */}
      <SettingsSection icon={AlertTriangle} title="Danger Zone">
        <App_Text variant="tableCellMuted">
          These actions are irreversible. Please proceed with caution.
        </App_Text>
        <div className="flex flex-wrap gap-3 pt-1">
          <App_Button
            text="Clear Order History"
            type="button"
            btnStyle="text-xs border border-[#f5c6c6] bg-white text-[#c0392b] hover:bg-[#fdecea] rounded-lg px-3 py-2 h-auto"
          />
          <App_Button
            text="Delete Account"
            type="button"
            btnStyle="text-xs bg-[#c0392b] text-white hover:bg-[#a93226] rounded-lg px-3 py-2 h-auto"
          />
        </div>
      </SettingsSection>
    </div>
  );
};

export default Tab_Cust_Settings;
