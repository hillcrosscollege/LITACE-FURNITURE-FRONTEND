"use client";

import App_Button from "@/components/app_ui/App_Button";
import App_Text from "@/components/app_ui/App_Text";
import { X, ShieldX } from "lucide-react";
import { useUpdateUserStatus } from "../user_management_hooks/useUserManagementMutations";
import { AdminUser } from "../user_management_types";

type Props = { user: AdminUser; onClose: () => void };

const Deactivate_User_Modal = ({ user, onClose }: Props) => {
  const { mutate: updateStatus, isPending } = useUpdateUserStatus();
  const newStatus = user.status === "Active" ? "Inactive" : "Active";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 space-y-5 text-center">
        <div className="flex items-center justify-between">
          <App_Text variant="cardHeading" className="text-base">
            {newStatus === "Inactive" ? "Deactivate" : "Activate"} User
          </App_Text>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-[#f5f2ee] text-muted-foreground"
          >
            <X size={16} />
          </button>
        </div>

        <div className="flex justify-center">
          <div className="w-14 h-14 rounded-2xl bg-[#fdf0e6] flex items-center justify-center">
            <ShieldX size={26} className="text-[#c87941]" />
          </div>
        </div>

        <App_Text variant="cardHeading">
          {newStatus === "Inactive" ? "Deactivate" : "Activate"} {user.name}?
        </App_Text>
        <App_Text variant="tableCellMuted">
          {newStatus === "Inactive"
            ? "This user will no longer be able to log in to the admin dashboard."
            : "This user will regain access to the admin dashboard."}
        </App_Text>

        <div className="flex gap-3">
          <App_Button
            text="Cancel"
            type="button"
            onPress={onClose}
            btnStyle="flex-1 text-xs border border-[#e0dbd4] bg-white text-[#1e1a17] hover:bg-[#f5f2ee] rounded-xl py-2.5 h-auto"
          />
          <App_Button
            text={
              isPending
                ? "Updating..."
                : `${newStatus === "Inactive" ? "Deactivate" : "Activate"} User`
            }
            type="button"
            onPress={() =>
              updateStatus(
                { id: user.id, status: newStatus },
                { onSuccess: onClose },
              )
            }
            btnStyle={`flex-1 text-xs rounded-xl py-2.5 h-auto text-white ${newStatus === "Inactive" ? "bg-[#c87941] hover:bg-[#b56a35]" : "bg-primary hover:bg-primary/90"}`}
          />
        </div>
      </div>
    </div>
  );
};

export default Deactivate_User_Modal;
