import { useQueryClient, useMutation } from "@tanstack/react-query";
import { userManagementApi } from "../user_management_data/user_management_data";
import { AddUserPayload, AddRolePayload } from "../user_management_types";
import { USER_MGMT_KEYS } from "./useUserManagementQueries";

export const useAddUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: AddUserPayload) => userManagementApi.addUser(payload),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: USER_MGMT_KEYS.users }),
  });
};

export const useUpdateUserStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      status,
    }: {
      id: string;
      status: "Active" | "Inactive";
    }) => userManagementApi.updateUserStatus(id, status),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: USER_MGMT_KEYS.users }),
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => userManagementApi.deleteUser(id),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: USER_MGMT_KEYS.users }),
  });
};

export const useAddRole = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: AddRolePayload) => userManagementApi.addRole(payload),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: USER_MGMT_KEYS.roles }),
  });
};

export const useUpdateRole = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: Partial<AddRolePayload>;
    }) => userManagementApi.updateRole(id, payload),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: USER_MGMT_KEYS.roles }),
  });
};

export const useDeleteRole = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => userManagementApi.deleteRole(id),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: USER_MGMT_KEYS.roles }),
  });
};
