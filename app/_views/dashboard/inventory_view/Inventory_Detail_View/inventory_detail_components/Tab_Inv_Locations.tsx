"use client";

import { MoreHorizontal, Plus } from "lucide-react";
import { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import App_Button from "@/components/app_ui/App_Button";
import App_Table from "@/components/app_ui/App_Table";
import App_Text from "@/components/app_ui/App_Text";
import { Skeleton_Location_Row } from "../../inventory_components/Inventory_Skeleton";
import { useInventoryLocations } from "../../inventory_hooks/useInventoryQueries";
import Add_Location_Modal from "../../inventory_modals/Add_Location_Modal";
import { InventoryLocation } from "../../inventory_types";

const columns: ColumnDef<InventoryLocation>[] = [
  {
    accessorKey: "name",
    header: () => <App_Text variant="tableHeader">Location</App_Text>,
    cell: ({ row }) => (
      <App_Text variant="tableCell" className="font-medium">
        {row.getValue("name")}
      </App_Text>
    ),
  },
  {
    accessorKey: "inStock",
    header: () => <App_Text variant="tableHeader">In Stock</App_Text>,
    cell: ({ row }) => (
      <App_Text variant="tableCell">{row.getValue("inStock")}</App_Text>
    ),
  },
  {
    accessorKey: "reserved",
    header: () => <App_Text variant="tableHeader">Reserved</App_Text>,
    cell: ({ row }) => (
      <App_Text variant="tableCell">{row.getValue("reserved")}</App_Text>
    ),
  },
  {
    accessorKey: "available",
    header: () => <App_Text variant="tableHeader">Available</App_Text>,
    cell: ({ row }) => (
      <App_Text variant="tableCell" className="font-semibold">
        {row.getValue("available")}
      </App_Text>
    ),
  },
  {
    id: "actions",
    header: () => <App_Text variant="tableHeader">Actions</App_Text>,
    cell: () => (
      <button
        type="button"
        className="p-1.5 rounded hover:bg-[#f5f2ee] text-muted-foreground"
      >
        <MoreHorizontal size={15} />
      </button>
    ),
  },
];

const Tab_Inv_Locations = () => {
  const [showAdd, setShowAdd] = useState(false);
  const { data: locations, isLoading } = useInventoryLocations();

  return (
    <>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <App_Text variant="cardHeading">Inventory Locations</App_Text>
          <App_Button
            text="Add Location"
            icon={<Plus size={13} />}
            type="button"
            onPress={() => setShowAdd(true)}
            btnStyle="text-xs bg-primary text-white hover:bg-primary/90 rounded-lg px-3 py-2 h-auto"
          />
        </div>
        <div className="border border-[#ede8e2] rounded-2xl overflow-hidden">
          {isLoading ? (
            <table className="w-full">
              <tbody>
                {Array.from({ length: 4 }).map((_, i) => (
                  <Skeleton_Location_Row key={i} />
                ))}
              </tbody>
            </table>
          ) : (
            <App_Table
              columns={columns}
              data={locations ?? []}
              style="mt-0"
              childRowStyle="hover:bg-[#faf9f7]"
            />
          )}
        </div>
      </div>
      {showAdd && <Add_Location_Modal onClose={() => setShowAdd(false)} />}
    </>
  );
};

export default Tab_Inv_Locations;
