import App_Drop_Down from "@/components/app_ui/App_Drop_Down";
import { MoreHorizontal, ShieldX, Trash2 } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

const More_Drop_Down = ({
  setShowBlock,
  setShowDelete,
}: {
  setShowDelete: Dispatch<SetStateAction<boolean>>;
  setShowBlock: Dispatch<SetStateAction<boolean>>;
}) => {
  const actions = [
    {
      id: "block",
      text: "Block Customer",
      icon: ShieldX,
      action: () => setShowBlock(true),
    },
    {
      id: "delete",
      text: "Delete Customer",
      icon: Trash2,
      action: () => setShowDelete(true),
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
