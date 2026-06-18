"use client";

import Image from "next/image";
import { Eye } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import App_Button from "@/components/app_ui/App_Button";
import App_Table from "@/components/app_ui/App_Table";
import App_Text from "@/components/app_ui/App_Text";
import { Skeleton_Low_Stock_Row } from "../../inventory_components/Inventory_Skeleton";
import { useLowStockAlerts } from "../../inventory_hooks/useInventoryQueries";
import { LowStockAlert } from "../../inventory_types";

const columns = (
  router: ReturnType<typeof useRouter>,
): ColumnDef<LowStockAlert>[] => [
  {
    accessorKey: "name",
    header: () => <App_Text variant="tableHeader">Product</App_Text>,
    cell: ({ row }) => (
      <div className="flex items-center gap-3 min-w-40">
        <div className="w-9 h-9 rounded-lg bg-[#f0e8df] overflow-hidden shrink-0">
          <Image
            src={row.original.image}
            alt={row.original.name}
            width={36}
            height={36}
            className="w-full h-full object-cover"
          />
        </div>
        <App_Text variant="tableCell" className="font-medium">
          {row.original.name}
        </App_Text>
      </div>
    ),
  },
  {
    accessorKey: "sku",
    header: () => <App_Text variant="tableHeader">SKU</App_Text>,
    cell: ({ row }) => (
      <App_Text variant="tableCellMuted">{row.getValue("sku")}</App_Text>
    ),
  },
  {
    accessorKey: "available",
    header: () => <App_Text variant="tableHeader">Available</App_Text>,
    cell: ({ row }) => (
      <App_Text variant="tableCell" className="font-semibold text-[#c0392b]">
        {row.getValue("available")}
      </App_Text>
    ),
  },
  {
    accessorKey: "reorderLevel",
    header: () => <App_Text variant="tableHeader">Reorder Level</App_Text>,
    cell: ({ row }) => (
      <App_Text variant="tableCell">{row.getValue("reorderLevel")}</App_Text>
    ),
  },
  {
    id: "actions",
    header: () => <App_Text variant="tableHeader">Actions</App_Text>,
    cell: ({ row }) => (
      <App_Button
        text=""
        icon={<Eye size={14} />}
        type="button"
        onPress={() => router.push(`/dashboard/inventory/${row.original.id}`)}
        btnStyle="p-1.5 h-auto bg-transparent text-muted-foreground hover:text-primary hover:bg-primary/10 rounded shadow-none border-0"
      />
    ),
  },
];

const Tab_Inv_LowStock = () => {
  const router = useRouter();
  const { data: alerts, isLoading } = useLowStockAlerts();

  return (
    <div className="space-y-4">
      <App_Text variant="cardHeading">Low Stock Alerts</App_Text>
      <div className="border border-[#ede8e2] rounded-2xl overflow-hidden">
        {isLoading ? (
          <table className="w-full">
            <tbody>
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton_Low_Stock_Row key={i} />
              ))}
            </tbody>
          </table>
        ) : (
          <App_Table
            columns={columns(router)}
            data={alerts ?? []}
            style="mt-0"
            childRowStyle="hover:bg-[#faf9f7]"
          />
        )}
      </div>
      <button type="button" className="text-xs text-primary hover:underline">
        View all low stock products
      </button>
    </div>
  );
};

export default Tab_Inv_LowStock;
