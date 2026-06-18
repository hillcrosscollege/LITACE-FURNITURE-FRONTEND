"use client";

import { X, Send } from "lucide-react";
import { useForm } from "react-hook-form";
import { useSendMessage } from "../customers_hooks/useCustomersMutations";
import App_Button from "@/components/app_ui/App_Button";
import App_Input from "@/components/app_ui/App_Input";
import App_Select from "@/components/app_ui/App_Select";
import App_Text from "@/components/app_ui/App_Text";
import App_Text_Area from "@/components/app_ui/App_Text_Area";
import { fakeCustomers } from "../cusomer_data/customer_data";

type Props = { customerId: string; onClose: () => void };
type Form = { to: string; subject: string; message: string };

const Send_Message_Modal = ({ customerId, onClose }: Props) => {
  const { mutate: sendMessage, isPending } = useSendMessage();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<Form>({
    defaultValues: { to: customerId },
  });
  const toValue = watch("to") ?? "";

  const customerOptions = fakeCustomers.map((c) => ({
    label: `${c.name} (${c.email})`,
    key: c.id,
  }));

  const onSubmit = (data: Form) => {
    sendMessage(
      { customerId: data.to, subject: data.subject, message: data.message },
      { onSuccess: onClose },
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-md p-6 space-y-4">
        <div className="flex items-center justify-between">
          <App_Text variant="cardHeading" className="text-base">
            Send Message
          </App_Text>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-[#f5f2ee] text-muted-foreground"
          >
            <X size={16} />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <App_Select
            data={customerOptions}
            value={toValue}
            placeholder="Select customer"
            title="To"
            onChange={(val) => setValue("to", val)}
            style="gap-1.5"
          />
          <App_Input
            name="subject"
            register={register}
            errors={errors}
            placeholder="Enter subject"
            rules={{ required: "Subject is required" }}
          />
          <div className="space-y-1.5">
            <App_Text variant="tableCell" className="font-medium">
              Message
            </App_Text>
            <App_Text_Area
              name="message"
              register={register}
              errors={errors}
              placeholder="Type your message..."
              rules={{ required: "Message is required" }}
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
              text={isPending ? "Sending..." : "Send Message"}
              icon={<Send size={13} />}
              type="submit"
              btnStyle="flex-1 text-xs bg-primary text-white hover:bg-primary/90 rounded-xl py-2.5 h-auto"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Send_Message_Modal;
