"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronRight, Plus } from "lucide-react";
import App_Button from "@/components/app_ui/App_Button";
import App_Paginate from "@/components/app_ui/App_Paginate";
import App_Table from "@/components/app_ui/App_Table";
import App_Text from "@/components/app_ui/App_Text";
import Settings_Mobile_Nav from "../store_information_view/store_information_components/Settings_Mobile_Nav";
import Settings_Sidebar_Nav from "../store_information_view/store_information_components/Settings_Sidebar_Nav";
import Permissions_Tab from "./user_management_components/Permissions_Tab";
import Roles_Tab from "./user_management_components/Roles_Tab";
import { createUsersColumns } from "./user_management_data/user_role_col";
import {
  useAdminUsers,
  useRoles,
} from "./user_management_hooks/useUserManagementQueries";
import Add_User_Modal from "./user_management_modal/Add_User_Modal";
import Deactivate_User_Modal from "./user_management_modal/Deactivate_User_Modal";
import Delete_User_Modal from "./user_management_modal/Delete_User_Modal";
import { AdminUser } from "./user_management_types";
import App_Loader from "@/components/app_ui/App_Loader";

const PAGE_SIZE = 5;
const tabs = ["Users", "Roles", "Permissions"];

const User_Management_View = () => {
  const [activeTab, setActiveTab] = useState("Users");
  const [page, setPage] = useState(1);
  const [showAddUser, setShowAddUser] = useState(false);
  const [toggleUser, setToggleUser] = useState<AdminUser | null>(null);
  const [deleteUserVal, setDeleteUserVal] = useState<AdminUser | null>(null);

  const { data: users, isLoading: isLoadingUsers } = useAdminUsers();
  const { data: roles, isLoading: isLoadingRoles } = useRoles();

  const totalItems = users?.length ?? 0;
  const totalPages = Math.ceil(totalItems / PAGE_SIZE);
  const startItem = (page - 1) * PAGE_SIZE + 1;
  const endItem = Math.min(page * PAGE_SIZE, totalItems);

  const columns = createUsersColumns(
    (user) => setToggleUser(user),
    (user) => setDeleteUserVal(user),
  );

  return (
    <div className="">
      <div className="flex gap-6 items-start">
        {/* <Settings_Sidebar_Nav /> */}

        <div className="flex-1 min-w-0 space-y-4">
          {/* Breadcrumb */}
          <div className="flex items-center gap-1.5">
            <Link href="/dashboard/settings">
              <App_Text
                variant="tableCellMuted"
                className="hover:text-primary cursor-pointer"
              >
                Settings
              </App_Text>
            </Link>
            <ChevronRight size={13} className="text-muted-foreground" />
            <App_Text variant="tableCellMuted" className="text-[text]">
              User Management
            </App_Text>
          </div>

          <Settings_Mobile_Nav />

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <App_Text variant="pageTitle">User Management</App_Text>
              <App_Text variant="pageSub">
                Manage admin users, roles and their permissions.
              </App_Text>
            </div>
            {activeTab === "Users" && (
              <App_Button
                text="Add User"
                icon={<Plus size={13} />}
                type="button"
                onPress={() => setShowAddUser(true)}
                btnStyle="text-xs bg-primary text-white hover:bg-primary/90 rounded-lg px-3 py-2 h-auto"
              />
            )}
          </div>

          {/* Tabs */}
          <div className="flex items-center gap-1 border-b border-[#ede8e2]">
            {tabs.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-2.5 text-xs border-b-2 transition-colors ${
                  activeTab === tab
                    ? "border-primary text-primary font-medium"
                    : "border-transparent text-muted-foreground hover:text-[text]"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {activeTab === "Users" &&
            (isLoadingUsers || !users ? (
              <App_Loader label="Loading users..." />
            ) : (
              <div className="bg-white rounded-2xl border border-[#ede8e2] shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <App_Table
                    columns={columns}
                    data={users}
                    style="mt-0"
                    childRowStyle="hover:bg-[#faf9f7]"
                    // page={page}
                    // pageSize={PAGE_SIZE}
                  />
                </div>
                <div className="flex flex-col sm:flex-row items-center justify-between gap-2 px-4 border-t border-[#ede8e2]">
                  <App_Text variant="tableCellMuted" className="flex-shrink-0">
                    Showing {startItem} to {endItem} of {totalItems} users
                  </App_Text>
                  <App_Paginate
                    page={page}
                    setPage={setPage}
                    totalPages={totalPages}
                    paginateStyle="mt-4 mb-4"
                  />
                </div>
              </div>
            ))}

          {activeTab === "Roles" && <Roles_Tab />}
          {activeTab === "Permissions" && <Permissions_Tab />}
        </div>
      </div>

      {showAddUser && roles && (
        <Add_User_Modal roles={roles} onClose={() => setShowAddUser(false)} />
      )}
      {toggleUser && (
        <Deactivate_User_Modal
          user={toggleUser}
          onClose={() => setToggleUser(null)}
        />
      )}
      {deleteUserVal && (
        <Delete_User_Modal
          user={deleteUserVal}
          onClose={() => setDeleteUserVal(null)}
        />
      )}
    </div>
  );
};

export default User_Management_View;
