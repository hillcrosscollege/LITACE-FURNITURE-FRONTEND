"use client";

import { ShieldX } from "lucide-react";
import { useForm } from "react-hook-form";
import { useBlockCustomer } from "../customers_hooks/useCustomersMutations";
import App_Button from "@/components/app_ui/App_Button";
import App_Select from "@/components/app_ui/App_Select";
import App_Text from "@/components/app_ui/App_Text";
import App_Text_Area from "@/components/app_ui/App_Text_Area";
import App_Modal from "@/components/app_ui/App_Modal";

type Props = { customerId: string; customerName: string; onClose: () => void };
type Form = { reason: string; note: string };

const reasons = [
  { label: "Fraudulent activity", key: "fraud" },
  { label: "Chargeback issue", key: "chargeback" },
  { label: "Policy violation", key: "policy" },
  { label: "Manual admin restriction", key: "manual" },
  { label: "Other", key: "other" },
];

const Block_Customer_Modal = ({ customerId, customerName, onClose }: Props) => {
  const { mutate: blockCustomer, isPending } = useBlockCustomer();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<Form>();
  const reasonValue = watch("reason") ?? "";

  const onSubmit = (data: Form) => {
    blockCustomer(
      { id: customerId, reason: data.reason, note: data.note },
      { onSuccess: onClose },
    );
  };

  return (
    <App_Modal onClose={onClose} text="Block / Suspend Customer">
      <div className="flex justify-center">
        <div className="w-14 h-14 rounded-2xl bg-[#fdecea] flex items-center justify-center">
          <ShieldX size={26} className="text-[#c0392b]" />
        </div>
      </div>

      <div className="text-center">
        <App_Text variant="cardHeading" children={`Block ${customerName}?`} />
        <App_Text variant="tableCellMuted">
          This will prevent the customer from accessing their account.
        </App_Text>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <App_Select
          data={reasons}
          value={reasonValue}
          placeholder="Select a reason"
          title="Reason"
          onChange={(val) => setValue("reason", val)}
          style="gap-1.5"
        />

        <div className="space-y-1.5">
          <App_Text variant="tableCell" className="font-medium">
            Admin Note (optional)
          </App_Text>
          <App_Text_Area
            name="note"
            register={register}
            errors={errors}
            placeholder="Add a note..."
          />
        </div>

        <div className="flex gap-3 pt-1">
          <App_Button
            text="Cancel"
            type="button"
            onPress={onClose}
            btnStyle="flex-1 text-xs border border-[#e0dbd4] bg-white text-[#1e1a17] hover:bg-[#f5f2ee] rounded-xl py-2.5 h-auto"
          />
          <App_Button
            text={isPending ? "Suspending..." : "Suspend Customer"}
            type="submit"
            btnStyle="flex-1 text-xs bg-[#c0392b] text-white hover:bg-[#a93226] rounded-xl py-2.5 h-auto"
          />
        </div>
      </form>
    </App_Modal>
  );
};

export default Block_Customer_Modal;
