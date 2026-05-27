import React from "react";
import Dash_Top from "./dashboard_components/Dash_Top";
import Dash_Top_Selling from "./dashboard_components/Dash_Top_Selling";

// types/quick-actions.ts
import {
  PlusCircle,
  LayoutGrid,
  ShoppingBag,
  BarChart2,
  LucideIcon,
  ChevronRight,
} from "lucide-react";
import Image from "next/image";
import Dash_Section_Two from "./dashboard_components/Dash_Section_Two";

export type QuickAction = {
  title: string;
  description: string;
  icon: LucideIcon;
  iconClassName: string;
  iconWrapperClassName: string;
};

export const quickActions: QuickAction[] = [
  {
    title: "Add New Product",
    description: "Add a new furniture to your store",
    icon: PlusCircle,
    iconClassName: "text-[#c0392b]",
    iconWrapperClassName: "bg-[#fdecea]",
  },
  {
    title: "Manage Categories",
    description: "Organize your product categories",
    icon: LayoutGrid,
    iconClassName: "text-[#2e7d52]",
    iconWrapperClassName: "bg-[#edf7f2]",
  },
  {
    title: "Manage Orders",
    description: "View and manage customer orders",
    icon: ShoppingBag,
    iconClassName: "text-[#3266ad]",
    iconWrapperClassName: "bg-[#edf2fb]",
  },
  {
    title: "Reports",
    description: "Check detailed store reports",
    icon: BarChart2,
    iconClassName: "text-[#7048b6]",
    iconWrapperClassName: "bg-[#f0ebf7]",
  },
];

// types/low-stock.ts
export type LowStockItem = {
  product: string;
  image: string;
  stock: number;
};

export const lowStockItems: LowStockItem[] = [
  {
    product: "Modern L-Shaped Sofa",
    image: "/conference_chair-2.png",
    stock: 3,
  },
  { product: "Wooden Dining Set", image: "/conference_chair-2.png", stock: 4 },
  { product: "Luxury Wooden Bed", image: "/conference_chair-2.png", stock: 2 },
  {
    product: "Ergonomic Office Chair",
    image: "/conference_chair-2.png",
    stock: 1,
  },
  {
    product: "Marble Coffee Table",
    image: "/conference_chair-2.png",
    stock: 2,
  },
];

const Dashboard_View = () => {
  return (
    <>
      <Dash_Top />
      <Dash_Section_Two />
      <div className="flex gap-4">
        <Dash_Top_Selling />
        <div className="bg-white rounded-2xl border border-[#ede8e2] p-4 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-[#1e1a17]">
              Low Stock Alert
            </h3>
            <button className="text-xs text-[#a0522d] hover:underline">
              View All
            </button>
          </div>

          <div className="flex flex-col gap-3">
            {lowStockItems.map((item) => (
              <div key={item.product} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#f0e8df] flex-shrink-0 overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.product}
                    width={40}
                    height={40}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-[#1e1a17] truncate">
                    {item.product}
                  </p>
                  <p className="text-xs text-[#c0392b]">Stock: {item.stock}</p>
                </div>

                <button className="text-xs border border-[#d0c8c0] rounded-lg px-3 py-1.5 text-[#555] hover:bg-[#f5f2ee] transition-colors flex-shrink-0">
                  Restock
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-[#ede8e2] p-4 shadow-sm">
          <h3 className="text-sm font-semibold text-[#1e1a17] mb-3">
            Quick Actions
          </h3>

          <div className="flex flex-col gap-2">
            {quickActions.map((action) => (
              <div
                key={action.title}
                className="flex items-center gap-3 p-2.5 rounded-lg bg-[#f9f8f6] hover:bg-[#f2ede7] cursor-pointer transition-colors"
              >
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${action.iconWrapperClassName}`}
                >
                  <action.icon size={16} className={action.iconClassName} />
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-[#1e1a17]">
                    {action.title}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">
                    {action.description}
                  </p>
                </div>

                <ChevronRight
                  size={14}
                  className="text-muted-foreground flex-shrink-0"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard_View;
