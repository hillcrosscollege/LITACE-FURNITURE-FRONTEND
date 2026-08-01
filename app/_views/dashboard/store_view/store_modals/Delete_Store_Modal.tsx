"use client";

import { useRouter } from "next/navigation";
import { X, AlertTriangle } from "lucide-react";
import Image from "next/image";
import App_Text from "@/components/app_ui/App_Text";
import App_Button from "@/components/app_ui/App_Button";
import { useDeleteStore } from "../store_hooks/useStoreMutation";
import { Store } from "../store_types";

type Props = { store: Store; onClose: () => void };

const Delete_Store_Modal = ({ store, onClose }: Props) => {
  const router = useRouter();
  const { mutate: deleteStore, isPending } = useDeleteStore();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 space-y-4">
        <div className="flex items-center justify-between">
          <App_Text variant="cardHeading" className="text-base">
            Delete Store
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
          <div className="w-14 h-14 rounded-2xl bg-[#fdf5e0] flex items-center justify-center">
            <AlertTriangle size={26} className="text-[#c87941]" />
          </div>
        </div>

        <div className="text-center space-y-1">
          <App_Text variant="cardHeading">Delete Store?</App_Text>
          <App_Text variant="tableCellMuted" className="text-[#c0392b]">
            This action cannot be undone. All associated data will be
            permanently removed.
          </App_Text>
        </div>

        <div className="bg-[#faf9f7] rounded-xl border border-[#ede8e2] p-3 flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-[#f0e8df] overflow-hidden shrink-0">
            <Image
              src={store.image}
              alt={store.name}
              width={40}
              height={40}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <App_Text variant="tableCell" className="font-semibold">
              {store.name}
            </App_Text>
            <App_Text variant="tableCellMuted">
              {store.location} · Store Code: {store.storeCode}
            </App_Text>
          </div>
        </div>

        <div className="flex gap-3 pt-1">
          <App_Button
            text="Cancel"
            type="button"
            onPress={onClose}
            btnStyle="flex-1 text-xs border border-[#e0dbd4] bg-white text-[#1e1a17] hover:bg-[#f5f2ee] rounded-xl py-2.5 h-auto"
          />
          <App_Button
            text={isPending ? "Deleting..." : "Delete Store"}
            type="button"
            onPress={() =>
              deleteStore(store.id, {
                onSuccess: () => {
                  onClose();
                  router.push("/dashboard/stores");
                },
              })
            }
            btnStyle="flex-1 text-xs bg-[#c0392b] text-white hover:bg-[#a93226] rounded-xl py-2.5 h-auto"
          />
        </div>
      </div>
    </div>
  );
};
export default Delete_Store_Modal;
