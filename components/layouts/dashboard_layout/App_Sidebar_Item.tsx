"use client";

import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { LucideIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export type MatchType = "exact" | "prefix";

const App_Sidebar_Item = ({
  name,
  link,
  icon: Icon,
  match = "prefix",
}: {
  name: string;
  link: string;
  icon: LucideIcon;
  match?: MatchType;
}) => {
  const pathname = usePathname();
  const isActive =
    match === "exact" ? pathname === link : pathname.startsWith(link);

  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        asChild
        className={
          isActive
            ? "bg-linear-to-r from-primary to-[#A855F7] text-white text-white hover:bg-white/25 hover:text-white rounded-lg font-medium border border-white/20 backdrop-blur-sm"
            : "text-white/70 hover:bg-[#5B2C6F]/60 hover:text-white rounded-lg border border-transparent"
        }
      >
        <Link href={link} className="flex items-center gap-3 px-3 py-2.5">
          <Icon
            size={18}
            className={isActive ? "text-white" : "text-white/60"}
          />
          <span className="text-sm">{name}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};

export default App_Sidebar_Item;
