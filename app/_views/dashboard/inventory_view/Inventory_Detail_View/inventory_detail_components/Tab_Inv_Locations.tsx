"use client";

import App_Text from "@/components/app_ui/App_Text";
import { Loader2, MoreHorizontal } from "lucide-react";
import { statusStyles } from "../../inventory_data/inventory_cols";
import { useInventoryLocations } from "../../inventory_hooks/useInventoryQueries";

const Tab_Inv_Locations = ({ productId }: { productId: string }) => {
  const { data: locations, isLoading } = useInventoryLocations(productId);

  if (isLoading)
    return (
      <div className="flex justify-center py-10">
        <Loader2 size={20} className="text-primary animate-spin" />
      </div>
    );

  return (
    <div className="space-y-3">
      <div className="bg-white rounded-2xl border border-[#ede8e2] shadow-sm overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#ede8e2]">
              {[
                "Store",
                "Available",
                "Reserved",
                "Damaged",
                "On Hold",
                "Total Stock",
                "Status",
                "Actions",
              ].map((h) => (
                <th key={h} className="text-left py-3 px-4">
                  <App_Text variant="tableHeader">{h}</App_Text>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {locations?.map((loc) => (
              <tr
                key={loc.id}
                className="border-b border-[#f5f2ee] last:border-0 hover:bg-[#faf9f7]"
              >
                <td className="py-3 px-4">
                  <App_Text variant="tableCell" className="font-medium">
                    {loc.store}
                  </App_Text>
                </td>
                <td className="py-3 px-4">
                  <App_Text variant="tableCell">{loc.available}</App_Text>
                </td>
                <td className="py-3 px-4">
                  <App_Text variant="tableCellMuted">{loc.reserved}</App_Text>
                </td>
                <td className="py-3 px-4">
                  <App_Text variant="tableCellMuted">{loc.damaged}</App_Text>
                </td>
                <td className="py-3 px-4">
                  <App_Text variant="tableCellMuted">{loc.onHold}</App_Text>
                </td>
                <td className="py-3 px-4">
                  <App_Text variant="tableCell" className="font-semibold">
                    {loc.totalStock}
                  </App_Text>
                </td>
                <td className="py-3 px-4">
                  <span
                    className={`text-xs px-2.5 py-1 rounded-full font-medium ${statusStyles[loc.status]}`}
                  >
                    {loc.status}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <button
                    type="button"
                    className="p-1.5 rounded hover:bg-[#f5f2ee] text-muted-foreground"
                  >
                    <MoreHorizontal size={15} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default Tab_Inv_Locations;
