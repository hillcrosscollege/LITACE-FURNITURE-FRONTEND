"use client";

import { useOrderContext } from "@/app/contexts/admin/Orders_Context";
import App_Button from "@/components/app_ui/App_Button";
import App_Modal from "@/components/app_ui/App_Modal";
import App_Text from "@/components/app_ui/App_Text";
import { XCircle } from "lucide-react";
import { useForm } from "react-hook-form";

type Props = {
  orderId: string;
  onClose: () => void;
  onConfirm: (reason: string, note: string) => void;
};
type Form = { reason: string; note: string };

const reasons = [
  "Customer request",
  "Out of stock",
  "Payment failed",
  "Duplicate order",
  "Other",
];

const Cancel_Order_Modal = () => {
  const { setShowCancel, cancelOrder, order } = useOrderContext();

  const onConfirm = (reason: string, note: string) => {
    cancelOrder(
      { id: order!.id, reason, note },
      { onSuccess: () => setShowCancel(false) },
    );
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Form>();
  const onSubmit = (data: Form) => onConfirm(data.reason, data.note);

  const onClose = () => setShowCancel(false);

  return (
    <App_Modal onClose={onClose} text={"Cancel Order"}>
      <div className="flex justify-center">
        <div className="w-14 h-14 rounded-2xl bg-[#fdecea] flex items-center justify-center">
          <XCircle size={26} className="text-[#c0392b]" />
        </div>
      </div>

      <div className="text-center space-y-1">
        <App_Text variant="cardHeading">Cancel Order {order!.id}?</App_Text>
        <App_Text variant="tableCellMuted" className="text-[#c0392b]">
          This action cannot be undone.
        </App_Text>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-1.5">
          <label className="text-sm font-medium">Reason for cancellation</label>
          <select
            {...register("reason", { required: "Please select a reason" })}
            className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2.5 bg-white outline-none focus:border-primary"
          >
            <option value="">Select a reason</option>
            {reasons.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
          {errors.reason && (
            <p className="text-xs text-destructive">{errors.reason.message}</p>
          )}
        </div>

        {/* <App_Select
          data={statuses}
          onChange={(value) => setValue("status", value as OrderStatus)}
          placeholder="Select Status"
          value={selectedStatus}
          style="flex-1"
        /> */}

        <div className="space-y-1.5">
          <label className="text-sm font-medium">
            Additional note (optional)
          </label>
          <textarea
            {...register("note")}
            placeholder="Add a note..."
            rows={3}
            className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2.5 bg-white outline-none focus:border-primary resize-none"
          />
        </div>

        <div className="flex gap-3 pt-1">
          <App_Button
            text="Close"
            type="button"
            onPress={onClose}
            btnStyle="flex-1 text-xs border border-[#e0dbd4] bg-white text-[text] hover:bg-[#f5f2ee] rounded-xl py-2.5 h-auto"
          />
          <App_Button
            text="Cancel Order"
            type="submit"
            btnStyle="flex-1 text-xs bg-[#c0392b] text-white hover:bg-[#a93226] rounded-xl py-2.5 h-auto"
          />
        </div>
      </form>
    </App_Modal>
  );
};

export default Cancel_Order_Modal;
