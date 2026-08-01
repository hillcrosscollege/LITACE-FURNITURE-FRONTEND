"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import App_Text from "@/components/app_ui/App_Text";
import App_Button from "@/components/app_ui/App_Button";
import { useRestockHistory } from "../../inventory_hooks/useInventoryQueries";
import Restock_Modal from "../../inventory_modals/Restock_Modal";
import { InventoryProduct } from "../../inventory_types";

type Props = { productId: string; product: InventoryProduct };

const Tab_Inv_RestockHistory = ({ productId, product }: Props) => {
  const [showRestock, setShowRestock] = useState(false);
  const { data, isLoading } = useRestockHistory(productId);

  if (isLoading)
    return (
      <div className="flex justify-center py-10">
        <Loader2 size={20} className="text-primary animate-spin" />
      </div>
    );

  return (
    <>
      <div className="space-y-3">
        <div className="flex justify-end">
          <App_Button
            text="Restock Inventory"
            type="button"
            onPress={() => setShowRestock(true)}
            btnStyle="text-xs bg-primary text-white hover:bg-primary/90 rounded-lg px-3 py-2 h-auto"
          />
        </div>
        <div className="bg-white rounded-2xl border border-[#ede8e2] shadow-sm overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#ede8e2]">
                {[
                  "Date",
                  "Quantity",
                  "Supplier",
                  "Unit Cost",
                  "Total Cost",
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
                    <App_Text variant="tableCell" className="font-semibold">
                      +{row.quantity}
                    </App_Text>
                  </td>
                  <td className="py-3 px-4">
                    <App_Text variant="tableCell">{row.supplier}</App_Text>
                  </td>
                  <td className="py-3 px-4">
                    <App_Text variant="tableCellMuted">
                      R{row.unitCost.toLocaleString()}
                    </App_Text>
                  </td>
                  <td className="py-3 px-4">
                    <App_Text variant="tableCell" className="font-semibold">
                      R{row.totalCost.toLocaleString()}
                    </App_Text>
                  </td>
                  <td className="py-3 px-4">
                    <App_Text variant="tableCellMuted">
                      {row.reference}
                    </App_Text>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {showRestock && (
        <Restock_Modal
          product={product}
          onClose={() => setShowRestock(false)}
        />
      )}
    </>
  );
};
export default Tab_Inv_RestockHistory;
