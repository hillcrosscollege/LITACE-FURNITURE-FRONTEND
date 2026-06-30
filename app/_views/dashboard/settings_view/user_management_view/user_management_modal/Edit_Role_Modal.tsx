"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { useForm } from "react-hook-form";
import App_Button from "@/components/app_ui/App_Button";
import App_Input from "@/components/app_ui/App_Input";
import App_Text from "@/components/app_ui/App_Text";
import App_Text_Area from "@/components/app_ui/App_Text_Area";
import { permissionGroups } from "../user_management_data/user_management_data";
import {
  useUpdateRole,
  useAddRole,
} from "../user_management_hooks/useUserManagementMutations";
import { Role } from "../user_management_types";

type Props = { role?: Role; onClose: () => void };
type Form = { name: string; description: string };

const Edit_Role_Modal = ({ role, onClose }: Props) => {
  const isEdit = !!role;
  const [permissions, setPermissions] = useState<string[]>(
    role?.permissions ?? [],
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Form>({
    defaultValues: {
      name: role?.name ?? "",
      description: role?.description ?? "",
    },
  });

  const { mutate: updateRole, isPending: isUpdating } = useUpdateRole();
  const { mutate: addRole, isPending: isAdding } = useAddRole();
  const isPending = isUpdating || isAdding;

  const togglePermission = (id: string) =>
    setPermissions((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id],
    );

  const toggleSelectAll = () => {
    const allIds = permissionGroups.flatMap((g) =>
      g.permissions.map((p) => p.id),
    );
    setPermissions(permissions.length === allIds.length ? [] : allIds);
  };

  const onSubmit = (data: Form) => {
    if (isEdit) {
      updateRole(
        { id: role.id, payload: { ...data, permissions } },
        { onSuccess: onClose },
      );
    } else {
      addRole({ ...data, permissions }, { onSuccess: onClose });
    }
  };

  const allSelected =
    permissions.length ===
    permissionGroups.flatMap((g) => g.permissions).length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[85vh] overflow-y-auto">
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#ede8e2] sticky top-0 bg-white z-10">
          <App_Text variant="cardHeading" className="text-base">
            {isEdit ? "Edit Role" : "Add Role"}
          </App_Text>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-[#f5f2ee] text-muted-foreground"
          >
            <X size={16} />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
          <App_Input
            name="name"
            register={register}
            errors={errors}
            placeholder="Role Name"
            rules={{ required: "Role name is required" }}
          />

          <div className="space-y-1.5">
            <App_Text variant="tableCell" className="font-medium">
              Description
            </App_Text>
            <App_Text_Area
              name="description"
              register={register}
              errors={errors}
              placeholder="Describe what this role can do..."
            />
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <App_Text variant="tableCell" className="font-medium">
                Permissions
              </App_Text>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={allSelected}
                  onChange={toggleSelectAll}
                  className="w-4 h-4 accent-primary rounded"
                />
                <App_Text variant="tableCellMuted">Select All</App_Text>
              </label>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {permissionGroups.map((group) => (
                <div key={group.group} className="space-y-1.5">
                  <App_Text
                    variant="tableCellMuted"
                    className="font-semibold uppercase text-[10px] tracking-wider"
                  >
                    {group.group}
                  </App_Text>
                  {group.permissions.map((perm) => (
                    <label
                      key={perm.id}
                      className="flex items-center gap-2 cursor-pointer py-0.5"
                    >
                      <input
                        type="checkbox"
                        checked={permissions.includes(perm.id)}
                        onChange={() => togglePermission(perm.id)}
                        className="w-4 h-4 accent-primary rounded"
                      />
                      <App_Text variant="tableCell">{perm.label}</App_Text>
                    </label>
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-3 pt-2 border-t border-[#ede8e2] sticky bottom-0 bg-white">
            <App_Button
              text="Cancel"
              type="button"
              onPress={onClose}
              btnStyle="flex-1 text-xs border border-[#e0dbd4] bg-white text-[#1e1a17] hover:bg-[#f5f2ee] rounded-xl py-2.5 h-auto"
            />
            <App_Button
              text={isPending ? "Saving..." : "Save Changes"}
              type="submit"
              btnStyle="flex-1 text-xs bg-primary text-white hover:bg-primary/90 rounded-xl py-2.5 h-auto"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Edit_Role_Modal;
