"use client";
import App_Button from "@/components/app_ui/App_Button";
import App_Text from "@/components/app_ui/App_Text";
import { ColumnDef } from "@tanstack/react-table";
import { Eye } from "lucide-react";
import router from "next/router";
import { CustomerOrder } from "../../customers_types";

const orderStatusStyles: Record<CustomerOrder["status"], string> = {
  Completed: "bg-[#e8fdf0] text-[#157a45]",
  Processing: "bg-[#f5f0fa] text-[#7048b6]",
  Shipped: "bg-[#edf2fb] text-[#1a56c4]",
  Delivered: "bg-[#e8fdf0] text-[#157a45]",
  Cancelled: "bg-[#fdecea] text-[#a32020]",
};

const paymentStyles: Record<CustomerOrder["payment"], string> = {
  Paid: "text-[#157a45]",
  Pending: "text-[#8a6300]",
  Refunded: "text-[#7048b6]",
};

export const customer_order_col: ColumnDef<CustomerOrder>[] = [
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
    accessorKey: "date",
    header: () => <App_Text variant="tableHeader">Date</App_Text>,
    cell: ({ row }) => (
      <App_Text variant="tableCell">{row.getValue("date")}</App_Text>
    ),
  },
  {
    accessorKey: "products",
    header: () => <App_Text variant="tableHeader">Products</App_Text>,
    cell: ({ row }) => (
      <App_Text variant="tableCell">
        {row.getValue("products")}{" "}
        {Number(row.getValue("products")) === 1 ? "item" : "items"}
      </App_Text>
    ),
  },
  {
    accessorKey: "total",
    header: () => <App_Text variant="tableHeader">Total</App_Text>,
    cell: ({ row }) => (
      <App_Text variant="tableCell" className="font-semibold">
        ₦{Number(row.getValue("total")).toLocaleString()}
      </App_Text>
    ),
  },
  {
    accessorKey: "payment",
    header: () => <App_Text variant="tableHeader">Payment</App_Text>,
    cell: ({ row }) => {
      const p = row.getValue("payment") as CustomerOrder["payment"];
      return (
        <App_Text
          variant="tableCell"
          className={`font-medium ${paymentStyles[p]}`}
        >
          {p}
        </App_Text>
      );
    },
  },
  {
    accessorKey: "delivery",
    header: () => <App_Text variant="tableHeader">Delivery</App_Text>,
    cell: ({ row }) => (
      <App_Text variant="tableCellMuted">{row.getValue("delivery")}</App_Text>
    ),
  },
  {
    accessorKey: "status",
    header: () => <App_Text variant="tableHeader">Status</App_Text>,
    cell: ({ row }) => {
      const s = row.getValue("status") as CustomerOrder["status"];
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
    id: "actions",
    header: () => <App_Text variant="tableHeader">Actions</App_Text>,
    cell: ({ row }) => (
      <App_Button
        text=""
        icon={<Eye size={14} />}
        type="button"
        onPress={() => router.push(`/dashboard/orders/${row.original.id}`)}
        btnStyle="p-1.5 h-auto bg-transparent text-muted-foreground hover:text-primary hover:bg-primary/10 rounded shadow-none border-0"
      />
    ),
  },
];
