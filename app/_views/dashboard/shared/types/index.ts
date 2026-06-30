import { LucideIcon } from "lucide-react";

export type StatCardProps = {
  title: string;
  value: string | number;
  icon: LucideIcon;
  iconClassName?: string;
  iconWrapperClassName?: string;
  change?: string;
  changeDirection?: "up" | "down";
  changeLabel?: string;
};
