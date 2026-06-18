import App_Drop_Down from "@/components/app_ui/App_Drop_Down";
import { Eye, Pencil, MessageSquare } from "lucide-react";
import { useRouter } from "next/navigation";

const Customer_Actions_Cell = ({
  row,
  onEdit,
  // onBlock,
  // onDelete,
  onMessage,
}: {
  row: any;
  onEdit: (id: string) => void;
  // onBlock: (id: string) => void;
  // onDelete: (id: string) => void;
  onMessage: (id: string) => void;
}) => {
  const router = useRouter();
  const actions = [
    {
      id: "view",
      icon: Eye,
      text: "View Customer",
      action: () => router.push(`/dashboard/customers/${row.original.id}`),
    },
    // {
    //   id: "edit",
    //   icon: Pencil,
    //   text: "Edit Customer",
    //   action: () => onEdit(row.original.id),
    // },
    // {
    //   id: "message",
    //   icon: MessageSquare,
    //   text: "Send Message",
    //   action: () => onMessage(row.original.id),
    // },
    // {
    //   id: "block",
    //   icon: ShieldX,
    //   text: "Block Customer",
    //   action: () => onBlock(row.original.id),
    //   separatorBefore: true,
    //   className: "text-[#c87941] focus:text-[#c87941] focus:bg-[#fdf0e6]",
    // },
    // {
    //   id: "delete",
    //   icon: Trash2,
    //   text: "Delete Customer",
    //   action: () => onDelete(row.original.id),
    //   className: "text-[#c0392b] focus:text-[#c0392b] focus:bg-[#fdecea]",
    // },
  ];
  return <App_Drop_Down content={actions} />;
};

export default Customer_Actions_Cell;
