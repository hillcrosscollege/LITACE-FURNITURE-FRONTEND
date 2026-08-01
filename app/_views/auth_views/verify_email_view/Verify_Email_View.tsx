// app/(auth)/verify-email/page.tsx
"use client";

import { CheckCircle2, XCircle, Loader2 } from "lucide-react";
import Link from "next/link";
import App_Text from "@/components/app_ui/App_Text";
import App_Button from "@/components/app_ui/App_Button";
import { useVerifyEmail } from "./verify_email_hook/useVerifyEmail";

const VerifyEmailPage = () => {
  const { isLoading, data, error, token, resend, isPending, sent, isError } =
    useVerifyEmail();

  const email =
    typeof window !== "undefined"
      ? (localStorage.getItem("pending_email") ?? "")
      : "";

  // No token in URL — user landed here directly without a link
  if (!token)
    return (
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8 text-center space-y-4">
          <XCircle size={40} className="text-[#c0392b] mx-auto" />
          <App_Text variant="cardTitle" className="font-bold text-primary">
            Invalid Link
          </App_Text>
          <App_Text variant="tableCellMuted">
            No verification token found. Please use the link sent to your email.
          </App_Text>
          <Link href="/verify-email/pending">
            <App_Button
              text="Back to verification"
              type="button"
              btnStyle="w-full text-white py-3 h-auto text-sm mt-2"
            />
          </Link>
        </div>
      </div>
    );

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8 flex flex-col items-center gap-5 text-center">
        {/* Loading */}
        {isLoading && (
          <>
            <Loader2 size={40} className="text-primary animate-spin" />
            <App_Text variant="cardTitle" className="font-bold text-primary">
              Verifying your email...
            </App_Text>
            <App_Text variant="tableCellMuted">Please wait a moment.</App_Text>
          </>
        )}

        {/* Success */}
        {data?.message && (
          <>
            <div className="w-16 h-16 rounded-full bg-[#edf7f2] flex items-center justify-center">
              <CheckCircle2 size={32} className="text-[#2e7d52]" />
            </div>
            <App_Text variant="cardTitle" className="font-bold text-primary">
              Email Verified!
            </App_Text>
            <App_Text variant="tableCellMuted">
              Your email has been verified.{" "}
              <Link
                href="/sign-in"
                className="text-primary text-sm hover:underline"
              >
                Back to sign in
              </Link>
            </App_Text>
            {/* <Loader2 size={16} className="text-primary animate-spin" /> */}
          </>
        )}

        {/* Error */}
        {isError && (
          <>
            <div className="w-16 h-16 rounded-full bg-[#fdecea] flex items-center justify-center">
              <XCircle size={32} className="text-[#c0392b]" />
            </div>
            <App_Text variant="cardTitle" className="font-bold text-primary">
              Verification Failed
            </App_Text>

            {/* Resend option */}
            {sent ? (
              <div className="flex items-center gap-2 text-[#2e7d52]">
                <CheckCircle2 size={16} />
                <App_Text variant="tableCell" className="text-[#2e7d52]">
                  New link sent — check your email.
                </App_Text>
              </div>
            ) : (
              <App_Button
                text={isPending ? "Sending..." : "Resend verification link"}
                type="button"
                onPress={() => email && resend(email)}
                btnStyle="w-full text-white py-3 h-auto text-sm"
              />
            )}

            <Link
              href="/sign-in"
              className="text-primary text-sm hover:underline"
            >
              Back to sign in
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default VerifyEmailPage;
