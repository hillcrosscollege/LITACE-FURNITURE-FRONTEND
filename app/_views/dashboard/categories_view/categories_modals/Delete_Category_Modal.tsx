"use client";

import { useState } from "react";
import { Trash2, X } from "lucide-react";
import App_Button from "@/components/app_ui/App_Button";
import App_Text from "@/components/app_ui/App_Text";
import { categoriesList } from "../categories_data/categories_data";
import { useCategoryContext } from "@/app/contexts/admin/Category_Context";
import { useRouter } from "next/navigation";

const Delete_Category_Modal = () => {
  const router = useRouter();
  const [option, setOption] = useState<"reassign" | "delete">("reassign");
  const [targetId, setTargetId] = useState("");
  const { setShowDelete, name } = useCategoryContext();

  const onClose = () => setShowDelete(false);

  const onConfirm = (reassign: boolean, targetCategory?: string) => {
    console.log("Delete:", { reassign, targetCategory });
    setShowDelete(false);
    router.push("/dashboard/categories");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-md p-6 space-y-5">
        <div className="flex items-center justify-between">
          <App_Text variant="cardHeading" className="text-base">
            Delete Category
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

        <div className="text-center space-y-1.5">
          <App_Text variant="tableCellMuted">
            Are you sure you want to delete{" "}
            <span className="text-primary font-medium">{name}</span>? This
            action cannot be undone.
          </App_Text>
        </div>

        <div className="space-y-2">
          <App_Text variant="tableCell" className="font-medium">
            What would you like to do with the products?
          </App_Text>

          <label className="flex items-start gap-3 cursor-pointer p-3 rounded-xl border border-[#ede8e2] hover:bg-[#faf9f7] transition-colors">
            <input
              type="radio"
              name="deleteOption"
              checked={option === "reassign"}
              onChange={() => setOption("reassign")}
              className="mt-0.5 accent-primary"
            />
            <App_Text variant="tableCell" className="font-medium">
              Reassign products to another category
            </App_Text>
          </label>

          {option === "reassign" && (
            <select
              value={targetId}
              onChange={(e) => setTargetId(e.target.value)}
              className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2.5 bg-white outline-none focus:border-primary ml-6"
            >
              <option value="">Select category</option>
              {categoriesList
                .filter((c) => c.name !== name)
                .map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
            </select>
          )}

          <label className="flex items-start gap-3 cursor-pointer p-3 rounded-xl border border-[#ede8e2] hover:bg-[#faf9f7] transition-colors">
            <input
              type="radio"
              name="deleteOption"
              checked={option === "delete"}
              onChange={() => setOption("delete")}
              className="mt-0.5 accent-primary"
            />
            <App_Text variant="tableCell" className="font-medium">
              Delete all products in this category
            </App_Text>
          </label>
        </div>

        <div className="flex gap-3 pt-1">
          <App_Button
            text="Cancel"
            type="button"
            onPress={onClose}
            btnStyle="flex-1 text-xs border border-[#e0dbd4] bg-white text-[#1e1a17] hover:bg-[#f5f2ee] rounded-xl py-2.5 h-auto"
          />
          <App_Button
            text="Delete Category"
            type="button"
            onPress={() => onConfirm(option === "reassign", targetId)}
            btnStyle="flex-1 text-xs bg-[#c0392b] text-white hover:bg-[#a93226] rounded-xl py-2.5 h-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default Delete_Category_Modal;
