// components/customers/details/tabs/Tab_Cust_Communications.tsx
"use client";

import { useState } from "react";
import { Send, Mail, User } from "lucide-react";
import { useForm } from "react-hook-form";
import App_Button from "@/components/app_ui/App_Button";
import App_Input from "@/components/app_ui/App_Input";
import App_Text from "@/components/app_ui/App_Text";
import App_Text_Area from "@/components/app_ui/App_Text_Area";
import { Skeleton_Message_Item } from "../../customers_components/Customer_Skeleton";
import { useSendMessage } from "../../customers_hooks/useCustomersMutations";
import { useCustomerMessages } from "../../customers_hooks/useCustomersQueries";
import { CustomerMessage } from "../../customers_types";

type ComposeForm = { subject: string; message: string };

const Tab_Cust_Communications = ({ customerId }: { customerId: string }) => {
  const [showCompose, setShowCompose] = useState(false);
  const [selected, setSelected] = useState<CustomerMessage | null>(null);

  const { data: messages, isLoading } = useCustomerMessages(customerId);
  const { mutate: sendMessage, isPending } = useSendMessage();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ComposeForm>();

  const onSubmit = (data: ComposeForm) => {
    sendMessage(
      { customerId, subject: data.subject, message: data.message },
      {
        onSuccess: () => {
          reset();
          setShowCompose(false);
        },
      },
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <App_Text variant="cardHeading">Communications</App_Text>
        <App_Button
          text="Compose"
          icon={<Send size={13} />}
          type="button"
          onPress={() => {
            setShowCompose(true);
            setSelected(null);
          }}
          btnStyle="text-xs bg-primary text-white hover:bg-primary/90 rounded-lg px-3 py-2 h-auto"
        />
      </div>

      <div className="flex flex-col lg:flex-row gap-4 min-h-100">
        {/* Message list */}
        <div className="w-full lg:w-72 shrink-0 border border-[#ede8e2] rounded-2xl overflow-hidden">
          <div className="px-4 py-3 border-b border-[#ede8e2] bg-[#faf9f7]">
            <App_Text variant="tableCell" className="font-semibold">
              Inbox ({messages?.length ?? 0})
            </App_Text>
          </div>

          {isLoading ? (
            Array.from({ length: 4 }).map((_, i) => (
              <Skeleton_Message_Item key={i} />
            ))
          ) : (
            <div className="divide-y divide-[#f5f2ee]">
              {messages?.map((msg) => (
                <button
                  key={msg.id}
                  type="button"
                  onClick={() => {
                    setSelected(msg);
                    setShowCompose(false);
                  }}
                  className={`w-full text-left px-4 py-3 transition-colors ${
                    selected?.id === msg.id
                      ? "bg-primary/5 border-l-2 border-primary"
                      : "hover:bg-[#faf9f7] border-l-2 border-transparent"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <App_Text
                      variant="tableCell"
                      className={`text-[11px] truncate ${!msg.read ? "font-semibold" : ""}`}
                    >
                      {msg.subject}
                    </App_Text>
                    {!msg.read && (
                      <span className="w-2 h-2 rounded-full bg-primary shrink-0 mt-1" />
                    )}
                  </div>
                  <App_Text
                    variant="tableCellMuted"
                    className="text-[10px] mt-0.5 line-clamp-2"
                  >
                    {msg.message}
                  </App_Text>
                  <div className="flex items-center gap-1 mt-1">
                    {msg.from === "admin" ? (
                      <Mail size={10} className="text-primary" />
                    ) : (
                      <User size={10} className="text-muted-foreground" />
                    )}
                    <App_Text variant="tableCellMuted" className="text-[10px]">
                      {msg.date}
                    </App_Text>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right panel */}
        <div className="flex-1 border border-[#ede8e2] rounded-2xl overflow-hidden">
          {showCompose ? (
            <div className="p-5 space-y-4">
              <App_Text variant="cardHeading">New Message</App_Text>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
                    className="min-h-50"
                  />
                </div>
                <div className="flex gap-3">
                  <App_Button
                    text="Cancel"
                    type="button"
                    onPress={() => setShowCompose(false)}
                    btnStyle="text-xs border border-[#e0dbd4] bg-white text-[text] hover:bg-[#f5f2ee] rounded-lg px-4 py-2 h-auto"
                  />
                  <App_Button
                    text={isPending ? "Sending..." : "Send Message"}
                    icon={<Send size={13} />}
                    type="submit"
                    btnStyle="text-xs bg-primary text-white hover:bg-primary/90 rounded-lg px-4 py-2 h-auto"
                  />
                </div>
              </form>
            </div>
          ) : selected ? (
            <div className="p-5 space-y-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <App_Text variant="cardHeading">{selected.subject}</App_Text>
                  <div className="flex items-center gap-2 mt-1">
                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center ${
                        selected.from === "admin"
                          ? "bg-primary/10"
                          : "bg-[#f0e8df]"
                      }`}
                    >
                      {selected.from === "admin" ? (
                        <Mail size={11} className="text-primary" />
                      ) : (
                        <User size={11} className="text-muted-foreground" />
                      )}
                    </div>
                    <App_Text variant="tableCellMuted">
                      {selected.from === "admin"
                        ? "FurniCasa Admin"
                        : "John Doe"}{" "}
                      · {selected.date}
                    </App_Text>
                  </div>
                </div>
                <App_Button
                  text="Reply"
                  icon={<Send size={13} />}
                  type="button"
                  onPress={() => setShowCompose(true)}
                  btnStyle="text-xs border border-[#e0dbd4] bg-white text-[text] hover:bg-[#f5f2ee] rounded-lg px-3 py-2 h-auto flex-shrink-0"
                />
              </div>
              <div className="bg-[#faf9f7] rounded-xl border border-[#ede8e2] p-4">
                <App_Text variant="tableCell" className="leading-relaxed">
                  {selected.message}
                </App_Text>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full py-20 gap-3">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Mail size={20} className="text-primary" />
              </div>
              <App_Text variant="tableCellMuted">
                Select a message to read
              </App_Text>
              <App_Button
                text="Compose New"
                type="button"
                onPress={() => setShowCompose(true)}
                btnStyle="text-xs bg-primary text-white hover:bg-primary/90 rounded-lg px-4 py-2 h-auto"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Tab_Cust_Communications;
