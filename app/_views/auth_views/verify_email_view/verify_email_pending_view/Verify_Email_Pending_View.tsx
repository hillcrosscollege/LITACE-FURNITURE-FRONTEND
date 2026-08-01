"use client";

import { Mail, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import App_Text from "@/components/app_ui/App_Text";
import App_Button from "@/components/app_ui/App_Button";
import { useVerifyEmail } from "../verify_email_hook/useVerifyEmail";

const Verify_Email_Pending_View = () => {
  // Get email from localStorage so we can resend to the right address
  // Your signUp onSuccess should save it: localStorage.setItem("pending_email", data.user.email)
  const email =
    typeof window !== "undefined"
      ? (localStorage.getItem("pending_email") ?? "your email")
      : "your email";

  const { sent, resend, isPending, serverError } = useVerifyEmail();

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8 flex flex-col items-center gap-5 text-center">
        <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
          <Mail size={28} className="text-primary" />
        </div>

        <div className="space-y-1.5">
          <App_Text variant="cardTitle" className="font-bold text-primary">
            Check your email
          </App_Text>
          <App_Text variant="tableCellMuted">
            We sent a verification link to
          </App_Text>
          <App_Text variant="tableCell" className="font-semibold">
            {email}
          </App_Text>
          <App_Text variant="tableCellMuted">
            Click the link in the email to verify your account.
          </App_Text>
        </div>

        {/* Resend section */}
        {sent ? (
          <div className="flex items-center gap-2 text-[#2e7d52]">
            <CheckCircle2 size={16} />
            <App_Text variant="tableCell" className="text-[#2e7d52]">
              Verification email resent!
            </App_Text>
          </div>
        ) : (
          <div className="space-y-2 w-full">
            {serverError && (
              <div className="bg-[#fdecea] border border-[#f5c6c6] rounded-xl px-4 py-2">
                <p className="text-xs text-[#c0392b]">{serverError}</p>
              </div>
            )}
            <App_Text variant="tableCellMuted">Didn't receive it?</App_Text>
            <App_Button
              text={isPending ? "Resending..." : "Resend verification email"}
              type="button"
              onPress={() => resend(email)}
              btnStyle="w-full text-white py-3 h-auto text-sm"
            />
          </div>
        )}

        <div className="flex gap-1 text-sm">
          <p className="text-muted-foreground">Wrong email?</p>
          <Link
            href="/sign-up"
            className="text-primary font-medium hover:underline"
          >
            Sign up again
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Verify_Email_Pending_View;
