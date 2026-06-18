import { Row } from "@tanstack/react-table";

export type OrderStatus =
  | "Delivered"
  | "Shipped"
  | "Processing"
  | "Pending"
  | "Cancelled"
  | "Refunded";
export type PaymentStatus = "Paid" | "Pending" | "Refunded";
export type DeliveryStatus = "Delivered" | "Shipped" | "Processing" | "—";

export type Order = {
  id: string;
  customer: { name: string; email: string; phone: string; avatar: string };
  date: string;
  items: number;
  total: number;
  payment: PaymentStatus;
  status: OrderStatus;
  delivery?: string;
};

// Order Detail
export type OrderItem = {
  id: string;
  name: string;
  image: string;
  sku: string;
  qty: number;
  price: number;
};

export type TimelineEvent = {
  id: string;
  label: string;
  date: string;
  completed: boolean;
};

export type OrderNote = {
  id: string;
  avatar: string;
  user: string;
  role: string;
  message: string;
  date: string;
};

export type ActivityLog = {
  id: string;
  avatar: string;
  user: string;
  action: string;
  date: string;
};

export type ActionsCellProps = {
  row: Row<Order>;
  onUpdateStatus: (id: string) => void;
};

export type OrderDetail = {
  id: string;
  status: OrderStatus;
  placedAt: string;
  customer: {
    name: string;
    email: string;
    phone: string;
    avatar: string;
  };
  items: OrderItem[];
  summary: {
    itemsTotal: number;
    shippingFee: number;
    tax: number;
    discount: number;
    totalAmount: number;
  };
  shippingAddress: {
    name: string;
    address: string;
    city: string;
    phone: string;
  };
  shippingMethod: {
    method: string;
    duration: string;
    trackingId: string;
  };
  payment: {
    method: string;
    transactionId: string;
    status: PaymentStatus;
  };
  timeline: TimelineEvent[];
  notes: OrderNote[];
  activity: ActivityLog[];
};

// types/create-order-api.ts
export type OrderCustomer = {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
};

export type OrderProduct = {
  id: string;
  name: string;
  image: string;
  sku: string;
  price: number;
  stock: number;
};

export type CreateOrderPayload = {
  customerId: string;
  items: { productId: string; qty: number; price: number }[];
  deliveryMethod: string;
  shippingAddress: {
    fullName: string;
    address: string;
    city: string;
    state: string;
    phone: string;
  };
  paymentMethod: string;
  note: string;
  subtotal: number;
  shippingFee: number;
  tax: number;
  total: number;
};

export type CreatedOrder = {
  id: string;
  status: string;
  total: number;
  date: string;
};

export type CreateOrderCustomer = {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
};

export type ShippingForm = {
  fullName: string;
  address: string;
  city: string;
  state: string;
  phone: string;
  deliveryMethod: string;
};

export type PaymentForm = {
  paymentMethod: string;
  note: string;
};

export type CreateOrderStep = 1 | 2 | 3 | 4 | 5;

export type CreateOrderItem = OrderProduct & { qty: number };
