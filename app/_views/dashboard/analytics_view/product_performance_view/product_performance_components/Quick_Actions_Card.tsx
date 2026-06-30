"use client";

import { useRouter } from "next/navigation";
import { Plus, Package, FolderTree, ChevronRight } from "lucide-react";
import App_Text from "@/components/app_ui/App_Text";

const actions = [
  {
    label: "Add New Product",
    desc: "Create a new product",
    icon: Plus,
    path: "/dashboard/products/add",
  },
  {
    label: "View Inventory",
    desc: "Check stock levels",
    icon: Package,
    path: "/dashboard/inventory",
  },
  {
    label: "Manage Categories",
    desc: "Organize product categories",
    icon: FolderTree,
    path: "/dashboard/categories",
  },
];

const Quick_Actions_Card = () => {
  const router = useRouter();

  return (
    <div className="bg-white rounded-2xl border border-[#ede8e2] shadow-sm p-4 space-y-2">
      <App_Text variant="cardHeading">Quick Actions</App_Text>
      {actions.map(({ label, desc, icon: Icon, path }) => (
        <button
          key={label}
          type="button"
          onClick={() => router.push(path)}
          className="flex items-center gap-3 w-full px-2 py-2.5 rounded-xl hover:bg-[#faf9f7] transition-colors group text-left"
        >
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
            <Icon size={14} className="text-primary" />
          </div>
          <div className="flex-1">
            <App_Text
              variant="tableCell"
              className="font-medium group-hover:text-primary transition-colors"
            >
              {label}
            </App_Text>
            <App_Text variant="tableCellMuted">{desc}</App_Text>
          </div>
          <ChevronRight
            size={14}
            className="text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all"
          />
        </button>
      ))}
    </div>
  );
};

export default Quick_Actions_Card;
