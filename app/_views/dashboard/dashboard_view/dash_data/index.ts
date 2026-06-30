import {
  Wallet,
  ShoppingBag,
  Users,
  Armchair,
  AlertTriangle,
} from "lucide-react";

export const recentOrders: RecentOrder[] = [
  {
    id: "#FC12345",
    product: "Modern L-Shaped Sofa",
    image: "/conference_chair-2.png",
    price: "R 250,000",
    status: "Processing",
  },
  {
    id: "#FC12344",
    product: "Wooden Dining Set",
    image: "/conference_chair-2.png",
    price: "R 180,000",
    status: "Shipped",
  },
  {
    id: "#FC12343",
    product: "Luxury Wooden Bed",
    image: "/conference_chair-2.png",
    price: "R 420,000",
    status: "Delivered",
  },
  {
    id: "#FC12342",
    product: "Marble Coffee Table",
    image: "/conference_chair-2.png",
    price: "R 95,000",
    status: "Pending",
  },
  {
    id: "#FC12341",
    product: "Ergonomic Office Chair",
    image: "/conference_chair-2.png",
    price: "R 75,000",
    status: "Cancelled",
  },
];
// types/recent-orders.ts
export type RecentOrder = {
  id: string;
  product: string;
  image: string;
  price: string;
  status: "Processing" | "Shipped" | "Delivered" | "Pending" | "Cancelled";
};
// types/recent-orders.ts (add to same file)
export const statusStyles: Record<RecentOrder["status"], string> = {
  Processing: "bg-[#e8f0fc] text-[#1a56c4]",
  Shipped: "bg-[#e6f4ec] text-[#1e6e3e]",
  Delivered: "bg-[#e8fdf0] text-[#157a45]",
  Pending: "bg-[#fdf5e0] text-[#8a6300]",
  Cancelled: "bg-[#fde8e8] text-[#a32020]",
};

// types/charts.ts
export const salesData = [
  { date: "1 May", thisMonth: 180000, lastMonth: 120000 },
  { date: "5 May", thisMonth: 290000, lastMonth: 210000 },
  { date: "10 May", thisMonth: 340000, lastMonth: 260000 },
  { date: "15 May", thisMonth: 380000, lastMonth: 300000 },
  { date: "20 May", thisMonth: 510000, lastMonth: 390000 },
  { date: "25 May", thisMonth: 640000, lastMonth: 440000 },
  { date: "30 May", thisMonth: 760000, lastMonth: 580000 },
];

export const salesChartConfig = {
  thisMonth: { label: "This Month", color: "#a0522d" },
  lastMonth: { label: "Last Month", color: "#d0c8c0" },
};

export const stats = [
  {
    title: "Total Sales",
    value: "R 3,240,000",
    icon: Wallet,
    iconClassName: "text-[#c87941]",
    iconWrapperClassName: "bg-[#fdf0e6]",
    change: "12.5%",
    changeDirection: "up" as const,
    changeLabel: "vs last month",
  },
  {
    title: "Total Orders",
    value: "156",
    icon: ShoppingBag,
    iconClassName: "text-[#3266ad]",
    iconWrapperClassName: "bg-[#edf2fb]",
    change: "8.4%",
    changeDirection: "up" as const,
    changeLabel: "vs last month",
  },
  {
    title: "Total Customers",
    value: "532",
    icon: Users,
    iconClassName: "text-[#2e7d52]",
    iconWrapperClassName: "bg-[#edf7f2]",
    change: "10.2%",
    changeDirection: "up" as const,
    changeLabel: "vs last month",
  },
  {
    title: "Total Products",
    value: "128",
    icon: Armchair,
    iconClassName: "text-[#7048b6]",
    iconWrapperClassName: "bg-[#f0ebf7]",
    change: "5.6%",
    changeDirection: "up" as const,
    changeLabel: "vs last month",
  },
  {
    title: "Low Stock Items",
    value: "12",
    icon: AlertTriangle,
    iconClassName: "text-[#c0392b]",
    iconWrapperClassName: "bg-[#fdecea]",
    change: "3",
    changeDirection: "down" as const,
    changeLabel: "vs last month",
  },
];
