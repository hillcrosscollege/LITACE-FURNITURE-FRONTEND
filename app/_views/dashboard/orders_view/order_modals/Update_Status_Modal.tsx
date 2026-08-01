"use client";

import App_Button from "@/components/app_ui/App_Button";
import App_Text from "@/components/app_ui/App_Text";
import { RefreshCw } from "lucide-react";
import { useForm } from "react-hook-form";
import { OrderStatus } from "../order_view_types";
import { orderStatusStyles } from "../orders_view_data/orders_data";
import App_Modal from "@/components/app_ui/App_Modal";
import App_Select from "@/components/app_ui/App_Select";
import { useOrderContext } from "@/app/contexts/admin/Orders_Context";

type Form = { status: OrderStatus; note: string };

const statuses = [
  { label: "Pending", key: "Pending" },
  { label: "Processing", key: "Processing" },
  { label: "Shipped", key: "Shipped" },
  { label: "Delivered", key: "Delivered" },
  { label: "Cancelled", key: "Cancelled" },
];

const Update_Status_Modal = () => {
  const { setShowUpdate, updateStatus, order } = useOrderContext();

  const onConfirm = (status: string, note: string) => {
    updateStatus(
      { id: order!.id, status, note },
      { onSuccess: () => setShowUpdate(false) },
    );
  };
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<Form>();
  const onSubmit = (data: Form) => onConfirm(data.status, data.note);
  const selectedStatus = watch("status");

  const onClose = () => setShowUpdate(false);

  return (
    <App_Modal onClose={onClose} text={"Update Order Status"}>
      <div className="flex justify-center">
        <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
          <RefreshCw size={26} className="text-primary" />
        </div>
      </div>

      <App_Text variant="cardHeading" className="text-center">
        Update status for {order?.id}
      </App_Text>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-1.5">
          <label className="text-sm font-medium">Current Status</label>
          <div className="flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-2.5 bg-[#faf9f7]">
            <span
              className={`text-xs px-2.5 py-1 rounded-full font-medium ${orderStatusStyles[order!.status]}`}
            >
              {order?.status}
            </span>
          </div>
        </div>

        <App_Select
          data={statuses}
          onChange={(value) => setValue("status", value as OrderStatus)}
          placeholder="Select Status"
          value={selectedStatus}
          style="flex-1"
        />

        <div className="space-y-1.5">
          <label className="text-sm font-medium">Add Note (optional)</label>
          <textarea
            {...register("note")}
            placeholder="Add a note about the update..."
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
            text="Update Status"
            type="submit"
            btnStyle="flex-1 text-xs bg-primary text-white hover:bg-primary/90 rounded-xl py-2.5 h-auto"
          />
        </div>
      </form>
    </App_Modal>
  );
};

export default Update_Status_Modal;
