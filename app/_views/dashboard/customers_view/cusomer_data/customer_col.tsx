"use client";

import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import App_Text from "@/components/app_ui/App_Text";
import { CustomerStatus, Customer } from "../customers_types";
import Customer_Actions_Cell from "../customers_components/Customer_Action_Cell";

export const customerStatusStyles: Record<CustomerStatus, string> = {
  Active: "bg-[#e8fdf0] text-[#157a45]",
  Inactive: "bg-[#f5f2ee] text-[#555]",
  Blocked: "bg-[#fdecea] text-[#a32020]",
};

export const createCustomerColumns = (
  onEdit: (id: string) => void,
  // onBlock: (id: string) => void,
  // onDelete: (id: string) => void,
  onMessage: (id: string) => void,
): ColumnDef<Customer>[] => [
  {
    accessorKey: "name",
    header: () => <App_Text variant="tableHeader">Customer</App_Text>,
    cell: ({ row }) => (
      <div className="flex items-center gap-2 min-w-35">
        <div className="w-7 h-7 rounded-full overflow-hidden bg-[#f0e8df] shrink-0">
          <Image
            src={row.original.avatar}
            alt={row.original.name}
            width={28}
            height={28}
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
    accessorKey: "email",
    header: () => <App_Text variant="tableHeader">Email</App_Text>,
    cell: ({ row }) => (
      <App_Text variant="tableCellMuted">{row.getValue("email")}</App_Text>
    ),
  },
  {
    accessorKey: "phone",
    header: () => <App_Text variant="tableHeader">Phone</App_Text>,
    cell: ({ row }) => (
      <App_Text variant="tableCell">{row.getValue("phone")}</App_Text>
    ),
  },
  {
    accessorKey: "orders",
    header: () => <App_Text variant="tableHeader">Orders</App_Text>,
    cell: ({ row }) => (
      <App_Text variant="tableCell">{row.getValue("orders")}</App_Text>
    ),
  },
  {
    accessorKey: "totalSpent",
    header: () => <App_Text variant="tableHeader">Total Spent</App_Text>,
    cell: ({ row }) => (
      <App_Text variant="tableCell" className="font-semibold">
        R {Number(row.getValue("totalSpent")).toLocaleString()}
      </App_Text>
    ),
  },
  {
    accessorKey: "lastOrder",
    header: () => <App_Text variant="tableHeader">Last Order</App_Text>,
    cell: ({ row }) => (
      <App_Text variant="tableCell">{row.getValue("lastOrder")}</App_Text>
    ),
  },
  {
    accessorKey: "status",
    header: () => <App_Text variant="tableHeader">Status</App_Text>,
    cell: ({ row }) => {
      const status = row.getValue("status") as CustomerStatus;
      return (
        <span
          className={`text-xs px-2.5 py-1 rounded-full font-medium ${customerStatusStyles[status]}`}
        >
          {status}
        </span>
      );
    },
  },
  {
    id: "actions",
    header: () => <App_Text variant="tableHeader">Actions</App_Text>,
    cell: ({ row }) => (
      <Customer_Actions_Cell
        row={row}
        onEdit={onEdit}
        // onBlock={onBlock}
        // onDelete={onDelete}
        onMessage={onMessage}
      />
    ),
  },
];
