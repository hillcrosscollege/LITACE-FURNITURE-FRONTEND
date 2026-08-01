"use client";
import App_Text from "@/components/app_ui/App_Text";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { RecentOrder } from "../dash_types";
import { statusStyles } from "../dash_data/dash_data";

const Recent_Orders = ({ recentOrders }: { recentOrders: RecentOrder[] }) => {
  const router = useRouter();
  return (
    <div className="bg-white rounded-2xl border border-[#ede8e2] p-4 shadow-sm md:w-[40%]">
      <div className="flex items-center justify-between mb-3">
        <App_Text variant="cardHeading">Recent Orders</App_Text>
        <button
          type="button"
          onClick={() => router.push("/dashboard/orders")}
          className="text-xs text-primary hover:underline"
        >
          View All
        </button>
      </div>

      <div className="flex flex-col gap-3">
        {recentOrders?.map((order) => (
          <div
            key={order.id}
            className="flex items-center gap-3 cursor-pointer hover:bg-[#faf9f7] -mx-1 px-1 rounded-lg transition-colors"
            onClick={() => router.push(`/dashboard/orders/${order.id}`)}
          >
            <div className="w-10 h-10 rounded-lg bg-[#f0e8df] shrink-0 overflow-hidden">
              <Image
                src={order.image}
                alt={order.product}
                width={40}
                height={40}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <App_Text variant="tableCell" className="font-medium truncate">
                {order.product}
              </App_Text>
              <App_Text variant="tableCellMuted">{order.id}</App_Text>
            </div>
            <div className="flex flex-col items-end gap-1 shrink-0">
              <App_Text variant="tableCell" className="font-semibold">
                {order.price}
              </App_Text>
              <span
                className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${statusStyles[order.status]}`}
              >
                {order.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recent_Orders;
