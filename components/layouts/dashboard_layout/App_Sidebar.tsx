"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import App_Sidebar_Item, { MatchType } from "./App_Sidebar_Item";

import {
  LayoutDashboard,
  Package,
  Tag,
  ShoppingCart,
  Users,
  Archive,
  UsersRound,
  Settings,
  LogOut,
  BarChart2,
} from "lucide-react";

const sidebar_items = [
  {
    id: 1,
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
    match: "exact",
  },
  {
    id: 2,
    label: "Products",
    href: "/dashboard/products",
    icon: Package,
    match: "prefix",
  },
  {
    id: 3,
    label: "Categories",
    href: "/dashboard/categories",
    icon: Tag,
    match: "prefix",
  },
  {
    id: 4,
    label: "Orders",
    href: "/dashboard/orders",
    icon: ShoppingCart,
    match: "prefix",
  },
  {
    id: 5,
    label: "Customers",
    href: "/dashboard/customers",
    icon: Users,
    match: "prefix",
  },
  // {
  //   id: 6,
  //   label: "Inventory",
  //   href: "/dashboard/inventory",
  //   icon: Archive,
  //   match: "prefix",
  // },
  // {
  //   id: 7,
  //   label: "Reviews",
  //   href: "/dashboard/reviews",
  //   icon: Star,
  //   match: "prefix",
  // },
  // {
  //   id: 8,
  //   label: "Coupons",
  //   href: "/dashboard/coupons",
  //   icon: Ticket,
  //   match: "prefix",
  // },
  {
    id: 9,
    label: "Sales & Analytics",
    href: "/dashboard/analytics",
    icon: BarChart2,
    match: "prefix",
  },
  // {
  //   id: 10,
  //   label: "Reports",
  //   href: "/dashboard/reports",
  //   icon: FileText,
  //   match: "prefix",
  // },
  // {
  //   id: 11,
  //   label: "Marketing",
  //   href: "/dashboard/marketing",
  //   icon: Megaphone,
  //   match: "prefix",
  // },
  // {
  //   id: 12,
  //   label: "Staff Management",
  //   href: "/dashboard/staff",
  //   icon: UsersRound,
  //   match: "prefix",
  // },
  {
    id: 13,
    label: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
    match: "prefix",
  },
  { id: 14, label: "Logout", href: "/logout", icon: LogOut, match: "exact" },
];

// [data-sidebar="sidebar"] {
//   background: linear-gradient(160deg, #6a1f6b 0%, #8f3d90 40%, #b565b6 100%) !important;
// }
const App_Sidebar = () => {
  const { open } = useSidebar();

  return (
    <Sidebar
      collapsible="icon"
      className="border-r bg-linear-to-b from-[#1F1033] to-[#2E1246] border-white/10"
    >
      {/* Header */}
      <SidebarHeader className="border-b border-white/10 px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-white/20 border border-white/20 flex items-center justify-center flex-shrink-0">
            <span className="text-white text-sm font-bold">L</span>
          </div>
          {open && (
            <div>
              <p className="text-sm font-semibold text-white leading-tight">
                Litace Manager
              </p>
              <p className="text-[11px] text-white/50">Admin Dashboard</p>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent className="px-3 py-3">
        {/* Trigger */}
        <div className="flex justify-end mb-2">
          <SidebarTrigger className="text-white/50 hover:text-white hover:bg-white/10 rounded-lg" />
        </div>

        {/* Nav items */}
        <SidebarMenu className="space-y-2.5">
          {sidebar_items.map((item) => (
            <App_Sidebar_Item
              key={item.id}
              name={item.label}
              link={item.href}
              icon={item.icon}
              match={item.match as MatchType}
            />
          ))}
        </SidebarMenu>
      </SidebarContent>

      {/* Footer */}
      <SidebarFooter className="border-t border-white/10 px-3 py-3">
        <div
          className={`flex items-center gap-3 p-2.5 rounded-lg bg-white/10 border border-white/10 ${!open && "justify-center"}`}
        >
          <div className="w-8 h-8 rounded-full bg-white/20 border border-white/20 flex items-center justify-center flex-shrink-0">
            <span className="text-white text-xs font-semibold">JD</span>
          </div>
          {open && (
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-white truncate">
                John Doe
              </p>
              <p className="text-[11px] text-white/50 truncate">
                johndoe@email.com
              </p>
            </div>
          )}
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default App_Sidebar;
