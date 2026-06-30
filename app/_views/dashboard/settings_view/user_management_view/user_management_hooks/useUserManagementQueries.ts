"use client";

import { useQuery } from "@tanstack/react-query";
import { userManagementApi } from "../user_management_data/user_management_data";

export const USER_MGMT_KEYS = {
  users: ["userManagement", "users"] as const,
  roles: ["userManagement", "roles"] as const,
};

export const useAdminUsers = () =>
  useQuery({
    queryKey: USER_MGMT_KEYS.users,
    queryFn: userManagementApi.getUsers,
  });

export const useRoles = () =>
  useQuery({
    queryKey: USER_MGMT_KEYS.roles,
    queryFn: userManagementApi.getRoles,
  });
