// components/orders/orders-columns.tsx
"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Eye, Printer } from "lucide-react";
import Image from "next/image";
import { Checkbox } from "@/components/ui/checkbox";
import App_Text from "@/components/app_ui/App_Text";
import App_Button from "@/components/app_ui/App_Button";
import { Order, OrderStatus, PaymentStatus } from "../order_view_types";

export const paymentStatusStyles: Record<PaymentStatus, string> = {
  Paid: "bg-[#e8fdf0] text-[#157a45]",
  Pending: "bg-[#fdf5e0] text-[#8a6300]",
  Failed: "bg-[#fdecea] text-[#a32020]",
};

export const orderStatusStyles: Record<OrderStatus, string> = {
  Delivered: "bg-[#e8fdf0] text-[#157a45]",
  Shipped: "bg-[#edf2fb] text-[#1a56c4]",
  Processing: "bg-[#f5f0fa] text-[#7048b6]",
  Pending: "bg-[#fdf5e0] text-[#8a6300]",
  Cancelled: "bg-[#fdecea] text-[#a32020]",
};

export const orderColumns: ColumnDef<Order>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(v) => table.toggleAllPageRowsSelected(!!v)}
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(v) => row.toggleSelected(!!v)}
      />
    ),
  },
  {
    accessorKey: "id",
    header: () => <App_Text variant="tableHeader">Order ID</App_Text>,
    cell: ({ row }) => (
      <App_Text variant="tableCell" className="font-medium">
        {row.getValue("id")}
      </App_Text>
    ),
  },
  {
    accessorKey: "customer",
    header: () => <App_Text variant="tableHeader">Customer</App_Text>,
    cell: ({ row }) => {
      const customer = row.original.customer;
      return (
        <div className="flex items-center gap-2 min-w-40">
          <div className="w-8 h-8 rounded-full bg-[#f0e8df] shrink-0 overflow-hidden">
            <Image
              src={customer.avatar}
              alt={customer.name}
              width={32}
              height={32}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <App_Text variant="tableCell" className="font-medium">
              {customer.name}
            </App_Text>
            <App_Text variant="tableCellMuted">{customer.email}</App_Text>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "items",
    header: () => <App_Text variant="tableHeader">Items</App_Text>,
    cell: ({ row }) => (
      <App_Text variant="tableCell">
        {row.getValue("items")}{" "}
        {Number(row.getValue("items")) === 1 ? "Item" : "Items"}
      </App_Text>
    ),
  },
  {
    accessorKey: "totalAmount",
    header: () => <App_Text variant="tableHeader">Total Amount</App_Text>,
    cell: ({ row }) => (
      <App_Text variant="tableCell" className="font-semibold min-w-25">
        ₦{Number(row.getValue("totalAmount")).toLocaleString()}
      </App_Text>
    ),
  },
  {
    accessorKey: "paymentStatus",
    header: () => <App_Text variant="tableHeader">Payment</App_Text>,
    cell: ({ row }) => {
      const status = row.getValue(
        "paymentStatus",
      ) as keyof typeof paymentStatusStyles;
      return (
        <span
          className={`text-xs px-2.5 py-1 rounded-full font-medium ${paymentStatusStyles[status]}`}
        >
          {status}
        </span>
      );
    },
  },
  {
    accessorKey: "orderStatus",
    header: () => <App_Text variant="tableHeader">Status</App_Text>,
    cell: ({ row }) => {
      const status = row.getValue(
        "orderStatus",
      ) as keyof typeof orderStatusStyles;
      return (
        <span
          className={`text-xs px-2.5 py-1 rounded-full font-medium ${orderStatusStyles[status]}`}
        >
          {status}
        </span>
      );
    },
  },
  {
    accessorKey: "date",
    header: () => <App_Text variant="tableHeader">Date</App_Text>,
    cell: ({ row }) => (
      <div className="min-w-25">
        {String(row.getValue("date"))
          .split("\n")
          .map((line, i) =>
            i === 0 ? (
              <App_Text key={i} variant="tableCell">
                {line}
              </App_Text>
            ) : (
              <App_Text key={i} variant="tableCellMuted">
                {line}
              </App_Text>
            ),
          )}
      </div>
    ),
  },
  {
    id: "actions",
    header: () => <App_Text variant="tableHeader">Actions</App_Text>,
    cell: () => (
      <div className="flex items-center gap-1">
        <App_Button
          text=""
          icon={<Eye size={14} />}
          btnStyle="p-1.5 h-auto bg-transparent text-muted-foreground hover:text-[#1e1a17] hover:bg-[#f5f2ee] rounded shadow-none border-0"
        />
        <App_Button
          text=""
          icon={<Printer size={14} />}
          btnStyle="p-1.5 h-auto bg-transparent text-muted-foreground hover:text-[#1e1a17] hover:bg-[#f5f2ee] rounded shadow-none border-0"
        />
      </div>
    ),
  },
];

export const orders: Order[] = [
  {
    id: "#FC12345",
    customer: {
      name: "John Doe",
      email: "johndoe@email.com",
      avatar: "/conference_chair-2.png",
    },
    items: 3,
    totalAmount: 250000,
    paymentStatus: "Paid",
    orderStatus: "Delivered",
    date: "May 20, 2024\n10:30 AM",
  },
  {
    id: "#FC12344",
    customer: {
      name: "Jane Smith",
      email: "janesmith@email.com",
      avatar: "/conference_chair-2.png",
    },
    items: 2,
    totalAmount: 180000,
    paymentStatus: "Paid",
    orderStatus: "Shipped",
    date: "May 20, 2024\n09:15 AM",
  },
  {
    id: "#FC12343",
    customer: {
      name: "Michael Brown",
      email: "michaelbrown@email.com",
      avatar: "/conference_chair-2.png",
    },
    items: 4,
    totalAmount: 420000,
    paymentStatus: "Pending",
    orderStatus: "Processing",
    date: "May 19, 2024\n08:45 PM",
  },
  {
    id: "#FC12342",
    customer: {
      name: "Emily Davis",
      email: "emilydavis@email.com",
      avatar: "/conference_chair-2.png",
    },
    items: 1,
    totalAmount: 95000,
    paymentStatus: "Paid",
    orderStatus: "Pending",
    date: "May 19, 2024\n04:20 PM",
  },
  {
    id: "#FC12341",
    customer: {
      name: "Chris Wilson",
      email: "chriswilson@email.com",
      avatar: "/conference_chair-2.png",
    },
    items: 2,
    totalAmount: 160000,
    paymentStatus: "Failed",
    orderStatus: "Cancelled",
    date: "May 18, 2024\n02:10 PM",
  },
];

export const orderTabs = [
  { label: "All Orders", count: 156 },
  { label: "Pending", count: 12 },
  { label: "Processing", count: 24 },
  { label: "Shipped", count: 36 },
  { label: "Delivered", count: 72 },
  { label: "Cancelled", count: 12 },
];
