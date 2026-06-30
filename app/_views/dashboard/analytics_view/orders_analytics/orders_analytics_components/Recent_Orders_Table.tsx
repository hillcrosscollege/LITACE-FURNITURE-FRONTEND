"use client";

import App_Text from "@/components/app_ui/App_Text";
import { useRouter } from "next/navigation";
import { formatCurrency } from "../../overview_view/overview_data/overview_data";
import { RecentOrder } from "../order_analytics_types";

const statusStyles: Record<RecentOrder["status"], string> = {
  Completed: "bg-[#e8fdf0] text-[#157a45]",
  Pending: "bg-[#fdf5e0] text-[#8a6300]",
  Cancelled: "bg-[#fdecea] text-[#a32020]",
  Returned: "bg-[#f5f0fa] text-[#7048b6]",
};

const Recent_Orders_Table = ({ orders }: { orders: RecentOrder[] }) => {
  const router = useRouter();

  return (
    <div className="bg-white rounded-2xl border border-[#ede8e2] shadow-sm p-4 space-y-3">
      <App_Text variant="cardHeading">Recent Orders</App_Text>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#ede8e2]">
              {["Order ID", "Customer", "Status", "Date", "Amount"].map((h) => (
                <th key={h} className="text-left py-2 px-1">
                  <App_Text variant="tableHeader">{h}</App_Text>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr
                key={o.id}
                className="border-b border-[#f5f2ee] last:border-0 hover:bg-[#faf9f7] cursor-pointer"
                onClick={() => router.push(`/dashboard/orders/${o.id}`)}
              >
                <td className="py-2.5 px-1">
                  <App_Text variant="tableCell" className="font-medium">
                    {o.id}
                  </App_Text>
                </td>
                <td className="py-2.5 px-1">
                  <App_Text variant="tableCell">{o.customer}</App_Text>
                </td>
                <td className="py-2.5 px-1">
                  <span
                    className={`text-xs px-2.5 py-1 rounded-full font-medium ${statusStyles[o.status]}`}
                  >
                    {o.status}
                  </span>
                </td>
                <td className="py-2.5 px-1">
                  <App_Text variant="tableCellMuted">{o.date}</App_Text>
                </td>
                <td className="py-2.5 px-1">
                  <App_Text variant="tableCell" className="font-semibold">
                    {formatCurrency(o.amount)}
                  </App_Text>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button
        type="button"
        onClick={() => router.push("/dashboard/orders")}
        className="text-xs text-primary hover:underline"
      >
        View all orders
      </button>
    </div>
  );
};

export default Recent_Orders_Table;
