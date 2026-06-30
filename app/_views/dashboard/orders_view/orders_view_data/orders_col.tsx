"use client";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { Order, OrderStatus, PaymentStatus } from "../order_view_types";
import App_Text from "@/components/app_ui/App_Text";
import { paymentStatusStyles, orderStatusStyles } from "./orders_data";
import ActionsCell from "../orders_view_components/Order_Drop_Down";

export const createOrderColumns = (
  onUpdateStatus: (id: string) => void,
): ColumnDef<Order>[] => [
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
      const c = row.original.customer;
      return (
        <div className="flex items-center gap-2 min-w-35">
          <div className="w-7 h-7 rounded-full overflow-hidden bg-[#f0e8df] shrink-0">
            <Image
              src={c.avatar}
              alt={c.name}
              width={28}
              height={28}
              className="w-full h-full object-cover"
            />
          </div>
          <App_Text variant="tableCell" className="font-medium">
            {c.name}
          </App_Text>
        </div>
      );
    },
  },
  {
    accessorKey: "date",
    header: () => <App_Text variant="tableHeader">Date</App_Text>,
    cell: ({ row }) => (
      <App_Text variant="tableCell">{row.getValue("date")}</App_Text>
    ),
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
    accessorKey: "total",
    header: () => <App_Text variant="tableHeader">Total</App_Text>,
    cell: ({ row }) => (
      <App_Text variant="tableCell" className="font-semibold">
        R {Number(row.getValue("total")).toLocaleString()}
      </App_Text>
    ),
  },
  {
    accessorKey: "payment",
    header: () => <App_Text variant="tableHeader">Payment</App_Text>,
    cell: ({ row }) => {
      const s = row.getValue("payment") as PaymentStatus;
      return (
        <span
          className={`text-xs px-2.5 py-1 rounded-full font-medium ${paymentStatusStyles[s]}`}
        >
          {s}
        </span>
      );
    },
  },
  {
    accessorKey: "status",
    header: () => <App_Text variant="tableHeader">Status</App_Text>,
    cell: ({ row }) => {
      const s = row.getValue("status") as OrderStatus;
      return (
        <span
          className={`text-xs px-2.5 py-1 rounded-full font-medium ${orderStatusStyles[s]}`}
        >
          {s}
        </span>
      );
    },
  },
  {
    accessorKey: "delivery",
    header: () => <App_Text variant="tableHeader">Delivery</App_Text>,
    cell: ({ row }) => (
      <App_Text variant="tableCellMuted">
        {row.getValue("delivery") ?? "—"}
      </App_Text>
    ),
  },
  {
    id: "actions",
    header: () => <App_Text variant="tableHeader">Actions</App_Text>,
    cell: ({ row }) => (
      <ActionsCell row={row} onUpdateStatus={onUpdateStatus} />
    ),
  },
];
