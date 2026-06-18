import App_Drop_Down from "@/components/app_ui/App_Drop_Down";
import { IApp_Drop_Down } from "@/types";
import { MoreHorizontal, RefreshCw, RotateCcw, XCircle } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

const More_Drop_Down = ({
  setShowUpdate,
  setShowRefund,
  setShowCancel,
}: {
  setShowCancel: Dispatch<SetStateAction<boolean>>;
  setShowUpdate: Dispatch<SetStateAction<boolean>>;
  setShowRefund: Dispatch<SetStateAction<boolean>>;
}) => {
  const actions = [
    {
      id: "update",
      icon: RefreshCw,
      text: "Update Status",
      action: () => setShowUpdate(true),
    },
    {
      id: "refund",
      icon: RotateCcw,
      text: "Refund Order",
      action: () => setShowRefund(true),
    },
    {
      id: "cancel",
      icon: XCircle,
      text: "Cancel Order",
      action: () => setShowCancel(true),
      separatorBefore: true,
      className: "text-[#c0392b] focus:text-[#c0392b] focus:bg-[#fdecea]",
    },
  ];
  return (
    <App_Drop_Down
      content={actions}
      trigger={
        <button
          type="button"
          className="flex items-center gap-1 p-2 rounded-lg border border-[#e0dbd4] hover:bg-[#f5f2ee] text-muted-foreground transition-colors text-xs"
        >
          More <MoreHorizontal size={13} />
        </button>
      }
    />
  );
};

export default More_Drop_Down;
