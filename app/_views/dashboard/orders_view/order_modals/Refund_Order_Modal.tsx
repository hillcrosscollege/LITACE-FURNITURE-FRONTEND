"use client";

import { useOrderContext } from "@/app/contexts/admin/Orders_Context";
import App_Button from "@/components/app_ui/App_Button";
import App_Input from "@/components/app_ui/App_Input";
import App_Modal from "@/components/app_ui/App_Modal";
import App_Text from "@/components/app_ui/App_Text";
import { RotateCcw } from "lucide-react";
import { useForm } from "react-hook-form";

type Form = { method: string; amount: number; note: string };

const refundMethods = [
  "Bank Transfer",
  "Store Credit",
  "Original Payment Method",
  "Cash",
];

const Refund_Order_Modal = () => {
  const { setShowRefund, refundOrder, order } = useOrderContext();

  const onConfirm = (method: string, amount: number, note: string) => {
    refundOrder(
      { id: order!.id, method, amount, note },
      { onSuccess: () => setShowRefund(false) },
    );
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Form>({
    defaultValues: { amount: order?.summary?.totalAmount },
  });
  const onSubmit = (data: Form) =>
    onConfirm(data.method, data.amount, data.note);

  const onClose = () => setShowRefund(false);

  return (
    <App_Modal onClose={onClose} text={"Refund Order"}>
      <div className="flex justify-center">
        <div className="w-14 h-14 rounded-2xl bg-[#f5f0fa] flex items-center justify-center">
          <RotateCcw size={26} className="text-primary" />
        </div>
      </div>

      <div className="text-center">
        <App_Text variant="cardHeading">Refund Order {order?.id}</App_Text>
        <App_Text variant="tableCellMuted">
          Total Refund Amount: ₦{order?.summary?.totalAmount.toLocaleString()}
        </App_Text>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-1.5">
          <label className="text-sm font-medium">Refund Method</label>
          <select
            {...register("method", {
              required: "Please select a refund method",
            })}
            className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2.5 bg-white outline-none focus:border-primary"
          >
            <option value="">Select refund method</option>
            {refundMethods.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
          {errors.method && (
            <p className="text-xs text-destructive">{errors.method.message}</p>
          )}
        </div>

        <App_Input
          name="amount"
          register={register}
          errors={errors}
          placeholder="Enter refund amount"
          rules={{
            required: "Amount is required",
            min: { value: 1, message: "Must be greater than 0" },
          }}
        />

        <div className="space-y-1.5">
          <label className="text-sm font-medium">Note (optional)</label>
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
            btnStyle="flex-1 text-xs border border-[#e0dbd4] bg-white text-[#1e1a17] hover:bg-[#f5f2ee] rounded-xl py-2.5 h-auto"
          />
          <App_Button
            text="Process Refund"
            type="submit"
            btnStyle="flex-1 text-xs bg-primary text-white hover:bg-primary/90 rounded-xl py-2.5 h-auto"
          />
        </div>
      </form>
    </App_Modal>
  );
};

export default Refund_Order_Modal;
