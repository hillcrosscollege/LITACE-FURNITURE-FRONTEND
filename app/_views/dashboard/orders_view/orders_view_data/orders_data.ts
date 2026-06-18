import {
  Order,
  OrderStatus,
  PaymentStatus,
  OrderItem,
  TimelineEvent,
  OrderNote,
  ActivityLog,
  CreatedOrder,
  CreateOrderPayload,
  OrderCustomer,
  OrderProduct,
} from "../order_view_types";

export const ordersList: Order[] = [
  {
    id: "FC12435",
    customer: {
      name: "John Doe",
      email: "johndoe@email.com",
      phone: "+234 801 234 5678",
      avatar: "/conference_chair-2.png",
    },
    date: "May 20, 2024",
    items: 3,
    total: 250000,
    payment: "Paid",
    status: "Delivered",
    delivery: "May 22, 2024",
  },
  {
    id: "FC12434",
    customer: {
      name: "Jane Smith",
      email: "janesmith@email.com",
      phone: "+234 802 345 6789",
      avatar: "/conference_chair-2.png",
    },
    date: "May 19, 2024",
    items: 2,
    total: 180000,
    payment: "Paid",
    status: "Shipped",
    delivery: "May 21, 2024",
  },
  {
    id: "FC12433",
    customer: {
      name: "Michael Brown",
      email: "michaelb@email.com",
      phone: "+234 803 456 7890",
      avatar: "/conference_chair-2.png",
    },
    date: "May 18, 2024",
    items: 4,
    total: 420000,
    payment: "Paid",
    status: "Processing",
    delivery: undefined,
  },
  {
    id: "FC12432",
    customer: {
      name: "Emily Davis",
      email: "emilyd@email.com",
      phone: "+234 804 567 8901",
      avatar: "/conference_chair-2.png",
    },
    date: "May 16, 2024",
    items: 1,
    total: 95000,
    payment: "Paid",
    status: "Pending",
    delivery: undefined,
  },
  {
    id: "FC12431",
    customer: {
      name: "Daniel Wilson",
      email: "danielw@email.com",
      phone: "+234 805 678 9012",
      avatar: "/conference_chair-2.png",
    },
    date: "May 15, 2024",
    items: 2,
    total: 210000,
    payment: "Paid",
    status: "Delivered",
    delivery: "May 17, 2024",
  },
  {
    id: "FC12430",
    customer: {
      name: "Sarah Johnson",
      email: "sarahj@email.com",
      phone: "+234 806 789 0123",
      avatar: "/conference_chair-2.png",
    },
    date: "May 14, 2024",
    items: 5,
    total: 650000,
    payment: "Refunded",
    status: "Cancelled",
    delivery: undefined,
  },
  {
    id: "FC12429",
    customer: {
      name: "David Lee",
      email: "davidl@email.com",
      phone: "+234 807 890 1234",
      avatar: "/conference_chair-2.png",
    },
    date: "May 13, 2024",
    items: 2,
    total: 120000,
    payment: "Paid",
    status: "Shipped",
    delivery: "May 16, 2024",
  },
];

export const orderStatCards = [
  {
    title: "Total Orders",
    value: "1,248",
    change: "13.5%",
    changeDirection: "up" as const,
    iconClassName: "text-[#7048b6]",
    iconWrapperClassName: "bg-[#f0ebf7]",
  },
  {
    title: "Pending",
    value: "128",
    change: "4.3%",
    changeDirection: "up" as const,
    iconClassName: "text-[#c87941]",
    iconWrapperClassName: "bg-[#fdf0e6]",
  },
  {
    title: "Processing",
    value: "356",
    change: "9.1%",
    changeDirection: "up" as const,
    iconClassName: "text-[#3266ad]",
    iconWrapperClassName: "bg-[#edf2fb]",
  },
  {
    title: "Shipped",
    value: "452",
    change: "15.3%",
    changeDirection: "up" as const,
    iconClassName: "text-[#2e7d52]",
    iconWrapperClassName: "bg-[#edf7f2]",
  },
  {
    title: "Delivered",
    value: "280",
    change: "15.3%",
    changeDirection: "up" as const,
    iconClassName: "text-[#157a45]",
    iconWrapperClassName: "bg-[#e8fdf0]",
  },
  {
    title: "Cancelled",
    value: "32",
    change: "2.1%",
    changeDirection: "down" as const,
    iconClassName: "text-[#c0392b]",
    iconWrapperClassName: "bg-[#fdecea]",
  },
];

export const orderTabs = [
  { label: "All Orders", count: 1248 },
  { label: "Pending", count: 128 },
  { label: "Processing", count: 356 },
  { label: "Shipped", count: 452 },
  { label: "Delivered", count: 280 },
  { label: "Cancelled", count: 32 },
];

export const orderStatusStyles: Record<OrderStatus, string> = {
  Delivered: "bg-[#e8fdf0] text-[#157a45]",
  Shipped: "bg-[#edf2fb] text-[#1a56c4]",
  Processing: "bg-[#f5f0fa] text-[#7048b6]",
  Pending: "bg-[#fdf5e0] text-[#8a6300]",
  Cancelled: "bg-[#fdecea] text-[#a32020]",
  Refunded: "bg-[#f5f2ee] text-[#555]",
};

export const paymentStatusStyles: Record<PaymentStatus, string> = {
  Paid: "bg-[#e8fdf0] text-[#157a45]",
  Pending: "bg-[#fdf5e0] text-[#8a6300]",
  Refunded: "bg-[#f5f0fa] text-[#7048b6]",
};

export const orderDetail = {
  id: "#FC12435",
  status: "Delivered" as OrderStatus,
  placedAt: "May 20, 2024 at 10:30 AM",
  customer: {
    name: "John Doe",
    email: "johndoe@email.com",
    phone: "+254 801 234 5678",
    avatar: "/conference_chair-2.png",
  },
  items: [
    {
      id: "1",
      name: "Modern L-Shaped Sofa",
      image: "/conference_chair-2.png",
      sku: "FC-SOFA-001",
      qty: 1,
      price: 250000,
    },
    {
      id: "2",
      name: "Marble Coffee Table",
      image: "/conference_chair-2.png",
      sku: "FC-TABLE-006",
      qty: 1,
      price: 95000,
    },
    {
      id: "3",
      name: "Decor Vase Set",
      image: "/conference_chair-2.png",
      sku: "FC-DECOR-010",
      qty: 1,
      price: 25000,
    },
  ] as OrderItem[],
  summary: {
    itemsTotal: 370000,
    shippingFee: 15000,
    tax: 10000,
    discount: 0,
    totalAmount: 250000,
  },
  shippingAddress: {
    name: "John Doe",
    address: "21 Freedom Way, Lekki Phase 1",
    city: "Lagos State, Nigeria, 100001",
    phone: "+254 801 234 5678",
  },
  shippingMethod: {
    method: "Standard Delivery",
    duration: "3 - 5 Business Days",
    trackingId: "TRK765456",
  },
  payment: {
    method: "Bank Transfer",
    transactionId: "TXN123456789",
    status: "Paid" as PaymentStatus,
  },
  timeline: [
    {
      id: "1",
      label: "Order Placed",
      date: "May 20, 2024, 10:30 AM",
      completed: true,
    },
    {
      id: "2",
      label: "Payment Confirmed",
      date: "May 20, 2024, 10:31 AM",
      completed: true,
    },
    {
      id: "3",
      label: "Processing",
      date: "May 20, 2024, 11:15 AM",
      completed: true,
    },
    {
      id: "4",
      label: "Shipped",
      date: "May 21, 2024, 09:20 AM",
      completed: true,
    },
    {
      id: "5",
      label: "Delivered",
      date: "May 22, 2024, 02:45 PM",
      completed: true,
    },
  ] as TimelineEvent[],
  notes: [
    {
      id: "1",
      avatar: "/conference_chair-2.png",
      user: "John Doe",
      role: "Admin",
      message: "Customer reviewed the order. Very satisfied!",
      date: "May 22, 2024 at 02:50 PM",
    },
    {
      id: "2",
      avatar: "/conference_chair-2.png",
      user: "Jane Smith",
      role: "Admin",
      message: "Order shipped via GIG Logistics. Tracking ID added.",
      date: "May 21, 2024 at 09:25 AM",
    },
  ] as OrderNote[],
  activity: [
    {
      id: "1",
      avatar: "/conference_chair-2.png",
      user: "John Doe",
      action: "Customer reviewed the order. Very satisfied!",
      date: "May 22, 2024 at 02:50 PM",
    },
    {
      id: "2",
      avatar: "/conference_chair-2.png",
      user: "Jane Smith",
      action: "Order shipped via GIG Logistics. Tracking ID added.",
      date: "May 21, 2024 at 09:25 AM",
    },
    {
      id: "3",
      avatar: "/conference_chair-2.png",
      user: "System",
      action: "Payment confirmed via bank transfer.",
      date: "May 20, 2024 at 10:31 AM",
    },
  ] as ActivityLog[],
};

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export const ordersApi = {
  getOrders: async (): Promise<{
    orders: Order[];
    stats: typeof orderStatCards;
    totalCount: number;
  }> => {
    await delay(1200);
    return {
      orders: ordersList,
      stats: orderStatCards,
      totalCount: 1248,
    };
  },

  getOrderById: async (id: string) => {
    await delay(1000);
    if (!id) throw new Error("Order not found");
    return orderDetail;
  },

  updateOrderStatus: async (
    id: string,
    status: string,
    note: string,
  ): Promise<void> => {
    await delay(700);
    console.log("Status updated:", { id, status, note });
  },

  cancelOrder: async (
    id: string,
    reason: string,
    note: string,
  ): Promise<void> => {
    await delay(700);
    console.log("Order cancelled:", { id, reason, note });
  },

  refundOrder: async (
    id: string,
    method: string,
    amount: number,
    note: string,
  ): Promise<void> => {
    await delay(700);
    console.log("Order refunded:", { id, method, amount, note });
  },
};

export const fakeOrderCustomers: OrderCustomer[] = [
  {
    id: "1",
    name: "John Doe",
    email: "johndoe@email.com",
    phone: "+234 801 234 5678",
    avatar: "/conference_chair-2.png",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "janesmith@email.com",
    phone: "+234 802 345 6789",
    avatar: "/conference_chair-2.png",
  },
  {
    id: "3",
    name: "Michael Brown",
    email: "michaelb@email.com",
    phone: "+234 803 456 7890",
    avatar: "/conference_chair-2.png",
  },
  {
    id: "4",
    name: "Emily Davis",
    email: "emilyd@email.com",
    phone: "+234 804 567 8901",
    avatar: "/conference_chair-2.png",
  },
  {
    id: "5",
    name: "Daniel Wilson",
    email: "danielw@email.com",
    phone: "+234 805 678 9012",
    avatar: "/conference_chair-2.png",
  },
  {
    id: "6",
    name: "Sarah Johnson",
    email: "sarahj@email.com",
    phone: "+234 806 789 0123",
    avatar: "/conference_chair-2.png",
  },
];

export const fakeOrderProducts: OrderProduct[] = [
  {
    id: "1",
    name: "Modern L-Shaped Sofa",
    image: "/conference_chair-2.png",
    sku: "FC-SOFA-001",
    price: 250000,
    stock: 10,
  },
  {
    id: "2",
    name: "Marble Coffee Table",
    image: "/conference_chair-2.png",
    sku: "FC-TABLE-005",
    price: 95000,
    stock: 5,
  },
  {
    id: "3",
    name: "Wooden Dining Set",
    image: "/conference_chair-2.png",
    sku: "FC-DIN-002",
    price: 180000,
    stock: 3,
  },
  {
    id: "4",
    name: "Ergonomic Office Chair",
    image: "/conference_chair-2.png",
    sku: "FC-CHAIR-004",
    price: 75000,
    stock: 15,
  },
  {
    id: "5",
    name: "Luxury Wooden Bed",
    image: "/conference_chair-2.png",
    sku: "FC-BED-003",
    price: 350000,
    stock: 2,
  },
  {
    id: "6",
    name: "Bookshelf Unit",
    image: "/conference_chair-2.png",
    sku: "FC-SHELF-007",
    price: 55000,
    stock: 12,
  },
];

export const createOrderApi = {
  getCustomers: async (): Promise<OrderCustomer[]> => {
    await delay(800);
    return fakeOrderCustomers;
  },

  searchCustomers: async (query: string): Promise<OrderCustomer[]> => {
    await delay(400);
    return fakeOrderCustomers.filter(
      (c) =>
        c.name.toLowerCase().includes(query.toLowerCase()) ||
        c.email.toLowerCase().includes(query.toLowerCase()) ||
        c.phone.includes(query),
    );
  },

  searchProducts: async (query: string): Promise<OrderProduct[]> => {
    await delay(400);
    return fakeOrderProducts.filter(
      (p) =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.sku.toLowerCase().includes(query.toLowerCase()),
    );
  },

  createOrder: async (payload: CreateOrderPayload): Promise<CreatedOrder> => {
    await delay(1000);
    return {
      id: `#FC${Math.floor(Math.random() * 90000 + 10000)}`,
      status: "Pending",
      total: payload.total,
      date: new Date().toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      }),
    };
  },
};
