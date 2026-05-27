// types/customers.ts
export type CustomerStatus = "Active" | "Inactive";

export type Customer = {
  id: string;
  name: string;
  avatar: string;
  email: string;
  phone: string;
  orders: number;
  totalSpent: number;
  status: CustomerStatus;
  joinedOn: string;
};
