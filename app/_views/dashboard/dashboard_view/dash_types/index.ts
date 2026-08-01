// types/dashboard-api.ts
import {
  Wallet,
  ShoppingBag,
  Users,
  Armchair,
  AlertTriangle,
} from "lucide-react";

export type DashboardStats = {
  title: string;
  value: string;
  icon: any;
  iconClassName: string;
  iconWrapperClassName: string;
  change: string;
  changeDirection: "up" | "down";
  changeLabel: string;
};

export type RecentOrder = {
  id: string;
  product: string;
  image: string;
  price: string;
  status: "Processing" | "Shipped" | "Delivered" | "Pending" | "Cancelled";
};

export type TopProduct = {
  product: string;
  image: string;
  category: string;
  sold: number;
  revenue: string;
};

export type SalesPoint = {
  date: string;
  thisMonth: number;
  lastMonth: number;
};

export type LowStockItem = {
  product: string;
  image: string;
  stock: number;
};

export type DashboardData = {
  stats: DashboardStats[];
  recentOrders: RecentOrder[];
  topProducts: TopProduct[];
  salesData: SalesPoint[];
  lowStock: LowStockItem[];
};
