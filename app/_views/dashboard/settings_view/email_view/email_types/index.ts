export type EmailTemplate = {
  id: string;
  name: string;
  subject: string;
  body: string;
  description: string;
  trigger: string;
  status: boolean;
};

export type SMTPSettings = {
  host: string;
  port: string;
  username: string;
  password: string;
  encryption: string;
  fromName: string;
  fromEmail: string;
};

export type EmailNotificationSetting = {
  id: string;
  label: string;
  description: string;
  email: boolean;
};

// Notification Settings types (separate page but similar shape)
export type NotificationSetting = {
  id: string;
  group: string;
  label: string;
  description: string;
  inApp: boolean;
  push: boolean;
};
