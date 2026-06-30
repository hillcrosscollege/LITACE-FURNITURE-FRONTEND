"use client";

import App_Text from "@/components/app_ui/App_Text";
import { useRouter } from "next/navigation";
import { formatCurrency } from "../../overview_view/overview_data/overview_data";
import { CancellationReason } from "../order_analytics_types";

const Cancellation_Analysis_Table = ({
  reasons,
}: {
  reasons: CancellationReason[];
}) => {
  const router = useRouter();

  return (
    <div className="bg-white rounded-2xl border border-[#ede8e2] shadow-sm p-4 space-y-3">
      <App_Text variant="cardHeading">
        Cancellation Analysis (Top Reasons)
      </App_Text>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#ede8e2]">
              {["Reason", "Count", "Revenue Lost"].map((h) => (
                <th key={h} className="text-left py-2 px-1">
                  <App_Text variant="tableHeader">{h}</App_Text>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {reasons.map((r) => (
              <tr
                key={r.reason}
                className="border-b border-[#f5f2ee] last:border-0"
              >
                <td className="py-2.5 px-1">
                  <App_Text variant="tableCell">{r.reason}</App_Text>
                </td>
                <td className="py-2.5 px-1">
                  <App_Text variant="tableCell">{r.count}</App_Text>
                </td>
                <td className="py-2.5 px-1">
                  <App_Text
                    variant="tableCell"
                    className="font-medium text-[#c0392b]"
                  >
                    {formatCurrency(r.revenueLost)}
                  </App_Text>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button
        type="button"
        onClick={() =>
          router.push(
            "/dashboard/sales-analytics/orders-analytics/cancellations",
          )
        }
        className="text-xs text-primary hover:underline"
      >
        View all reasons
      </button>
    </div>
  );
};

export default Cancellation_Analysis_Table;
