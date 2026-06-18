"use client";

import App_Text from "@/components/app_ui/App_Text";
import { Plus, Package, LayoutGrid, Store } from "lucide-react";
import { categoryDetail } from "../../categories_data/categories_data";

const Tab_Cat_Overview = () => {
  const { name, slug, status, showInMenu } = categoryDetail;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      {/* Category Information */}
      <div className="bg-[#faf9f7] rounded-xl border border-[#ede8e2] p-4 space-y-3">
        <App_Text variant="cardHeading">Category Information</App_Text>
        {[
          { label: "Category Name", value: name },
          { label: "Slug", value: slug },
          { label: "Parent Category", value: "—" },
          { label: "Status", value: status },
          { label: "Show in Menu", value: showInMenu ? "Yes" : "No" },
        ].map(({ label, value }) => (
          <div
            key={label}
            className="flex items-center justify-between py-1.5 border-b border-[#ede8e2] last:border-0"
          >
            <App_Text variant="tableCellMuted">{label}</App_Text>
            <App_Text
              variant="tableCell"
              className={`font-medium ${
                value === "Active"
                  ? "text-[#157a45]"
                  : value === "Inactive"
                    ? "text-[#c0392b]"
                    : ""
              }`}
            >
              {value}
            </App_Text>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-[#faf9f7] rounded-xl border border-[#ede8e2] p-4 space-y-2">
        <App_Text variant="cardHeading">Quick Actions</App_Text>
        {[
          {
            label: "Add Subcategory",
            icon: <Plus size={14} />,
            style: "text-primary",
          },
          {
            label: "Add Product",
            icon: <Package size={14} />,
            style: "text-[#2e7d52]",
          },
          {
            label: "Manage Products",
            icon: <LayoutGrid size={14} />,
            style: "text-[#3266ad]",
          },
          {
            label: "View on Store",
            icon: <Store size={14} />,
            style: "text-[#7048b6]",
          },
        ].map((action) => (
          <button
            key={action.label}
            type="button"
            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl hover:bg-white border border-transparent hover:border-[#ede8e2] transition-colors group"
          >
            <span className={action.style}>{action.icon}</span>
            <App_Text
              variant="tableCell"
              className="flex-1 text-left group-hover:text-primary transition-colors"
            >
              {action.label}
            </App_Text>
          </button>
        ))}
      </div>

      {/* Performance */}
      <div className="bg-[#faf9f7] rounded-xl border border-[#ede8e2] p-4 space-y-3">
        <App_Text variant="cardHeading">Performance</App_Text>
        {[
          { label: "Total Products", value: "28" },
          { label: "Active Products", value: "27" },
          { label: "Total Revenue", value: "₦12,450,000" },
          { label: "Total Orders", value: "156" },
        ].map(({ label, value }) => (
          <div
            key={label}
            className="flex items-center justify-between py-1.5 border-b border-[#ede8e2] last:border-0"
          >
            <App_Text variant="tableCellMuted">{label}</App_Text>
            <App_Text variant="tableCell" className="font-semibold">
              {value}
            </App_Text>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tab_Cat_Overview;
