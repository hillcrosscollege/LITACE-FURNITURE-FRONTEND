"use client";

import { useState } from "react";
import Image from "next/image";
import { Plus, Pencil, Trash2, Loader2 } from "lucide-react";
import App_Text from "@/components/app_ui/App_Text";
import App_Button from "@/components/app_ui/App_Button";
import { useStoreManagers } from "../store_hooks/useStoreQueries";
import Add_Manager_Modal from "../store_modals/Add_Manager_Modal";

const Tab_Store_Managers = ({ storeId }: { storeId: string }) => {
  const [showAdd, setShowAdd] = useState(false);
  const { data: managers, isLoading } = useStoreManagers(storeId);

  if (isLoading)
    return (
      <div className="flex justify-center py-10">
        <Loader2 size={20} className="text-primary animate-spin" />
      </div>
    );

  return (
    <>
      <div className="space-y-3">
        <div className="flex justify-end">
          <App_Button
            text="Add Manager"
            icon={<Plus size={13} />}
            type="button"
            onPress={() => setShowAdd(true)}
            btnStyle="text-xs bg-primary text-white hover:bg-primary/90 rounded-lg px-3 py-2 h-auto"
          />
        </div>
        <div className="bg-white rounded-2xl border border-[#ede8e2] shadow-sm overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#ede8e2]">
                {["Manager", "Role", "Phone", "Email", "Status", "Actions"].map(
                  (h) => (
                    <th key={h} className="text-left py-3 px-4">
                      <App_Text variant="tableHeader">{h}</App_Text>
                    </th>
                  ),
                )}
              </tr>
            </thead>
            <tbody>
              {managers?.map((mgr) => (
                <tr
                  key={mgr.id}
                  className="border-b border-[#f5f2ee] last:border-0 hover:bg-[#faf9f7]"
                >
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#f0e8df] overflow-hidden shrink-0">
                        <Image
                          src={mgr.avatar}
                          alt={mgr.name}
                          width={32}
                          height={32}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <App_Text variant="tableCell" className="font-medium">
                        {mgr.name}
                      </App_Text>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <App_Text variant="tableCell">{mgr.role}</App_Text>
                  </td>
                  <td className="py-3 px-4">
                    <App_Text variant="tableCellMuted">{mgr.phone}</App_Text>
                  </td>
                  <td className="py-3 px-4">
                    <App_Text variant="tableCellMuted">{mgr.email}</App_Text>
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`text-xs px-2.5 py-1 rounded-full font-medium ${mgr.status === "Active" ? "bg-[#e8fdf0] text-[#157a45]" : "bg-[#fdecea] text-[#a32020]"}`}
                    >
                      {mgr.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        className="p-1.5 rounded hover:bg-[#f5f2ee] text-muted-foreground"
                      >
                        <Pencil size={13} />
                      </button>
                      <button
                        type="button"
                        className="p-1.5 rounded hover:bg-[#fdecea] text-[#c0392b]"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <App_Text variant="tableCellMuted">
          Showing 1 to {managers?.length ?? 0} of {managers?.length ?? 0}{" "}
          managers
        </App_Text>
      </div>
      {showAdd && (
        <Add_Manager_Modal
          storeId={storeId}
          onClose={() => setShowAdd(false)}
        />
      )}
    </>
  );
};
export default Tab_Store_Managers;
