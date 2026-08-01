"use client";

import App_Button from "@/components/app_ui/App_Button";
import App_Text from "@/components/app_ui/App_Text";
import { X, Trash2 } from "lucide-react";
import { useDeleteUser } from "../user_management_hooks/useUserManagementMutations";
import { AdminUser } from "../user_management_types";

type Props = { user: AdminUser; onClose: () => void };

const Delete_User_Modal = ({ user, onClose }: Props) => {
  const { mutate: deleteUser, isPending } = useDeleteUser();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 space-y-5 text-center">
        <div className="flex items-center justify-between">
          <App_Text variant="cardHeading" className="text-base">
            Delete User
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
          <div className="w-14 h-14 rounded-2xl bg-[#fdecea] flex items-center justify-center">
            <Trash2 size={26} className="text-[#c0392b]" />
          </div>
        </div>

        <App_Text variant="cardHeading">Delete {user.name}?</App_Text>
        <App_Text variant="tableCellMuted" className="text-[#c0392b]">
          This action cannot be undone.
        </App_Text>

        <div className="flex gap-3">
          <App_Button
            text="Cancel"
            type="button"
            onPress={onClose}
            btnStyle="flex-1 text-xs border border-[#e0dbd4] bg-white text-[text] hover:bg-[#f5f2ee] rounded-xl py-2.5 h-auto"
          />
          <App_Button
            text={isPending ? "Deleting..." : "Delete User"}
            type="button"
            onPress={() => deleteUser(user.id, { onSuccess: onClose })}
            btnStyle="flex-1 text-xs bg-[#c0392b] text-white hover:bg-[#a93226] rounded-xl py-2.5 h-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default Delete_User_Modal;
