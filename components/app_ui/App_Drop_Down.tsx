import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenu,
  DropdownMenuSeparator,
} from "../ui/dropdown-menu";
import { IApp_Drop_Down } from "@/types";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

const App_Drop_Down = ({
  content,
  trigger,
}: {
  content: IApp_Drop_Down[];
  trigger?: ReactNode;
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {trigger ? (
          trigger
        ) : (
          <button
            type="button"
            className="p-1.5 rounded  hover:bg-[#f5f2ee] text-muted-foreground transition-colors"
          >
            <MoreHorizontal size={15} />
          </button>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48 bg-white">
        {content.map((item, index) => (
          <div key={index}>
            {item.separatorBefore && <DropdownMenuSeparator />}
            <DropdownMenuItem
              className={cn("gap-2 cursor-pointer text-xs", item.className)}
              onClick={item.action}
            >
              <item.icon size={13} /> {item.text}
            </DropdownMenuItem>
          </div>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default App_Drop_Down;
