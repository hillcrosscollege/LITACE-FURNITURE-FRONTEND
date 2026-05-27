import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

type StatCardProps = {
  title: string;
  value: string | number;
  icon: LucideIcon;
  iconClassName?: string;
  iconWrapperClassName?: string;
  change?: string;
  changeDirection?: "up" | "down";
  changeLabel?: string;
};

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
        <p className="text-xs text-muted-foreground">{title}</p>
        <div
          className={cn(
            "p-2 rounded-lg flex items-center justify-center",
            iconWrapperClassName,
          )}
        >
          <Icon size={18} className={iconClassName} />
        </div>
      </div>

      <h2 className="text-2xl font-semibold mt-3 text-[#1e1a17]">{value}</h2>

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
