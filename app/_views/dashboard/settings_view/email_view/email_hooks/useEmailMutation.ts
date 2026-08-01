"use client";

import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { emailSettingsApi } from "../email_data/email_data";
import { EmailTemplate, SMTPSettings } from "../email_types";

export const EMAIL_KEYS = {
  templates: ["email", "templates"] as const,
  smtp: ["email", "smtp"] as const,
  emailNotifications: ["email", "notifications"] as const,
  notifSettings: ["notifications", "settings"] as const,
};

export const useUpdateEmailTemplate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<EmailTemplate> }) =>
      emailSettingsApi.updateEmailTemplate(id, data),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: EMAIL_KEYS.templates }),
  });
};

export const useToggleEmailTemplate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: boolean }) =>
      emailSettingsApi.toggleTemplate(id, status),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: EMAIL_KEYS.templates }),
  });
};

// SMTP
export const useSMTPSettings = () =>
  useQuery({
    queryKey: EMAIL_KEYS.smtp,
    queryFn: emailSettingsApi.getSMTPSettings,
  });

export const useUpdateSMTPSettings = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: SMTPSettings) =>
      emailSettingsApi.updateSMTPSettings(data),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: EMAIL_KEYS.smtp }),
  });
};

export const useSendTestEmail = () =>
  useMutation({
    mutationFn: (email: string) => emailSettingsApi.sendTestEmail(email),
  });

// Email Notifications
export const useEmailNotifications = () =>
  useQuery({
    queryKey: EMAIL_KEYS.emailNotifications,
    queryFn: emailSettingsApi.getEmailNotifications,
  });

export const useUpdateEmailNotification = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, email }: { id: string; email: boolean }) =>
      emailSettingsApi.updateEmailNotification(id, email),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: EMAIL_KEYS.emailNotifications,
      }),
  });
};

// hooks/useNotificationSettings.ts
export const useNotificationSettings = () =>
  useQuery({
    queryKey: EMAIL_KEYS.notifSettings,
    queryFn: emailSettingsApi.getNotificationSettings,
  });

export const useUpdateNotificationSetting = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      field,
      value,
    }: {
      id: string;
      field: "inApp" | "push";
      value: boolean;
    }) => emailSettingsApi.updateNotificationSetting(id, field, value),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: EMAIL_KEYS.notifSettings }),
  });
};
