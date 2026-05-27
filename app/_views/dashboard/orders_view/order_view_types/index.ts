// types/orders.ts
export type PaymentStatus = "Paid" | "Pending" | "Failed";
export type OrderStatus =
  | "Delivered"
  | "Shipped"
  | "Processing"
  | "Pending"
  | "Cancelled";

export type Order = {
  id: string;
  customer: { name: string; email: string; avatar: string };
  items: number;
  totalAmount: number;
  paymentStatus: PaymentStatus;
  orderStatus: OrderStatus;
  date: string;
};
