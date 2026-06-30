export type AdminUser = {
  id: string;
  name: string;
  avatar: string;
  email: string;
  role: string;
  status: "Active" | "Inactive";
  lastLogin: string;
};

export type Role = {
  id: string;
  name: string;
  description: string;
  userCount: number;
  permissions: string[]; // permission ids
};

export type PermissionGroup = {
  group: string;
  permissions: { id: string; label: string }[];
};

export type AddUserPayload = {
  fullName: string;
  email: string;
  roleId: string;
  password: string;
  status: boolean;
};

export type AddRolePayload = {
  name: string;
  description: string;
  permissions: string[];
};
