import App_Drop_Down from "@/components/app_ui/App_Drop_Down";
import { Eye } from "lucide-react";
import { useRouter } from "next/navigation";

const Category_Actions_Cell = ({ row }: { row: any }) => {
  const router = useRouter();
  const actions = [
    {
      id: "view",
      icon: Eye,
      text: "View Category",
      action: () => router.push(`/dashboard/categories/${row.original.id}`),
    },
  ];
  return <App_Drop_Down content={actions} />;
};

export default Category_Actions_Cell;
