import {
  PermissionGroup,
  Role,
  AdminUser,
  AddUserPayload,
  AddRolePayload,
} from "../user_management_types";

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export const permissionGroups: PermissionGroup[] = [
  {
    group: "Products",
    permissions: [
      { id: "products.view", label: "View Products" },
      { id: "products.add", label: "Add Products" },
      { id: "products.edit", label: "Edit Products" },
      { id: "products.delete", label: "Delete Products" },
    ],
  },
  {
    group: "Inventory",
    permissions: [
      { id: "inventory.view", label: "View Inventory" },
      { id: "inventory.update", label: "Update Stock" },
      { id: "inventory.adjust", label: "Stock Adjustment" },
    ],
  },
  {
    group: "Orders",
    permissions: [
      { id: "orders.view", label: "View Orders" },
      { id: "orders.create", label: "Create Orders" },
      { id: "orders.update", label: "Update Orders" },
      { id: "orders.cancel", label: "Cancel Orders" },
    ],
  },
  {
    group: "Customers",
    permissions: [
      { id: "customers.view", label: "View Customers" },
      { id: "customers.edit", label: "Edit Customers" },
      { id: "customers.delete", label: "Delete Customers" },
    ],
  },
  {
    group: "Settings",
    permissions: [
      { id: "settings.view", label: "View Settings" },
      { id: "settings.edit", label: "Edit Settings" },
    ],
  },
];

export const fakeRoles: Role[] = [
  {
    id: "1",
    name: "Super Admin",
    description: "Full access to all features and settings.",
    userCount: 1,
    permissions: permissionGroups.flatMap((g) =>
      g.permissions.map((p) => p.id),
    ),
  },
  {
    id: "2",
    name: "Inventory Manager",
    description: "Can manage inventory and stock.",
    userCount: 1,
    permissions: [
      "inventory.view",
      "inventory.update",
      "inventory.adjust",
      "products.view",
    ],
  },
  {
    id: "3",
    name: "Customer Support",
    description: "Can view and respond to customer issues.",
    userCount: 1,
    permissions: ["customers.view", "customers.edit", "orders.view"],
  },
];

export const fakeAdminUsers: AdminUser[] = [
  {
    id: "1",
    name: "John Doe",
    avatar: "/conference_chair-2.png",
    email: "john@litace.co.za",
    role: "Super Admin",
    status: "Active",
    lastLogin: "20 May 2024, 10:30 AM",
  },
  {
    id: "2",
    name: "Jane Smith",
    avatar: "/conference_chair-2.png",
    email: "jane@litace.co.za",
    role: "Editor",
    status: "Active",
    lastLogin: "19 May 2024, 06:15 PM",
  },
  {
    id: "3",
    name: "Michael Brown",
    avatar: "/conference_chair-2.png",
    email: "michael@litace.co.za",
    role: "Inventory Manager",
    status: "Active",
    lastLogin: "20 May 2024, 09:20 AM",
  },
  {
    id: "4",
    name: "Emily Davis",
    avatar: "/conference_chair-2.png",
    email: "emily@litace.co.za",
    role: "Customer Support",
    status: "Inactive",
    lastLogin: "19 May 2024, 02:43 PM",
  },
  {
    id: "5",
    name: "Daniel Wilson",
    avatar: "/conference_chair-2.png",
    email: "daniel@litace.co.za",
    role: "Sales Manager",
    status: "Active",
    lastLogin: "20 May 2024, 11:04 AM",
  },
];

export const userManagementApi = {
  getUsers: async (): Promise<AdminUser[]> => {
    await delay(1000);
    return fakeAdminUsers;
  },

  getRoles: async (): Promise<Role[]> => {
    await delay(900);
    return fakeRoles;
  },

  addUser: async (payload: AddUserPayload): Promise<AdminUser> => {
    await delay(800);
    const role = fakeRoles.find((r) => r.id === payload.roleId);
    return {
      id: String(Date.now()),
      name: payload.fullName,
      avatar: "/conference_chair-2.png",
      email: payload.email,
      role: role?.name ?? "Unknown",
      status: payload.status ? "Active" : "Inactive",
      lastLogin: "Never",
    };
  },

  updateUserStatus: async (
    id: string,
    status: "Active" | "Inactive",
  ): Promise<void> => {
    await delay(600);
    console.log("Update user status:", { id, status });
  },

  deleteUser: async (id: string): Promise<void> => {
    await delay(700);
    console.log("Delete user:", id);
  },

  addRole: async (payload: AddRolePayload): Promise<Role> => {
    await delay(800);
    return {
      id: String(Date.now()),
      name: payload.name,
      description: payload.description,
      userCount: 0,
      permissions: payload.permissions,
    };
  },

  updateRole: async (
    id: string,
    payload: Partial<AddRolePayload>,
  ): Promise<Role> => {
    await delay(800);
    const role = fakeRoles.find((r) => r.id === id);
    return { ...role!, ...payload } as Role;
  },

  deleteRole: async (id: string): Promise<void> => {
    await delay(700);
    console.log("Delete role:", id);
  },
};
