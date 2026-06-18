"use client";

import App_Text from "@/components/app_ui/App_Text";
import { CustomerDetail } from "../../customers_types";

const activityDotStyles = {
  order: "bg-primary",
  payment: "bg-[#2e7d52]",
  account: "bg-[#3266ad]",
};

const Tab_Cust_Overview = ({ customer }: { customer: CustomerDetail }) => {
  const { addresses, recentActivity } = customer;
  const shipping = addresses.find((a) => a.type === "shipping");
  const billing = addresses.find((a) => a.type === "billing");

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      {/* Personal Information */}
      <div className="bg-[#faf9f7] rounded-xl border border-[#ede8e2] p-4 space-y-1">
        <App_Text variant="cardHeading" className="mb-3">
          Personal Information
        </App_Text>
        {[
          { label: "Full Name", value: customer.name },
          { label: "Email", value: customer.email },
          { label: "Phone", value: customer.phone },
          { label: "Gender", value: customer.gender },
          { label: "Date of Birth", value: customer.dateOfBirth },
          { label: "Joined On", value: customer.joinedOn },
        ].map(({ label, value }) => (
          <div
            key={label}
            className="flex items-start justify-between py-2 border-b border-[#ede8e2] last:border-0 gap-2"
          >
            <App_Text variant="tableCellMuted" className="shrink-0">
              {label}
            </App_Text>
            <App_Text variant="tableCell" className="font-medium text-right">
              {value}
            </App_Text>
          </div>
        ))}
      </div>

      {/* Default Addresses */}
      <div className="bg-[#faf9f7] rounded-xl border border-[#ede8e2] p-4 space-y-4">
        <App_Text variant="cardHeading">Default Addresses</App_Text>

        {shipping && (
          <div className="space-y-1">
            <App_Text
              variant="tableCell"
              className="font-semibold text-primary"
            >
              Shipping Address
            </App_Text>
            <App_Text variant="tableCell">{shipping.fullName}</App_Text>
            <App_Text variant="tableCellMuted">{shipping.address}</App_Text>
            <App_Text variant="tableCellMuted">
              {shipping.state}, {shipping.postalCode}
            </App_Text>
            {shipping.landmark && (
              <App_Text variant="tableCellMuted">{shipping.landmark}</App_Text>
            )}
            <App_Text variant="tableCellMuted">{shipping.phone}</App_Text>
          </div>
        )}

        <div className="border-t border-[#ede8e2] pt-3">
          {billing && (
            <div className="space-y-1">
              <App_Text variant="tableCell" className="font-semibold">
                Billing Address
              </App_Text>
              <App_Text variant="tableCell">{billing.fullName}</App_Text>
              <App_Text variant="tableCellMuted">{billing.address}</App_Text>
              <App_Text variant="tableCellMuted">
                {billing.state}, {billing.postalCode}
              </App_Text>
              {billing.landmark && (
                <App_Text variant="tableCellMuted">{billing.landmark}</App_Text>
              )}
            </div>
          )}
        </div>

        <button type="button" className="text-xs text-primary hover:underline">
          View all addresses
        </button>
      </div>

      {/* Recent Activity */}
      <div className="bg-[#faf9f7] rounded-xl border border-[#ede8e2] p-4 space-y-3">
        <App_Text variant="cardHeading">Recent Activity</App_Text>
        <div className="relative">
          <div className="absolute left-2 top-2 bottom-2 w-px bg-[#ede8e2]" />
          {recentActivity.map((item) => (
            <div
              key={item.id}
              className="flex items-start gap-3 py-2.5 relative"
            >
              <div
                className={`w-4 h-4 rounded-full shrink-0 z-10 border-2 border-white ${activityDotStyles[item.type]}`}
              />
              <div>
                <App_Text
                  variant="tableCell"
                  className="text-[11px] leading-snug"
                >
                  {item.description}
                </App_Text>
                <App_Text variant="tableCellMuted" className="text-[10px]">
                  {item.date}
                </App_Text>
              </div>
            </div>
          ))}
        </div>
        <button type="button" className="text-xs text-primary hover:underline">
          View all activity
        </button>
      </div>
    </div>
  );
};

export default Tab_Cust_Overview;
