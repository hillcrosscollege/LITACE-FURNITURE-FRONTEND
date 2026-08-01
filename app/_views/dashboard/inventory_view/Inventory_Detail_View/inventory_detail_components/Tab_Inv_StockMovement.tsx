"use client";

import { Loader2 } from "lucide-react";
import App_Text from "@/components/app_ui/App_Text";
import { useStockMovements } from "../../inventory_hooks/useInventoryQueries";

const typeStyles: Record<string, string> = {
  Sale: "bg-[#fdf5e0] text-[#8a6300]",
  Restock: "bg-[#edf2fb] text-[#3266ad]",
  Adjustment: "bg-[#f5f0fa] text-[#7048b6]",
  Transfer: "bg-[#e8fdf0] text-[#157a45]",
  Return: "bg-[#fdecea] text-[#a32020]",
};

const Tab_Inv_StockMovements = ({ productId }: { productId: string }) => {
  const { data, isLoading } = useStockMovements(productId);

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
            {[
              "Date",
              "Movement Type",
              "Quantity",
              "From",
              "To",
              "Reference",
            ].map((h) => (
              <th key={h} className="text-left py-3 px-4">
                <App_Text variant="tableHeader">{h}</App_Text>
              </th>
            ))}
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
                <span
                  className={`text-xs px-2.5 py-1 rounded-full font-medium ${typeStyles[row.movementType] ?? ""}`}
                >
                  {row.movementType}
                </span>
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
                <App_Text variant="tableCellMuted">{row.from}</App_Text>
              </td>
              <td className="py-3 px-4">
                <App_Text variant="tableCellMuted">{row.to}</App_Text>
              </td>
              <td className="py-3 px-4">
                <App_Text variant="tableCellMuted">{row.reference}</App_Text>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default Tab_Inv_StockMovements;
