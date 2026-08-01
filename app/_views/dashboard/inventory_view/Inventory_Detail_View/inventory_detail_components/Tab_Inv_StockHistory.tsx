"use client";

import { Loader2 } from "lucide-react";
import App_Text from "@/components/app_ui/App_Text";
import { useStockHistory } from "../../inventory_hooks/useInventoryQueries";

const Tab_Inv_StockHistory = ({ productId }: { productId: string }) => {
  const { data, isLoading } = useStockHistory(productId);

  if (isLoading)
    return (
      <div className="flex justify-center py-10">
        <Loader2 size={20} className="text-primary animate-spin" />
      </div>
    );

  return (
    <div className="bg-white rounded-2xl border border-[#ede8e2] shadow-sm overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="border-b border-[#ede8e2]">
            {["Date", "Quantity", "Purpose", "Reference", "User", "Notes"].map(
              (h) => (
                <th key={h} className="text-left py-3 px-4">
                  <App_Text variant="tableHeader">{h}</App_Text>
                </th>
              ),
            )}
          </tr>
        </thead>
        <tbody>
          {data?.map((row) => (
            <tr
              key={row.id}
              className="border-b border-[#f5f2ee] last:border-0 hover:bg-[#faf9f7]"
            >
              <td className="py-3 px-4">
                <App_Text variant="tableCell">{row.date}</App_Text>
              </td>
              <td className="py-3 px-4">
                <App_Text
                  variant="tableCell"
                  className={`font-semibold ${row.quantity > 0 ? "text-[#2e7d52]" : "text-[#c0392b]"}`}
                >
                  {row.quantity > 0 ? `+${row.quantity}` : row.quantity}
                </App_Text>
              </td>
              <td className="py-3 px-4">
                <App_Text variant="tableCell">{row.purpose}</App_Text>
              </td>
              <td className="py-3 px-4">
                <App_Text variant="tableCellMuted">{row.reference}</App_Text>
              </td>
              <td className="py-3 px-4">
                <App_Text variant="tableCellMuted">{row.user}</App_Text>
              </td>
              <td className="py-3 px-4">
                <App_Text
                  variant="tableCellMuted"
                  className="max-w-[160px] truncate"
                >
                  {row.notes}
                </App_Text>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default Tab_Inv_StockHistory;
