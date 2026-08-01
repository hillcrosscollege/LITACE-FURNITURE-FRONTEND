"use client";

import { useState } from "react";
import Image from "next/image";
import App_Button from "@/components/app_ui/App_Button";
import App_Text from "@/components/app_ui/App_Text";
import { orderDetail } from "../../orders_view_data/orders_data";
import { useOrderContext } from "@/app/contexts/admin/Orders_Context";

const Tab_Order_Notes = () => {
  const [activeTab, setActiveTab] = useState<"notes" | "activity">("notes");
  const [note, setNote] = useState("");
  // const { notes, activity } = orderDetail;
  const { order } = useOrderContext();
  const { notes, activity } = order!;

  return (
    <div className="space-y-4 max-w-2xl">
      <App_Text variant="cardHeading">Notes & Activity</App_Text>

      {/* Sub tabs */}
      <div className="flex items-center gap-1 border-b border-[#ede8e2]">
        {(["notes", "activity"] as const).map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={`px-3 py-2.5 text-xs border-b-2 transition-colors capitalize ${
              activeTab === tab
                ? "border-primary text-primary font-medium"
                : "border-transparent text-muted-foreground hover:text-[text]"
            }`}
          >
            {tab === "notes" ? "Order Notes" : "Activity Log"}
          </button>
        ))}
      </div>

      {activeTab === "notes" && (
        <div className="space-y-4">
          {notes.map((note) => (
            <div
              key={note.id}
              className="flex items-start gap-3 p-3 bg-[#faf9f7] rounded-xl border border-[#ede8e2]"
            >
              <div className="w-8 h-8 rounded-full overflow-hidden bg-[#f0e8df] shrink-0">
                <Image
                  src={note.avatar}
                  alt={note.user}
                  width={32}
                  height={32}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <App_Text variant="tableCell" className="font-semibold">
                    {note.user}
                  </App_Text>
                  <App_Text variant="tableCellMuted">({note.role})</App_Text>
                  <App_Text variant="tableCellMuted" className="ml-auto">
                    {note.date}
                  </App_Text>
                </div>
                <App_Text variant="tableCellMuted" className="mt-1">
                  {note.message}
                </App_Text>
              </div>
            </div>
          ))}

          <div className="space-y-2">
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Type your note..."
              rows={3}
              className="w-full text-sm border border-gray-200 rounded-xl px-3 py-2.5 bg-white outline-none focus:border-primary resize-none"
            />
            <App_Button
              text="Add Note"
              type="button"
              onPress={() => {
                console.log("Note:", note);
                setNote("");
              }}
              btnStyle="text-xs bg-primary text-white hover:bg-primary/90 rounded-lg px-4 py-2 h-auto"
            />
          </div>
        </div>
      )}

      {activeTab === "activity" && (
        <div className="relative">
          <div className="absolute left-4 top-4 bottom-4 w-px bg-[#ede8e2]" />
          {activity.map((item) => (
            <div key={item.id} className="flex items-start gap-3 py-3 relative">
              <div className="w-8 h-8 rounded-full overflow-hidden bg-[#f0e8df] shrink-0 z-10 border-2 border-white">
                <Image
                  src={item.avatar}
                  alt={item.user}
                  width={32}
                  height={32}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 pt-1">
                <App_Text variant="tableCell">
                  <span className="font-semibold">{item.user}</span>{" "}
                  {item.action}
                </App_Text>
                <App_Text variant="tableCellMuted" className="mt-0.5">
                  {item.date}
                </App_Text>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Tab_Order_Notes;
