// components/categories/details/tabs/Tab_Cat_Subcategories.tsx
"use client";

import { GripVertical, Pencil, Trash2, Plus } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import App_Button from "@/components/app_ui/App_Button";
import App_Table from "@/components/app_ui/App_Table";
import App_Text from "@/components/app_ui/App_Text";
import { subcategories } from "../../categories_data/categories_data";
import { Subcategory } from "../../categories_types";

const columns: ColumnDef<Subcategory>[] = [
  {
    id: "drag",
    header: () => null,
    cell: () => (
      <GripVertical size={15} className="text-muted-foreground cursor-grab" />
    ),
  },
  {
    accessorKey: "name",
    header: () => <App_Text variant="tableHeader">Subcategory</App_Text>,
    cell: ({ row }) => (
      <App_Text variant="tableCell" className="font-medium">
        {row.getValue("name")}
      </App_Text>
    ),
  },
  {
    accessorKey: "products",
    header: () => <App_Text variant="tableHeader">Products</App_Text>,
    cell: ({ row }) => (
      <App_Text variant="tableCell">{row.getValue("products")}</App_Text>
    ),
  },
  {
    accessorKey: "status",
    header: () => <App_Text variant="tableHeader">Status</App_Text>,
    cell: ({ row }) => (
      <span className="text-xs px-2.5 py-1 rounded-full font-medium bg-[#e8fdf0] text-[#157a45]">
        {row.getValue("status")}
      </span>
    ),
  },
  {
    accessorKey: "sortOrder",
    header: () => <App_Text variant="tableHeader">Sort Order</App_Text>,
    cell: ({ row }) => (
      <App_Text variant="tableCell">{row.getValue("sortOrder")}</App_Text>
    ),
  },
  {
    id: "actions",
    header: () => <App_Text variant="tableHeader">Actions</App_Text>,
    cell: () => (
      <div className="flex items-center gap-1">
        <App_Button
          text=""
          icon={<Pencil size={13} />}
          type="button"
          btnStyle="p-1.5 h-auto bg-transparent text-muted-foreground hover:text-primary hover:bg-primary/10 rounded shadow-none border-0"
        />
        <App_Button
          text=""
          icon={<Trash2 size={13} />}
          type="button"
          btnStyle="p-1.5 h-auto bg-transparent text-muted-foreground hover:text-[#c0392b] hover:bg-[#fdecea] rounded shadow-none border-0"
        />
      </div>
    ),
  },
];

const Tab_Cat_Subcategories = () => (
  <div className="space-y-4">
    <div className="flex items-center justify-between">
      <App_Text variant="cardHeading">Subcategories in Living Room</App_Text>
      <App_Button
        text="Add Subcategory"
        icon={<Plus size={13} />}
        type="button"
        btnStyle="text-xs bg-primary text-white hover:bg-primary/90 rounded-lg px-3 py-2 h-auto"
      />
    </div>
    <div className="border border-[#ede8e2] rounded-2xl overflow-hidden">
      <App_Table
        columns={columns}
        data={subcategories}
        style="mt-0"
        childRowStyle="hover:bg-[#faf9f7]"
      />
    </div>
  </div>
);

export default Tab_Cat_Subcategories;
