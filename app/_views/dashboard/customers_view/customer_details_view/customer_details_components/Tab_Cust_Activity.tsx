"use client";

import App_Text from "@/components/app_ui/App_Text";
import { ShoppingBag, CreditCard, User } from "lucide-react";
import { CustomerDetail } from "../../customers_types";

const activityIcons = {
  order: { icon: ShoppingBag, bg: "bg-primary/10", color: "text-primary" },
  payment: { icon: CreditCard, bg: "bg-[#edf7f2]", color: "text-[#2e7d52]" },
  account: { icon: User, bg: "bg-[#edf2fb]", color: "text-[#3266ad]" },
};

const Tab_Cust_Activity = ({ customer }: { customer: CustomerDetail }) => (
  <div className="space-y-4 max-w-2xl">
    <App_Text variant="cardHeading">Activity Log</App_Text>
    <div className="relative">
      <div className="absolute left-4 top-4 bottom-4 w-px bg-[#ede8e2]" />
      {customer.recentActivity.map((item) => {
        const { icon: Icon, bg, color } = activityIcons[item.type];
        return (
          <div key={item.id} className="flex items-start gap-4 py-3 relative">
            <div
              className={`w-8 h-8 rounded-full ${bg} flex items-center justify-center shrink-0 z-10 border-2 border-white`}
            >
              <Icon size={14} className={color} />
            </div>
            <div className="flex-1 bg-[#faf9f7] rounded-xl border border-[#ede8e2] p-3">
              <App_Text variant="tableCell">{item.description}</App_Text>
              <App_Text variant="tableCellMuted" className="mt-0.5">
                {item.date}
              </App_Text>
            </div>
          </div>
        );
      })}
    </div>
  </div>
);

export default Tab_Cust_Activity;
