"use client";

import { useQuery } from "@tanstack/react-query";
import { emailSettingsApi } from "../email_data/email_data";

export const EMAIL_KEYS = {
  templates: ["email", "templates"] as const,
  smtp: ["email", "smtp"] as const,
  emailNotifications: ["email", "notifications"] as const,
  notifSettings: ["notifications", "settings"] as const,
};

// Templates
export const useEmailTemplates = () =>
  useQuery({
    queryKey: EMAIL_KEYS.templates,
    queryFn: emailSettingsApi.getEmailTemplates,
  });
