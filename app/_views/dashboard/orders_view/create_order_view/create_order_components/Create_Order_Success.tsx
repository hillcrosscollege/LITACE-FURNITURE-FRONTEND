// components/orders/create/Create_Order_Success.tsx
"use client";

import App_Button from "@/components/app_ui/App_Button";
import App_Text from "@/components/app_ui/App_Text";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

type Props = {
  order: any;
  onAddAnother: () => void;
  onViewOrder: () => void;
};

const Create_Order_Success = ({ order, onAddAnother, onViewOrder }: Props) => (
  <div className="flex flex-col items-center justify-center py-12 px-4 text-center space-y-6">
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
      className="w-24 h-24 rounded-full bg-[#e8fdf0] border-4 border-[#2e7d52]/20 flex items-center justify-center"
    >
      <CheckCircle2 size={48} className="text-[#2e7d52]" />
    </motion.div>

    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="space-y-2"
    >
      <App_Text variant="cardHeading" className="text-xl">
        Order Created Successfully!
      </App_Text>
      <App_Text variant="tableCellMuted">
        Order {order?.id} has been created and is now pending.
      </App_Text>
    </motion.div>

    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="w-full max-w-sm bg-[#faf9f7] rounded-xl border border-[#ede8e2] p-4 text-left space-y-2"
    >
      {[
        { label: "Order ID", value: order?.id },
        { label: "Status", value: order?.status },
        {
          label: "Total",
          value: `R ${Number(order?.total ?? 0).toLocaleString()}`,
        },
        { label: "Date", value: order?.date },
      ].map(({ label, value }) => (
        <div
          key={label}
          className="flex items-center justify-between py-1.5 border-b border-[#ede8e2] last:border-0"
        >
          <App_Text variant="tableCellMuted">{label}</App_Text>
          <App_Text
            variant="tableCell"
            className={`font-medium ${value === "Pending" ? "text-[#8a6300]" : ""}`}
          >
            {value}
          </App_Text>
        </div>
      ))}
    </motion.div>

    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="flex gap-3 w-full max-w-sm"
    >
      <App_Button
        text="Create Another"
        type="button"
        onPress={onAddAnother}
        btnStyle="flex-1 text-xs border border-[#e0dbd4] bg-white text-[text] hover:bg-[#f5f2ee] rounded-xl py-2.5 h-auto"
      />
      <App_Button
        text="View Order"
        type="button"
        onPress={onViewOrder}
        btnStyle="flex-1 text-xs bg-primary text-white hover:bg-primary/90 rounded-xl py-2.5 h-auto"
      />
    </motion.div>
  </div>
);

export default Create_Order_Success;
