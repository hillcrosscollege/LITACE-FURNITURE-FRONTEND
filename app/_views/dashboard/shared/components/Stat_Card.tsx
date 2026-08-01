import { TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { StatCardProps } from "../types";
import App_Text from "@/components/app_ui/App_Text";

export function StatCard({
  title,
  value,
  icon: Icon,
  iconClassName,
  iconWrapperClassName,
  change,
  changeDirection = "up",
  changeLabel = "vs last month",
}: StatCardProps) {
  const isUp = changeDirection === "up";

  return (
    <div className="bg-white rounded-2xl border border-[#ede8e2] p-4 shadow-sm">
      <div className="flex items-start justify-between">
        <App_Text children={title} variant="sectionLabel" />
        <div
          className={cn(
            "p-2 rounded-lg flex items-center justify-center",
            iconWrapperClassName,
          )}
        >
          <Icon size={18} className={iconClassName} />
        </div>
      </div>

      <App_Text children={value} variant="sectionTitle" className="font-body" />

      {/* <h2 className="text-2xl font-semibold  text-[text]">{value}</h2> */}

      {change && (
        <div
          className={cn(
            "flex items-center gap-1 mt-2 text-xs font-medium",
            isUp ? "text-[#2e7d52]" : "text-[#c0392b]",
          )}
        >
          {isUp ? <TrendingUp size={13} /> : <TrendingDown size={13} />}
          <span>
            {change} {changeLabel}
          </span>
        </div>
      )}
    </div>
  );
}
