"use client";

import App_Text from "@/components/app_ui/App_Text";
import Image from "next/image";
import { orderDetail } from "../../orders_view_data/orders_data";
import { useOrderContext } from "@/app/contexts/admin/Orders_Context";

const Tab_Order_Items = () => {
  const { order } = useOrderContext();
  // const { items, summary } = orderDetail;
  return (
    <div className="space-y-4">
      <App_Text variant="cardHeading">Order Items</App_Text>
      <div className="bg-white rounded-2xl border border-[#ede8e2] overflow-hidden">
        <div className="grid grid-cols-[2fr_1fr_1fr_1fr] gap-4 px-4 py-3 bg-[#faf9f7] border-b border-[#ede8e2]">
          {["Item", "Qty", "Price", "Total"].map((h) => (
            <App_Text key={h} variant="tableHeader">
              {h}
            </App_Text>
          ))}
        </div>
        {order?.items.map((item, i) => (
          <div
            key={item.id}
            className={`grid grid-cols-[2fr_1fr_1fr_1fr] gap-4 px-4 py-4 items-center ${i < order?.items.length - 1 ? "border-b border-[#f5f2ee]" : ""}`}
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-[#f0e8df] overflow-hidden shrink-0">
                <Image
                  src={item.image}
                  alt={item.name}
                  width={48}
                  height={48}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <App_Text variant="tableCell" className="font-medium">
                  {item.name}
                </App_Text>
                <App_Text variant="tableCellMuted">SKU: {item.sku}</App_Text>
              </div>
            </div>
            <App_Text variant="tableCell">{item.qty}</App_Text>
            <App_Text variant="tableCell">
              R {item.price.toLocaleString()}
            </App_Text>
            <App_Text variant="tableCell" className="font-semibold">
              R {(item.price * item.qty).toLocaleString()}
            </App_Text>
          </div>
        ))}
        {/* Totals */}
        <div className="px-4 py-4 border-t border-[#ede8e2] space-y-2 bg-[#faf9f7]">
          {[
            { label: "Items Total", value: order?.summary.itemsTotal },
            { label: "Shipping Fee", value: order?.summary.shippingFee },
            { label: "Tax (7.5%)", value: order?.summary.tax },
          ].map(({ label, value }) => (
            <div key={label} className="flex items-center justify-between">
              <App_Text variant="tableCellMuted">{label}</App_Text>
              <App_Text variant="tableCell">
                R {value?.toLocaleString()}
              </App_Text>
            </div>
          ))}
          <div className="flex items-center justify-between pt-2 border-t border-[#ede8e2]">
            <App_Text variant="cardHeading">Total</App_Text>
            <App_Text variant="statValue" className="text-lg text-primary">
              R {order?.summary.totalAmount.toLocaleString()}
            </App_Text>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tab_Order_Items;
