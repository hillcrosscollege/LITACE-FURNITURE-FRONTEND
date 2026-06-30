"use client";

import Image from "next/image";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, ShieldX, Trash2, Pencil } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import App_Text from "@/components/app_ui/App_Text";
import { AdminUser } from "../user_management_types";

const statusStyles = {
  Active: "bg-[#e8fdf0] text-[#157a45]",
  Inactive: "bg-[#fdecea] text-[#a32020]",
};

const ActionsCell = ({
  row,
  onToggleStatus,
  onDelete,
}: {
  row: any;
  onToggleStatus: (user: AdminUser) => void;
  onDelete: (user: AdminUser) => void;
}) => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <button
        type="button"
        className="p-1.5 rounded hover:bg-[#f5f2ee] text-muted-foreground transition-colors"
      >
        <MoreHorizontal size={15} />
      </button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end" className="w-44">
      <DropdownMenuItem className="gap-2 cursor-pointer text-xs">
        <Pencil size={13} /> Edit User
      </DropdownMenuItem>
      <DropdownMenuItem
        className="gap-2 cursor-pointer text-xs"
        onClick={() => onToggleStatus(row.original)}
      >
        <ShieldX size={13} />{" "}
        {row.original.status === "Active" ? "Deactivate" : "Activate"}
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem
        className="gap-2 cursor-pointer text-xs text-[#c0392b] focus:text-[#c0392b] focus:bg-[#fdecea]"
        onClick={() => onDelete(row.original)}
      >
        <Trash2 size={13} /> Delete User
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
);

export const createUsersColumns = (
  onToggleStatus: (user: AdminUser) => void,
  onDelete: (user: AdminUser) => void,
): ColumnDef<AdminUser>[] => [
  {
    accessorKey: "name",
    header: () => <App_Text variant="tableHeader">User</App_Text>,
    cell: ({ row }) => (
      <div className="flex items-center gap-3 min-w-[160px]">
        <div className="w-8 h-8 rounded-full bg-[#f0e8df] overflow-hidden flex-shrink-0">
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
    accessorKey: "role",
    header: () => <App_Text variant="tableHeader">Role</App_Text>,
    cell: ({ row }) => (
      <App_Text variant="tableCell">{row.getValue("role")}</App_Text>
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
    accessorKey: "status",
    header: () => <App_Text variant="tableHeader">Status</App_Text>,
    cell: ({ row }) => {
      const s = row.getValue("status") as AdminUser["status"];
      return (
        <span
          className={`text-xs px-2.5 py-1 rounded-full font-medium ${statusStyles[s]}`}
        >
          {s}
        </span>
      );
    },
  },
  {
    accessorKey: "lastLogin",
    header: () => <App_Text variant="tableHeader">Last Login</App_Text>,
    cell: ({ row }) => (
      <App_Text variant="tableCellMuted">{row.getValue("lastLogin")}</App_Text>
    ),
  },
  {
    id: "actions",
    header: () => <App_Text variant="tableHeader">Actions</App_Text>,
    cell: ({ row }) => (
      <ActionsCell
        row={row}
        onToggleStatus={onToggleStatus}
        onDelete={onDelete}
      />
    ),
  },
];
