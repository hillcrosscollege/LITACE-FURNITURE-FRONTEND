"use client";

import { useState } from "react";
import { MoreHorizontal, Plus, Pencil, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import App_Button from "@/components/app_ui/App_Button";
import App_Text from "@/components/app_ui/App_Text";
import {
  useToggleMethodStatus,
  useDeleteShippingMethod,
} from "../shipping_hooks/useShippingMutation";
import { useShippingMethods } from "../shipping_hooks/useShippingQueries";
import Add_Shipping_Method_Modal from "../shipping_modal/Add_Shipping_Method_Modal";
import App_Loader from "@/components/app_ui/App_Loader";

const Shipping_Methods_Tab = () => {
  const [showAdd, setShowAdd] = useState(false);
  const { data: methods, isLoading } = useShippingMethods();
  const { mutate: toggleStatus } = useToggleMethodStatus();
  const { mutate: deleteMethod } = useDeleteShippingMethod();

  return (
    <>
      <div className="space-y-3">
        <div className="flex items-center justify-end">
          <App_Button
            text="Add Shipping Method"
            icon={<Plus size={13} />}
            type="button"
            onPress={() => setShowAdd(true)}
            btnStyle="text-xs bg-primary text-white hover:bg-primary/90 rounded-lg px-3 py-2 h-auto"
          />
        </div>

        {isLoading || !methods ? (
          <App_Loader label="Loading shipping methods..." />
        ) : (
          <div className="bg-white rounded-2xl border border-[#ede8e2] shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#ede8e2]">
                    {["Method", "Description", "Status", "Actions"].map((h) => (
                      <th key={h} className="text-left py-3 px-4">
                        <App_Text variant="tableHeader">{h}</App_Text>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {methods.map((method) => (
                    <tr
                      key={method.id}
                      className="border-b border-[#f5f2ee] last:border-0 hover:bg-[#faf9f7]"
                    >
                      <td className="py-3 px-4">
                        <App_Text variant="tableCell" className="font-medium">
                          {method.name}
                        </App_Text>
                      </td>
                      <td className="py-3 px-4">
                        <App_Text variant="tableCellMuted">
                          {method.description}
                        </App_Text>
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                            method.status === "Active"
                              ? "bg-[#e8fdf0] text-[#157a45]"
                              : "bg-[#fdecea] text-[#a32020]"
                          }`}
                        >
                          {method.status}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <button
                              type="button"
                              className="p-1.5 rounded hover:bg-[#f5f2ee] text-muted-foreground transition-colors"
                            >
                              <MoreHorizontal size={15} />
                            </button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-44">
                            <DropdownMenuItem className="gap-2 cursor-pointer text-xs">
                              <Pencil size={13} /> Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="gap-2 cursor-pointer text-xs"
                              onClick={() =>
                                toggleStatus({
                                  id: method.id,
                                  status:
                                    method.status === "Active"
                                      ? "Inactive"
                                      : "Active",
                                })
                              }
                            >
                              {method.status === "Active"
                                ? "Deactivate"
                                : "Activate"}
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              className="gap-2 cursor-pointer text-xs text-[#c0392b] focus:text-[#c0392b] focus:bg-[#fdecea]"
                              onClick={() => deleteMethod(method.id)}
                            >
                              <Trash2 size={13} /> Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {showAdd && (
        <Add_Shipping_Method_Modal onClose={() => setShowAdd(false)} />
      )}
    </>
  );
};

export default Shipping_Methods_Tab;
