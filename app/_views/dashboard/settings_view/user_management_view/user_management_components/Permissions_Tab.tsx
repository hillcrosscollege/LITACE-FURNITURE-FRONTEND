"use client";

import App_Text from "@/components/app_ui/App_Text";
import { Check } from "lucide-react";
import { permissionGroups } from "../user_management_data/user_management_data";
import { useRoles } from "../user_management_hooks/useUserManagementQueries";
import App_Loader from "@/components/app_ui/App_Loader";

const Permissions_Tab = () => {
  const { data: roles, isLoading } = useRoles();

  if (isLoading || !roles) return <App_Loader label="Loading permissions..." />;

  return (
    <div className="bg-white rounded-2xl border border-[#ede8e2] shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#ede8e2]">
              <th className="text-left py-3 px-4">
                <App_Text variant="tableHeader">Permission</App_Text>
              </th>
              {roles.map((role) => (
                <th key={role.id} className="text-center py-3 px-4">
                  <App_Text variant="tableHeader">{role.name}</App_Text>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {permissionGroups.map((group) => (
              <>
                <tr key={group.group} className="bg-[#faf9f7]">
                  <td colSpan={roles.length + 1} className="py-2 px-4">
                    <App_Text
                      variant="tableCellMuted"
                      className="font-semibold uppercase text-[10px] tracking-wider"
                    >
                      {group.group}
                    </App_Text>
                  </td>
                </tr>
                {group.permissions.map((perm) => (
                  <tr
                    key={perm.id}
                    className="border-b border-[#f5f2ee] last:border-0"
                  >
                    <td className="py-2.5 px-4">
                      <App_Text variant="tableCell">{perm.label}</App_Text>
                    </td>
                    {roles.map((role) => (
                      <td key={role.id} className="py-2.5 px-4 text-center">
                        {role.permissions.includes(perm.id) ? (
                          <Check
                            size={15}
                            className="text-[#2e7d52] inline-block"
                          />
                        ) : (
                          <span className="text-muted-foreground/40">—</span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Permissions_Tab;
