"use client";

import App_Text from "@/components/app_ui/App_Text";
import { CheckCircle2 } from "lucide-react";
import { orderDetail } from "../../orders_view_data/orders_data";
import { useOrderContext } from "@/app/contexts/admin/Orders_Context";

const Tab_Order_Timeline = () => {
  const { order } = useOrderContext();
  const { timeline } = order!;
  return (
    <div className="space-y-4 max-w-lg">
      <App_Text variant="cardHeading">Order Timeline</App_Text>
      <div className="relative">
        <div className="absolute left-3.5 top-4 bottom-4 w-px bg-[#ede8e2]" />
        {timeline.map((event) => (
          <div key={event.id} className="flex items-start gap-4 py-4 relative">
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 z-10 border-2 border-white shadow-sm ${
                event.completed ? "bg-primary" : "bg-[#f5f2ee]"
              }`}
            >
              {event.completed ? (
                <CheckCircle2 size={14} className="text-white" />
              ) : (
                <div className="w-2 h-2 rounded-full bg-[#d0c8c0]" />
              )}
            </div>
            <div className="flex-1 bg-[#faf9f7] rounded-xl border border-[#ede8e2] p-3">
              <App_Text variant="tableCell" className="font-semibold">
                {event.label}
              </App_Text>
              <App_Text variant="tableCellMuted">{event.date}</App_Text>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tab_Order_Timeline;
