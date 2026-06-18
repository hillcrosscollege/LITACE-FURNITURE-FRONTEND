import App_Drop_Down from "@/components/app_ui/App_Drop_Down";
import { IApp_Drop_Down } from "@/types";
import { Eye, Printer, RefreshCw } from "lucide-react";
import { useRouter } from "next/navigation";
import { ActionsCellProps } from "../order_view_types";

const ActionsCell = ({ row, onUpdateStatus }: ActionsCellProps) => {
  const router = useRouter();

  const actions: IApp_Drop_Down[] = [
    {
      icon: Eye,
      text: "View Order",
      action: () => router.push(`/dashboard/orders/${row.original.id}`),
    },
    {
      icon: Printer,
      text: "Print Invoice",
      action: () => {},
    },
    {
      icon: RefreshCw,
      text: "Update Status",
      action: () => onUpdateStatus(row.original.id),
    },
  ];

  return <App_Drop_Down content={actions} />;
};

export default ActionsCell;
