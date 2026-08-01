"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import App_Button from "@/components/app_ui/App_Button";
import App_Text from "@/components/app_ui/App_Text";

type Props = { onClose: () => void };

const Logout_Modal = ({ onClose }: Props) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    setIsLoading(true);
    // swap this for your real auth signout call
    await new Promise((res) => setTimeout(res, 800));
    router.push("/sign-in");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 space-y-5 text-center">
        <div className="flex justify-center">
          <div className="w-14 h-14 rounded-2xl bg-[#fdecea] flex items-center justify-center">
            <LogOut size={26} className="text-[#c0392b]" />
          </div>
        </div>

        <div className="space-y-1.5">
          <App_Text variant="cardHeading" className="text-lg">
            Log Out?
          </App_Text>
          <App_Text variant="tableCellMuted">
            You will be signed out of your admin account. Any unsaved changes
            will be lost.
          </App_Text>
        </div>

        <div className="flex gap-3">
          <App_Button
            text="Cancel"
            type="button"
            onPress={onClose}
            btnStyle="flex-1 text-xs border border-[#e0dbd4] bg-white text-[text] hover:bg-[#f5f2ee] rounded-xl py-2.5 h-auto"
          />
          <App_Button
            text={isLoading ? "Logging out..." : "Log Out"}
            type="button"
            onPress={handleLogout}
            btnStyle="flex-1 text-xs bg-[#c0392b] text-white hover:bg-[#a93226] rounded-xl py-2.5 h-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default Logout_Modal;
