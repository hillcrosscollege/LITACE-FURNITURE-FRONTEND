"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import App_Button from "@/components/app_ui/App_Button";
import App_Text from "@/components/app_ui/App_Text";
import { useDeleteCustomer } from "../customers_hooks/useCustomersMutations";
import { useCustomerContext } from "@/app/contexts/admin/Customer_Context";
import App_Modal from "@/components/app_ui/App_Modal";

const Delete_Customer_Modal = () => {
  const [option, setOption] = useState<"keep" | "all" | "cancel">("keep");
  const { mutate: deleteCustomer, isPending } = useDeleteCustomer();

  const { customer, setShowDelete } = useCustomerContext();

  const onClose = () => setShowDelete(false);
  const router = useRouter();

  const handleConfirm = () => {
    if (option === "cancel") {
      onClose();
      return;
    }
    deleteCustomer(
      { id: customer!.id, keepHistory: option === "keep" },
      {
        onSuccess: () => {
          onClose();
          router.push("/dashboard/customers");
        },
      },
    );
  };

  return (
    <App_Modal onClose={onClose} text="Delete Customer">
      <div className="bg-[#fdecea] border border-[#f5c6c6] rounded-xl px-4 py-3">
        <App_Text
          variant="tableCellMuted"
          className="text-[#c0392b]"
          children="This action cannot be undone. Please choose how you want to proceed."
        />
      </div>

      <div className="space-y-2">
        {[
          {
            id: "keep",
            label: "Delete customer and keep order history",
            desc: "Orders and transactional data will be retained.",
          },
          {
            id: "all",
            label: "Delete customer and all data",
            desc: "This will permanently delete all customer data.",
          },
          { id: "cancel", label: "Cancel", desc: "" },
        ].map((opt) => (
          <label
            key={opt.id}
            className={`flex items-start gap-3 cursor-pointer p-3 rounded-xl border transition-colors ${
              option === opt.id
                ? "border-primary bg-primary/5"
                : "border-[#ede8e2] hover:bg-[#faf9f7]"
            }`}
          >
            <input
              type="radio"
              name="deleteOption"
              checked={option === opt.id}
              onChange={() => setOption(opt.id as any)}
              className="mt-0.5 accent-primary"
            />
            <div>
              <App_Text
                variant="tableCell"
                className="font-medium"
                children={opt.label}
              />
              {opt.desc && (
                <App_Text variant="tableCellMuted" children={opt.desc} />
              )}
            </div>
          </label>
        ))}
      </div>

      <div className="flex gap-3 pt-1">
        <App_Button
          text="Cancel"
          type="button"
          onPress={onClose}
          btnStyle="flex-1 text-xs border border-[#e0dbd4] bg-white text-[#1e1a17] hover:bg-[#f5f2ee] rounded-xl py-2.5 h-auto"
        />
        <App_Button
          text={isPending ? "Deleting..." : "Delete Customer"}
          type="button"
          onPress={handleConfirm}
          btnStyle="flex-1 text-xs bg-[#c0392b] text-white hover:bg-[#a93226] rounded-xl py-2.5 h-auto"
        />
      </div>
    </App_Modal>
  );
};

export default Delete_Customer_Modal;
