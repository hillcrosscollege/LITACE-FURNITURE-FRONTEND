// components/customers/add/Add_Customer_Success.tsx
"use client";

import App_Button from "@/components/app_ui/App_Button";
import App_Text from "@/components/app_ui/App_Text";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

type Props = {
  customer: any;
  onAddAnother: () => void;
  onViewCustomer: () => void;
};

const Add_Customer_Success = ({
  customer,
  onAddAnother,
  onViewCustomer,
}: Props) => (
  <div className="flex flex-col items-center justify-center py-8 px-4 text-center space-y-6">
    {/* Animated checkmark */}
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
      className="relative"
    >
      {/* Decorative dots */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3 + i * 0.05 }}
          className="absolute w-2 h-2 rounded-full bg-primary/30"
          style={{
            top: `${50 + 55 * Math.sin((i * 60 * Math.PI) / 180)}%`,
            left: `${50 + 55 * Math.cos((i * 60 * Math.PI) / 180)}%`,
            transform: "translate(-50%, -50%)",
          }}
        />
      ))}
      <div className="w-24 h-24 rounded-full bg-[#e8fdf0] border-4 border-[#2e7d52]/20 flex items-center justify-center">
        <CheckCircle2 size={48} className="text-[#2e7d52]" />
      </div>
    </motion.div>

    {/* Text */}
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="space-y-2"
    >
      <App_Text variant="cardHeading" className="text-xl">
        Customer Created Successfully!
      </App_Text>
      <App_Text variant="tableCellMuted">
        {customer?.name ?? "Customer"} has been added to your customers list.
      </App_Text>
    </motion.div>

    {/* Summary card */}
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="w-full max-w-sm bg-[#faf9f7] rounded-xl border border-[#ede8e2] p-4 text-left space-y-2"
    >
      {[
        { label: "Customer Name", value: customer?.name },
        { label: "Email", value: customer?.email },
        { label: "Phone", value: customer?.phone },
        { label: "Status", value: customer?.status },
      ].map(({ label, value }) => (
        <div
          key={label}
          className="flex items-center justify-between py-1.5 border-b border-[#ede8e2] last:border-0"
        >
          <App_Text variant="tableCellMuted">{label}</App_Text>
          <App_Text
            variant="tableCell"
            className={`font-medium ${value === "Active" ? "text-[#157a45]" : ""}`}
          >
            {value}
          </App_Text>
        </div>
      ))}
    </motion.div>

    {/* Actions */}
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className="flex items-center gap-3 w-full max-w-sm"
    >
      <App_Button
        text="Add Another Customer"
        type="button"
        onPress={onAddAnother}
        btnStyle="flex-1 text-xs border border-[#e0dbd4] bg-white text-[text] hover:bg-[#f5f2ee] rounded-xl py-2.5 h-auto"
      />
      <App_Button
        text="View Customer"
        type="button"
        onPress={onViewCustomer}
        btnStyle="flex-1 text-xs bg-primary text-white hover:bg-primary/90 rounded-xl py-2.5 h-auto"
      />
    </motion.div>
  </div>
);

export default Add_Customer_Success;
