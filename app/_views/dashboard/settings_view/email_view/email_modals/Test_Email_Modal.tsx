"use client";

import { useState } from "react";
import { X, Send, CheckCircle2 } from "lucide-react";
import App_Button from "@/components/app_ui/App_Button";
import App_Text from "@/components/app_ui/App_Text";
import { useSendTestEmail } from "../email_hooks/useEmailMutation";

type Props = { onClose: () => void };

const Test_Email_Modal = ({ onClose }: Props) => {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const { mutate: sendTest, isPending } = useSendTestEmail();

  const handleSend = () => {
    if (!email) return;
    sendTest(email, {
      onSuccess: () => setSent(true),
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 space-y-4">
        <div className="flex items-center justify-between">
          <App_Text variant="cardHeading" className="text-base">
            Send Test Email
          </App_Text>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-[#f5f2ee] text-muted-foreground"
          >
            <X size={16} />
          </button>
        </div>

        {sent ? (
          <div className="flex flex-col items-center gap-3 py-4">
            <CheckCircle2 size={40} className="text-[#2e7d52]" />
            <App_Text variant="cardHeading">Test Email Sent!</App_Text>
            <App_Text variant="tableCellMuted" className="text-center">
              Check your inbox at {email} to verify the SMTP configuration.
            </App_Text>
            <App_Button
              text="Close"
              type="button"
              onPress={onClose}
              btnStyle="text-xs bg-primary text-white hover:bg-primary/90 rounded-lg px-4 py-2 h-auto"
            />
          </div>
        ) : (
          <>
            <App_Text variant="tableCellMuted">
              Enter an email address to verify your SMTP settings are configured
              correctly.
            </App_Text>
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="test@example.com"
                className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2.5 bg-white outline-none focus:border-primary"
              />
            </div>
            <div className="flex gap-3 pt-1">
              <App_Button
                text="Cancel"
                type="button"
                onPress={onClose}
                btnStyle="flex-1 text-xs border border-[#e0dbd4] bg-white text-[text] hover:bg-[#f5f2ee] rounded-xl py-2.5 h-auto"
              />
              <App_Button
                text={isPending ? "Sending..." : "Send Test"}
                icon={<Send size={13} />}
                type="button"
                onPress={handleSend}
                btnStyle="flex-1 text-xs bg-primary text-white hover:bg-primary/90 rounded-xl py-2.5 h-auto"
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Test_Email_Modal;
