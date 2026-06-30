"use client";

import { useState } from "react";
import { Plus, Pencil, Trash2, Users } from "lucide-react";
import App_Button from "@/components/app_ui/App_Button";
import App_Text from "@/components/app_ui/App_Text";
import { useDeleteRole } from "../user_management_hooks/useUserManagementMutations";
import { useRoles } from "../user_management_hooks/useUserManagementQueries";
import Edit_Role_Modal from "../user_management_modal/Edit_Role_Modal";
import { Role } from "../user_management_types";
import App_Loader from "@/components/app_ui/App_Loader";

const Roles_Tab = () => {
  const { data: roles, isLoading } = useRoles();
  const { mutate: deleteRole } = useDeleteRole();
  const [editRole, setEditRole] = useState<Role | "new" | null>(null);

  if (isLoading || !roles) return <App_Loader label="Loading roles..." />;

  return (
    <>
      <div className="space-y-3">
        <div className="flex items-center justify-end">
          <App_Button
            text="Add Role"
            icon={<Plus size={13} />}
            type="button"
            onPress={() => setEditRole("new")}
            btnStyle="text-xs bg-primary text-white hover:bg-primary/90 rounded-lg px-3 py-2 h-auto"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {roles.map((role) => (
            <div
              key={role.id}
              className="bg-white rounded-2xl border border-[#ede8e2] shadow-sm p-4 space-y-3"
            >
              <div className="flex items-start justify-between">
                <App_Text variant="cardHeading">{role.name}</App_Text>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => setEditRole(role)}
                    className="p-1.5 rounded hover:bg-[#f5f2ee] text-muted-foreground"
                  >
                    <Pencil size={13} />
                  </button>
                  {role.name !== "Super Admin" && (
                    <button
                      type="button"
                      onClick={() => deleteRole(role.id)}
                      className="p-1.5 rounded hover:bg-[#fdecea] text-[#c0392b]"
                    >
                      <Trash2 size={13} />
                    </button>
                  )}
                </div>
              </div>
              <App_Text variant="tableCellMuted">{role.description}</App_Text>
              <div className="flex items-center gap-1.5 pt-2 border-t border-[#ede8e2]">
                <Users size={12} className="text-muted-foreground" />
                <App_Text variant="tableCellMuted">
                  {role.userCount} {role.userCount === 1 ? "user" : "users"}
                </App_Text>
                <span className="text-muted-foreground mx-1">·</span>
                <App_Text variant="tableCellMuted">
                  {role.permissions.length} permissions
                </App_Text>
              </div>
            </div>
          ))}
        </div>
      </div>

      {editRole && (
        <Edit_Role_Modal
          role={editRole === "new" ? undefined : editRole}
          onClose={() => setEditRole(null)}
        />
      )}
    </>
  );
};

export default Roles_Tab;
