// components/categories/details/tabs/Tab_Cat_Activity.tsx
"use client";

import App_Text from "@/components/app_ui/App_Text";
import Image from "next/image";
import { categoryActivity } from "../../categories_data/categories_data";

const Tab_Cat_Activity = () => (
  <div className="space-y-4">
    <App_Text variant="cardHeading">Activity Log</App_Text>
    <div className="flex flex-col gap-0 relative">
      {/* Vertical line */}
      <div className="absolute left-4 top-5 bottom-5 w-px bg-[#ede8e2]" />
      {categoryActivity.map((item, i) => (
        <div key={item.id} className="flex items-start gap-4 py-3 relative">
          <div className="w-8 h-8 rounded-full overflow-hidden bg-[#f0e8df] flex-shrink-0 z-10 border-2 border-white">
            <Image
              src={item.avatar}
              alt={item.user}
              width={32}
              height={32}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 min-w-0 pt-1">
            <App_Text variant="tableCell">
              <span className="font-semibold">{item.user}</span> {item.action}
            </App_Text>
            <App_Text variant="tableCellMuted" className="mt-0.5">
              {item.date}
            </App_Text>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default Tab_Cat_Activity;
