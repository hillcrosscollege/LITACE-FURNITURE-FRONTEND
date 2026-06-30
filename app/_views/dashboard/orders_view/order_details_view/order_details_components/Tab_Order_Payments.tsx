// components/orders/details/tabs/Tab_Order_Payments.tsx
"use client";

import App_Text from "@/components/app_ui/App_Text";
import { orderDetail } from "../../orders_view_data/orders_data";
import { useOrderContext } from "@/app/contexts/admin/Orders_Context";

const Tab_Order_Payments = () => {
  const { order } = useOrderContext();
  const { payment, summary } = order!;
  return (
    <div className="space-y-4 max-w-2xl">
      <App_Text variant="cardHeading">Payment Information</App_Text>

      <div className="bg-[#faf9f7] rounded-xl border border-[#ede8e2] p-4 space-y-3">
        {[
          { label: "Payment Method", value: payment.method },
          { label: "Transaction ID", value: payment.transactionId },
          { label: "Payment Status", value: payment.status },
        ].map(({ label, value }) => (
          <div
            key={label}
            className="flex items-center justify-between py-2 border-b border-[#ede8e2] last:border-0"
          >
            <App_Text variant="tableCellMuted">{label}</App_Text>
            <App_Text
              variant="tableCell"
              className={`font-medium ${value === "Paid" ? "text-[#157a45]" : ""}`}
            >
              {value}
            </App_Text>
          </div>
        ))}
      </div>

      <div className="bg-[#faf9f7] rounded-xl border border-[#ede8e2] p-4 space-y-2">
        <App_Text variant="tableCell" className="font-semibold">
          Order Summary
        </App_Text>
        {[
          { label: "Items Total", value: summary.itemsTotal },
          { label: "Shipping Fee", value: summary.shippingFee },
          { label: "Tax (7.5%)", value: summary.tax },
        ].map(({ label, value }) => (
          <div key={label} className="flex items-center justify-between">
            <App_Text variant="tableCellMuted">{label}</App_Text>
            <App_Text variant="tableCell">R {value.toLocaleString()}</App_Text>
          </div>
        ))}
        <div className="flex items-center justify-between pt-2 border-t border-[#ede8e2]">
          <App_Text variant="cardHeading">Total Amount</App_Text>
          <App_Text variant="statValue" className="text-lg text-primary">
            R {summary.totalAmount.toLocaleString()}
          </App_Text>
        </div>
      </div>
    </div>
  );
};

export default Tab_Order_Payments;
