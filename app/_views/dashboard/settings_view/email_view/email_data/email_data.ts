import {
  EmailTemplate,
  SMTPSettings,
  EmailNotificationSetting,
  NotificationSetting,
} from "../email_types";

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export const fakeEmailTemplates: EmailTemplate[] = [
  {
    id: "1",
    name: "Order Confirmation",
    description: "Sent to customer after order is placed.",
    trigger: "order.placed",
    status: true,
    subject: "Your order #{{order_id}} has been confirmed!",
    body: `Hi {{customer_name}},\n\nThank you for your order! Your order #{{order_id}} has been confirmed and is being processed.\n\nOrder Summary:\n{{order_items}}\n\nTotal: {{order_total}}\n\nWe'll notify you when your order ships.\n\nThank you for shopping with Litace!`,
  },
  {
    id: "2",
    name: "Order Shipped",
    description: "Sent when order is shipped.",
    trigger: "order.shipped",
    status: true,
    subject: "Your order #{{order_id}} has been shipped!",
    body: `Hi {{customer_name}},\n\nGreat news! Your order #{{order_id}} is on its way.\n\nTracking ID: {{tracking_id}}\nEstimated Delivery: {{delivery_date}}\n\nThank you for shopping with Litace!`,
  },
  {
    id: "3",
    name: "Password Reset",
    description: "Sent for password reset requests.",
    trigger: "auth.password_reset",
    status: true,
    subject: "Reset your Litace password",
    body: `Hi {{customer_name}},\n\nWe received a request to reset your password. Click the link below to reset it:\n\n{{reset_link}}\n\nThis link expires in 24 hours. If you didn't request this, please ignore this email.`,
  },
  {
    id: "4",
    name: "Low Stock Alert",
    description: "Sent to admin when stock is low.",
    trigger: "inventory.low_stock",
    status: true,
    subject: "Low Stock Alert — {{product_name}}",
    body: `Hi Admin,\n\n{{product_name}} is running low on stock.\n\nCurrent Stock: {{current_stock}}\nReorder Level: {{reorder_level}}\n\nPlease restock soon to avoid stockouts.`,
  },
  {
    id: "5",
    name: "New Customer Welcome",
    description: "Sent to newly registered customers.",
    trigger: "customer.registered",
    status: true,
    subject: "Welcome to Litace, {{customer_name}}!",
    body: `Hi {{customer_name}},\n\nWelcome to Litace! We're excited to have you.\n\nExplore our range of premium furniture at litace.co.za.\n\nIf you have any questions, reply to this email — we're here to help.\n\nThe Litace Team`,
  },
];

export const fakeSMTPSettings: SMTPSettings = {
  host: "smtp.mailgun.org",
  port: "587",
  username: "postmaster@litace.co.za",
  password: "••••••••••••",
  encryption: "TLS",
  fromName: "Litace Furniture Store",
  fromEmail: "noreply@litace.co.za",
};

export const fakeEmailNotifications: EmailNotificationSetting[] = [
  {
    id: "1",
    label: "New Order",
    description: "Get notified when a new order is placed",
    email: true,
  },
  {
    id: "2",
    label: "Order Cancelled",
    description: "Get notified when an order is cancelled",
    email: true,
  },
  {
    id: "3",
    label: "Low Stock Alert",
    description: "Get notified when a product is running low",
    email: true,
  },
  {
    id: "4",
    label: "New Customer",
    description: "Get notified when a new customer registers",
    email: true,
  },
  {
    id: "5",
    label: "Payment Received",
    description: "Get notified when a payment is received",
    email: true,
  },
  {
    id: "6",
    label: "Order Refunded",
    description: "Get notified when an order is refunded",
    email: false,
  },
  {
    id: "7",
    label: "Product Review",
    description: "Get notified when a customer leaves a review",
    email: false,
  },
  {
    id: "8",
    label: "Daily Sales Report",
    description: "Receive a daily summary of sales performance",
    email: true,
  },
];

export const fakeNotificationSettings: NotificationSetting[] = [
  {
    id: "1",
    group: "Orders",
    label: "New Order",
    description: "Show alert when a new order arrives",
    inApp: true,
    push: true,
  },
  {
    id: "2",
    group: "Orders",
    label: "Order Cancelled",
    description: "Show alert when an order is cancelled",
    inApp: true,
    push: false,
  },
  {
    id: "3",
    group: "Orders",
    label: "Order Refunded",
    description: "Show alert when an order is refunded",
    inApp: true,
    push: false,
  },
  {
    id: "4",
    group: "Inventory",
    label: "Low Stock Alert",
    description: "Show alert when stock drops below reorder level",
    inApp: true,
    push: true,
  },
  {
    id: "5",
    group: "Inventory",
    label: "Out of Stock",
    description: "Show alert when a product is out of stock",
    inApp: true,
    push: true,
  },
  {
    id: "6",
    group: "Customers",
    label: "New Customer",
    description: "Show alert when a customer registers",
    inApp: true,
    push: false,
  },
  {
    id: "7",
    group: "Customers",
    label: "Customer Blocked",
    description: "Show alert when a customer is blocked",
    inApp: false,
    push: false,
  },
  {
    id: "8",
    group: "Reviews",
    label: "New Review",
    description: "Show alert when a review is submitted",
    inApp: true,
    push: false,
  },
  {
    id: "9",
    group: "System",
    label: "System Update",
    description: "Show alert for system updates and maintenance",
    inApp: true,
    push: true,
  },
  {
    id: "10",
    group: "System",
    label: "Backup Completed",
    description: "Show alert when a backup completes",
    inApp: false,
    push: false,
  },
];

export const emailSettingsApi = {
  getEmailTemplates: async (): Promise<EmailTemplate[]> => {
    await delay(900);
    return fakeEmailTemplates;
  },

  updateEmailTemplate: async (
    id: string,
    data: Partial<EmailTemplate>,
  ): Promise<EmailTemplate> => {
    await delay(700);
    return { ...fakeEmailTemplates.find((t) => t.id === id)!, ...data };
  },

  toggleTemplate: async (id: string, status: boolean): Promise<void> => {
    await delay(400);
    console.log("Toggle template:", { id, status });
  },

  getSMTPSettings: async (): Promise<SMTPSettings> => {
    await delay(800);
    return fakeSMTPSettings;
  },

  updateSMTPSettings: async (data: SMTPSettings): Promise<SMTPSettings> => {
    await delay(800);
    return data;
  },

  sendTestEmail: async (email: string): Promise<void> => {
    await delay(1200);
    console.log("Test email sent to:", email);
  },

  getEmailNotifications: async (): Promise<EmailNotificationSetting[]> => {
    await delay(700);
    return fakeEmailNotifications;
  },

  updateEmailNotification: async (
    id: string,
    email: boolean,
  ): Promise<void> => {
    await delay(400);
    console.log("Update email notification:", { id, email });
  },

  getNotificationSettings: async (): Promise<NotificationSetting[]> => {
    await delay(800);
    return fakeNotificationSettings;
  },

  updateNotificationSetting: async (
    id: string,
    field: "inApp" | "push",
    value: boolean,
  ): Promise<void> => {
    await delay(400);
    console.log("Update notification setting:", { id, field, value });
  },
};
