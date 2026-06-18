import {
  Users,
  UserCheck,
  ShieldX,
  UserPlus,
  CheckCircle,
  DollarSign,
  RotateCcw,
  ShoppingBag,
  Truck,
} from "lucide-react";
import {
  Customer,
  CustomerDetail,
  CustomerMessage,
  CustomerReceipt,
  CustomerSettings,
  CustomerStats,
} from "../customers_types";

// Fake API delay
const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

// Fake data
export const fakeCustomers: Customer[] = [
  {
    id: "1",
    name: "John Doe",
    email: "johndoe@email.com",
    phone: "+234 801 234 5678",
    avatar: "/conference_chair-2.png",
    totalOrders: 8,
    totalSpent: 1250000,
    lastOrder: "May 20, 2024",
    status: "Active",
    gender: "Male",
    dateOfBirth: "05/20/1990",
    joinedOn: "May 20, 2024",
    customerId: "CUS-1001",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "janesmith@email.com",
    phone: "+234 802 345 6789",
    avatar: "/conference_chair-2.png",
    totalOrders: 5,
    totalSpent: 750000,
    lastOrder: "May 18, 2024",
    status: "Active",
    gender: "Female",
    dateOfBirth: "03/15/1992",
    joinedOn: "May 18, 2024",
    customerId: "CUS-1002",
  },
  {
    id: "3",
    name: "Michael Brown",
    email: "michaelb@email.com",
    phone: "+234 803 456 7890",
    avatar: "/conference_chair-2.png",
    totalOrders: 12,
    totalSpent: 2100000,
    lastOrder: "May 15, 2024",
    status: "Active",
    gender: "Male",
    dateOfBirth: "07/10/1988",
    joinedOn: "May 15, 2024",
    customerId: "CUS-1003",
  },
  {
    id: "4",
    name: "Emily Davis",
    email: "emilyd@email.com",
    phone: "+234 804 567 8901",
    avatar: "/conference_chair-2.png",
    totalOrders: 3,
    totalSpent: 320000,
    lastOrder: "May 10, 2024",
    status: "Inactive",
    gender: "Female",
    dateOfBirth: "11/25/1995",
    joinedOn: "May 10, 2024",
    customerId: "CUS-1004",
  },
  {
    id: "5",
    name: "Daniel Wilson",
    email: "danielw@email.com",
    phone: "+234 805 678 9012",
    avatar: "/conference_chair-2.png",
    totalOrders: 7,
    totalSpent: 980000,
    lastOrder: "May 8, 2024",
    status: "Active",
    gender: "Male",
    dateOfBirth: "09/05/1991",
    joinedOn: "May 8, 2024",
    customerId: "CUS-1005",
  },
  {
    id: "6",
    name: "Sarah Johnson",
    email: "sarahj@email.com",
    phone: "+234 806 789 0123",
    avatar: "/conference_chair-2.png",
    totalOrders: 4,
    totalSpent: 540000,
    lastOrder: "May 5, 2024",
    status: "Blocked",
    gender: "Female",
    dateOfBirth: "02/14/1993",
    joinedOn: "May 5, 2024",
    customerId: "CUS-1006",
  },
];

export const fakeCustomerDetail: CustomerDetail = {
  ...fakeCustomers[0],
  pendingDeliveries: 2,
  completedOrders: 6,
  returnedOrders: 0,
  addresses: [
    {
      id: "1",
      type: "shipping",
      isDefault: true,
      fullName: "John Doe",
      address: "21 Freedom Way, Lekki Phase 1",
      city: "Lagos",
      state: "Lagos State, Nigeria",
      postalCode: "100001",
      landmark: "Near Nike Art Gallery",
      phone: "+234 801 234 5678",
    },
    {
      id: "2",
      type: "billing",
      isDefault: false,
      fullName: "John Doe",
      address: "15 Admiralty Road, Lekki Phase 1",
      city: "Lagos",
      state: "Lagos State, Nigeria",
      postalCode: "100001",
      landmark: "Opposite GTBank",
      phone: "+234 801 234 5678",
    },
  ],
  recentActivity: [
    {
      id: "1",
      description: "Order #FC12345 delivered",
      date: "May 20, 2024 — 10:30 AM",
      type: "order",
    },
    {
      id: "2",
      description: "Payment of ₦250,000 received",
      date: "May 20, 2024 — 09:15 AM",
      type: "payment",
    },
    {
      id: "3",
      description: "Order #FC12346 confirmed",
      date: "May 18, 2024 — 11:45 AM",
      type: "order",
    },
    {
      id: "4",
      description: "Account created",
      date: "May 20, 2024 — 08:30 AM",
      type: "account",
    },
  ],

  orders: [
    {
      id: "#FC12345",
      date: "May 20, 2024",
      products: 3,
      total: 250000,
      payment: "Paid",
      delivery: "May 22, 2024",
      status: "Completed",
    },
    {
      id: "#FC12344",
      date: "May 18, 2024",
      products: 2,
      total: 180000,
      payment: "Paid",
      delivery: "May 21, 2024",
      status: "Processing",
    },
    {
      id: "#FC12343",
      date: "May 15, 2024",
      products: 4,
      total: 420000,
      payment: "Paid",
      delivery: "May 18, 2024",
      status: "Shipped",
    },
    {
      id: "#FC12342",
      date: "May 10, 2024",
      products: 1,
      total: 95000,
      payment: "Paid",
      delivery: "May 12, 2024",
      status: "Completed",
    },
    {
      id: "#FC12341",
      date: "May 8, 2024",
      products: 2,
      total: 210000,
      payment: "Paid",
      delivery: "—",
      status: "Cancelled",
    },
  ],
};

export const statIcons = [Users, UserCheck, ShieldX, UserPlus];
export const statLabels = [
  "vs last month",
  "vs last month",
  "vs last month",
  "vs last month",
];
export const statChanges = ["10.5%", "8.4%", "2.1%", "15.6%"];
export const statDirs = ["up", "up", "up", "up"] as const;

export const detailTabs = [
  { label: "Overview" },
  { label: "Orders" },
  { label: "Addresses" },
  { label: "Receipts" },
  { label: "Activity" },
  // { label: "Communications" },
  // { label: "Settings" },
];

export const statCards = [
  {
    key: "orders",
    label: "Total Orders",
    icon: ShoppingBag,
    link: "Orders",
    color: "text-primary",
  },
  {
    key: "totalSpent",
    label: "Total Spent",
    icon: DollarSign,
    link: "Receipts",
    color: "text-[#2e7d52]",
  },
  {
    key: "pendingDeliveries",
    label: "Pending Deliveries",
    icon: Truck,
    link: "Orders",
    color: "text-[#c87941]",
  },
  {
    key: "completedOrders",
    label: "Completed Orders",
    icon: CheckCircle,
    link: "Orders",
    color: "text-[#3266ad]",
  },
  {
    key: "returnedOrders",
    label: "Returned Orders",
    icon: RotateCcw,
    link: "Orders",
    color: "text-[#c0392b]",
  },
];

export const iconStyles = [
  { iconClassName: "text-[#7048b6]", iconWrapperClassName: "bg-[#f0ebf7]" },
  { iconClassName: "text-[#2e7d52]", iconWrapperClassName: "bg-[#edf7f2]" },
  { iconClassName: "text-[#c0392b]", iconWrapperClassName: "bg-[#fdecea]" },
  { iconClassName: "text-[#3266ad]", iconWrapperClassName: "bg-[#edf2fb]" },
];

// Add to fakeCustomerDetail
export const fakeReceipts: CustomerReceipt[] = [
  {
    id: "1",
    orderId: "#FC12345",
    date: "May 20, 2024",
    amount: 250000,
    method: "Bank Transfer",
    status: "Successful",
    description: "Payment for Order #FC12345",
  },
  {
    id: "2",
    orderId: "#FC12344",
    date: "May 18, 2024",
    amount: 180000,
    method: "Bank Transfer",
    status: "Successful",
    description: "Payment for Order #FC12344",
  },
  {
    id: "3",
    orderId: "#FC12343",
    date: "May 15, 2024",
    amount: 420000,
    method: "Credit Card",
    status: "Successful",
    description: "Payment for Order #FC12343",
  },
  {
    id: "4",
    orderId: "#FC12342",
    date: "May 10, 2024",
    amount: 95000,
    method: "Bank Transfer",
    status: "Successful",
    description: "Payment for Order #FC12342",
  },
  {
    id: "5",
    orderId: "#FC12341",
    date: "May 8, 2024",
    amount: 210000,
    method: "Pay on Delivery",
    status: "Refunded",
    description: "Refund for cancelled Order #FC12341",
  },
];

export const fakeMessages: CustomerMessage[] = [
  {
    id: "1",
    subject: "Your order has been shipped",
    message:
      "Hi John, your order #FC12344 has been shipped and will arrive in 3-5 business days. Tracking ID: TRK765456.",
    date: "May 21, 2024 at 09:25 AM",
    from: "admin",
    read: true,
  },
  {
    id: "2",
    subject: "Re: Delivery inquiry",
    message:
      "Hello, I wanted to follow up on my order #FC12343. It's been 5 days and I haven't received it yet.",
    date: "May 18, 2024 at 02:10 PM",
    from: "customer",
    read: true,
  },
  {
    id: "3",
    subject: "Delivery inquiry",
    message:
      "Thank you for reaching out. We have checked with our logistics partner and your order will arrive tomorrow.",
    date: "May 18, 2024 at 03:45 PM",
    from: "admin",
    read: true,
  },
  {
    id: "4",
    subject: "Order confirmation — #FC12345",
    message:
      "Hi John, thank you for your order! Your order #FC12345 has been confirmed and is being processed.",
    date: "May 20, 2024 at 10:32 AM",
    from: "admin",
    read: true,
  },
  {
    id: "5",
    subject: "Question about product dimensions",
    message:
      "Hi, I was wondering if you could confirm the exact dimensions of the Modern L-Shaped Sofa I ordered.",
    date: "May 14, 2024 at 11:20 AM",
    from: "customer",
    read: false,
  },
];

export const fakeSettings: CustomerSettings = {
  emailNotifications: true,
  smsNotifications: true,
  orderUpdates: true,
  promotionalEmails: false,
  accountStatus: "Active",
  twoFactorAuth: false,
};

// Fake API functions
export const customersApi = {
  getCustomers: async (): Promise<{
    customers: Customer[];
    stats: CustomerStats;
  }> => {
    await delay(1200);
    return {
      customers: fakeCustomers,
      stats: {
        totalCustomers: 1248,
        activeCustomers: 1180,
        blockedCustomers: 12,
        newThisMonth: 58,
      },
    };
  },

  getCustomerById: async (id: string): Promise<CustomerDetail> => {
    await delay(1000);
    const customer = fakeCustomers.find((c) => c.id === id);
    if (!customer) throw new Error("Customer not found");
    return { ...fakeCustomerDetail, ...customer };
  },

  updateCustomer: async (
    id: string,
    data: Partial<Customer>,
  ): Promise<Customer> => {
    await delay(800);
    const customer = fakeCustomers.find((c) => c.id === id);
    if (!customer) throw new Error("Customer not found");
    return { ...customer, ...data };
  },

  blockCustomer: async (
    id: string,
    reason: string,
    note: string,
  ): Promise<void> => {
    await delay(800);
    console.log("Blocked customer:", { id, reason, note });
  },

  deleteCustomer: async (id: string, keepHistory: boolean): Promise<void> => {
    await delay(800);
    console.log("Deleted customer:", { id, keepHistory });
  },

  sendMessage: async (
    customerId: string,
    subject: string,
    message: string,
  ): Promise<void> => {
    await delay(600);
    console.log("Message sent:", { customerId, subject, message });
  },

  getReceipts: async (customerId: string): Promise<CustomerReceipt[]> => {
    await delay(900);
    return fakeReceipts;
  },

  getMessages: async (customerId: string): Promise<CustomerMessage[]> => {
    await delay(800);
    return fakeMessages;
  },

  getSettings: async (customerId: string): Promise<CustomerSettings> => {
    await delay(700);
    return fakeSettings;
  },

  updateSettings: async (
    customerId: string,
    settings: Partial<CustomerSettings>,
  ): Promise<CustomerSettings> => {
    await delay(600);
    return { ...fakeSettings, ...settings };
  },

  getOrderDetail: async (orderId: string) => {
    await delay(1000);
    return {
      id: orderId,
      status: "Completed" as const,
      placedAt: "May 20, 2024 at 10:30 AM",
      items: [
        {
          id: "1",
          name: "Modern L-Shaped Sofa",
          image: "/conference_chair-2.png",
          sku: "FC-SOFA-001",
          price: 250000,
          qty: 1,
        },
        {
          id: "2",
          name: "Marble Coffee Table",
          image: "/conference_chair-2.png",
          sku: "FC-TABLE-006",
          price: 95000,
          qty: 1,
        },
        {
          id: "3",
          name: "Decor Vase Set",
          image: "/conference_chair-2.png",
          sku: "FC-DECOR-010",
          price: 25000,
          qty: 1,
        },
      ],
      orderInfo: {
        paymentMethod: "Bank Transfer",
        paymentStatus: "Paid",
        deliveryStatus: "Delivered",
        trackingId: "TRK785456",
      },
      shippingAddress: {
        name: "John Doe",
        address: "21 Freedom Way, Lekki Phase 1",
        city: "Lagos State, Nigeria",
        postalCode: "100001",
      },
      subtotal: 370000,
      shipping: 15000,
      total: 385000,
    };
  },
};

export const stepConfig = [
  { id: 1, label: "Basic Information" },
  { id: 2, label: "Address Information" },
  { id: 3, label: "Additional Information" },
  { id: 4, label: "Review & Save" },
];

export const countryCodes = [
  { label: "🇳🇬 +234", key: "+234" },
  { label: "🇬🇧 +44", key: "+44" },
  { label: "🇺🇸 +1", key: "+1" },
  { label: "🇬🇭 +233", key: "+233" },
  { label: "🇿🇦 +27", key: "+27" },
];

export const nigerianStates = [
  { label: "Lagos", key: "Lagos" },
  { label: "Abuja (FCT)", key: "Abuja" },
  { label: "Rivers", key: "Rivers" },
  { label: "Kano", key: "Kano" },
  { label: "Ogun", key: "Ogun" },
  { label: "Oyo", key: "Oyo" },
  { label: "Delta", key: "Delta" },
  { label: "Enugu", key: "Enugu" },
];

export const countries = [
  { label: "Nigeria", key: "Nigeria" },
  { label: "Ghana", key: "Ghana" },
  { label: "South Africa", key: "South Africa" },
  { label: "United Kingdom", key: "United Kingdom" },
  { label: "United States", key: "United States" },
];

export const addressTypes = [
  { label: "Home", key: "Home" },
  { label: "Office", key: "Office" },
  { label: "Other", key: "Other" },
];

export const contactMethods = [
  { label: "Email", key: "Email" },
  { label: "Phone", key: "Phone" },
  { label: "WhatsApp", key: "WhatsApp" },
  { label: "SMS", key: "SMS" },
];

export const customerGroups = [
  { label: "Regular", key: "Regular" },
  { label: "VIP", key: "VIP" },
  { label: "Wholesale", key: "Wholesale" },
  { label: "Corporate", key: "Corporate" },
];

export const referralSources = [
  { label: "Social Media", key: "Social Media" },
  { label: "Google Search", key: "Google Search" },
  { label: "Word of Mouth", key: "Word of Mouth" },
  { label: "Advertisement", key: "Advertisement" },
  { label: "Other", key: "Other" },
];
