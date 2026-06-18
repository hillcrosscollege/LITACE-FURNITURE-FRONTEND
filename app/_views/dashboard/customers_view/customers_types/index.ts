// types/customers-api.ts
export type CustomerStatus = "Active" | "Inactive" | "Blocked";

export type Customer = {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  orders: number;
  totalSpent: number;
  lastOrder: string;
  status: CustomerStatus;
  gender: "Male" | "Female";
  dateOfBirth: string;
  joinedOn: string;
  customerId: string;
};

export type CustomerStats = {
  totalCustomers: number;
  activeCustomers: number;
  blockedCustomers: number;
  newThisMonth: number;
};

export type CustomerAddress = {
  id: string;
  type: "shipping" | "billing";
  isDefault: boolean;
  fullName: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  landmark?: string;
  phone: string;
};

export type CustomerOrder = {
  id: string;
  date: string;
  products: number;
  total: number;
  payment: "Paid" | "Pending" | "Refunded";
  delivery: string;
  status: "Completed" | "Processing" | "Shipped" | "Delivered" | "Cancelled";
};

export type CustomerActivity = {
  id: string;
  description: string;
  date: string;
  type: "order" | "payment" | "account";
};

export type CustomerDetail = Customer & {
  pendingDeliveries: number;
  completedOrders: number;
  returnedOrders: number;
  addresses: CustomerAddress[];
  recentActivity: CustomerActivity[];
  orders: CustomerOrder[];
};

// types/customers-api.ts (add to existing file)
export type CustomerReceipt = {
  id: string;
  orderId: string;
  date: string;
  amount: number;
  method: string;
  status: "Successful" | "Failed" | "Pending" | "Refunded";
  description: string;
};

export type CustomerMessage = {
  id: string;
  subject: string;
  message: string;
  date: string;
  from: "admin" | "customer";
  read: boolean;
};

export type CustomerSettings = {
  emailNotifications: boolean;
  smsNotifications: boolean;
  orderUpdates: boolean;
  promotionalEmails: boolean;
  accountStatus: "Active" | "Inactive" | "Blocked";
  twoFactorAuth: boolean;
};

export type AddCustomerStep = 1 | 2 | 3 | 4;

export type BasicInfoForm = {
  fullName: string;
  email: string;
  countryCode: string;
  phone: string;
  dateOfBirth: string;
  gender: string;
  status: string;
};

export type AddressInfoForm = {
  addressType: string;
  address: string;
  landmark: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
};

export type AdditionalInfoForm = {
  preferredContact: string;
  customerGroup: string;
  referralSource: string;
  notes: string;
  sendWelcomeEmail: boolean;
};

export type AddCustomerFormData = {
  basic: BasicInfoForm;
  address: AddressInfoForm;
  additional: AdditionalInfoForm;
};
