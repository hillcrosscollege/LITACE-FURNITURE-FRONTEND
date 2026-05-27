// components/customers/customers-columns.tsx
"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import Image from "next/image";
import { Checkbox } from "@/components/ui/checkbox";
import { Customer, CustomerStatus } from "../customers_types";
import App_Text from "@/components/app_ui/App_Text";
import App_Button from "@/components/app_ui/App_Button";

export const customerColumns: ColumnDef<Customer>[] = [
  {
    accessorKey: "name",
    header: () => <App_Text variant="tableHeader">Customer</App_Text>,
    cell: ({ row }) => (
      <div className="flex items-center gap-2 min-w-35">
        <div className="w-8 h-8 rounded-full bg-[#f0e8df] shrink-0 overflow-hidden">
          <Image
            src={row.original.avatar}
            alt={row.original.name}
            width={32}
            height={32}
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
      <App_Text variant="tableCell" className="font-semibold min-w-25">
        ₦{Number(row.getValue("totalSpent")).toLocaleString()}
      </App_Text>
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
    accessorKey: "joinedOn",
    header: () => <App_Text variant="tableHeader">Joined On</App_Text>,
    cell: ({ row }) => (
      <App_Text variant="tableCell">{row.getValue("joinedOn")}</App_Text>
    ),
  },
  {
    id: "actions",
    header: () => <App_Text variant="tableHeader">Actions</App_Text>,
    cell: () => (
      <App_Button
        text=""
        icon={<MoreHorizontal size={15} />}
        btnStyle="p-1.5 h-auto bg-transparent text-muted-foreground hover:text-[#1e1a17] hover:bg-[#f5f2ee] rounded shadow-none border-0"
      />
    ),
  },
];

export const customers: Customer[] = [
  {
    id: "1",
    name: "John Doe",
    avatar: "/conference_chair-2.png",
    email: "johndoe@email.com",
    phone: "+234 801 234 5678",
    orders: 8,
    totalSpent: 1250000,
    status: "Active",
    joinedOn: "May 20, 2024",
  },
  {
    id: "2",
    name: "Jane Smith",
    avatar: "/conference_chair-2.png",
    email: "janesmith@email.com",
    phone: "+234 802 345 6789",
    orders: 5,
    totalSpent: 750000,
    status: "Active",
    joinedOn: "May 18, 2024",
  },
  {
    id: "3",
    name: "Michael Brown",
    avatar: "/conference_chair-2.png",
    email: "michaelb@email.com",
    phone: "+234 803 456 7890",
    orders: 12,
    totalSpent: 2100000,
    status: "Active",
    joinedOn: "May 15, 2024",
  },
  {
    id: "4",
    name: "Emily Davis",
    avatar: "/conference_chair-2.png",
    email: "emilyd@email.com",
    phone: "+234 804 567 8901",
    orders: 3,
    totalSpent: 320000,
    status: "Inactive",
    joinedOn: "May 10, 2024",
  },
  {
    id: "5",
    name: "Daniel Wilson",
    avatar: "/conference_chair-2.png",
    email: "danielw@email.com",
    phone: "+234 805 678 9012",
    orders: 7,
    totalSpent: 980000,
    status: "Active",
    joinedOn: "May 8, 2024",
  },
  {
    id: "6",
    name: "Sarah Johnson",
    avatar: "/conference_chair-2.png",
    email: "sarahj@email.com",
    phone: "+234 806 789 0123",
    orders: 4,
    totalSpent: 540000,
    status: "Active",
    joinedOn: "May 5, 2024",
  },
];

export const customerStats = [
  {
    title: "Total Customers",
    value: "1,248",
    change: "12.5%",
    changeDirection: "up" as const,
    changeLabel: "vs last month",
    iconClassName: "text-[#3266ad]",
    iconWrapperClassName: "bg-[#edf2fb]",
  },
  {
    title: "Active Customers",
    value: "1,024",
    change: "8.3%",
    changeDirection: "up" as const,
    changeLabel: "vs last month",
    iconClassName: "text-[#2e7d52]",
    iconWrapperClassName: "bg-[#edf7f2]",
  },
  {
    title: "New Customers",
    value: "224",
    change: "15.2%",
    changeDirection: "up" as const,
    changeLabel: "vs last month",
    iconClassName: "text-[#7048b6]",
    iconWrapperClassName: "bg-[#f0ebf7]",
  },
  {
    title: "Repeat Customers",
    value: "568",
    change: "11.7%",
    changeDirection: "up" as const,
    changeLabel: "vs last month",
    iconClassName: "text-[#c87941]",
    iconWrapperClassName: "bg-[#fdf0e6]",
  },
];

export const customerStatusStyles: Record<CustomerStatus, string> = {
  Active: "bg-[#e8fdf0] text-[#157a45]",
  Inactive: "bg-[#fdecea] text-[#a32020]",
};
