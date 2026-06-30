"use client";

import { useState } from "react";
import {
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { ChevronDown, LucideIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export type MatchType = "exact" | "prefix";

export type SidebarChildItem = {
  id: number;
  label: string;
  href: string;
  icon: LucideIcon;
  match?: MatchType;
};

const App_Sidebar_Item = ({
  name,
  link,
  icon: Icon,
  match = "prefix",
  children,
}: {
  name: string;
  link: string;
  icon: LucideIcon;
  match?: MatchType;
  children?: SidebarChildItem[];
}) => {
  const pathname = usePathname();
  const isActive =
    match === "exact" ? pathname === link : pathname.startsWith(link);

  const hasChildren = !!children?.length;
  const childActive = hasChildren
    ? children!.some((child) =>
        (child.match ?? "prefix") === "exact"
          ? pathname === child.href
          : pathname.startsWith(child.href),
      )
    : false;

  // Keep the sub-menu open if a child route is currently active.
  const [isOpen, setIsOpen] = useState(childActive);

  const parentHighlighted = isActive || childActive;

  if (!hasChildren) {
    return (
      <SidebarMenuItem>
        <SidebarMenuButton
          asChild
          className={
            isActive
              ? "bg-linear-to-r from-primary to-[#A855F7] text-white hover:bg-white/25 hover:text-white rounded-lg font-medium border border-white/20 backdrop-blur-sm"
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
  }

  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        onClick={() => setIsOpen((prev) => !prev)}
        className={
          parentHighlighted
            ? "bg-linear-to-r from-primary to-[#A855F7] text-white hover:bg-white/25 hover:text-white rounded-lg font-medium border border-white/20 backdrop-blur-sm"
            : "text-white/70 hover:bg-[#5B2C6F]/60 hover:text-white rounded-lg border border-transparent"
        }
      >
        <div className="flex items-center gap-3 px-3 py-2.5 w-full cursor-pointer">
          <Icon
            size={18}
            className={parentHighlighted ? "text-white" : "text-white/60"}
          />
          <span className="text-sm flex-1 text-left">{name}</span>
          <ChevronDown
            size={16}
            className={`text-white/50 transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </div>
      </SidebarMenuButton>

      {isOpen && (
        <SidebarMenuSub>
          {children!.map((child) => {
            const childMatch = child.match ?? "prefix";
            const isChildActive =
              childMatch === "exact"
                ? pathname === child.href
                : pathname.startsWith(child.href);
            const ChildIcon = child.icon;

            return (
              <SidebarMenuSubItem key={child.id}>
                <SidebarMenuSubButton
                  asChild
                  className={
                    isChildActive
                      ? "bg-white/15 text-white font-medium rounded-lg"
                      : "text-white/60 hover:bg-[#5B2C6F]/60 hover:text-white rounded-lg"
                  }
                >
                  <Link
                    href={child.href}
                    className="flex items-center gap-2.5 px-3 py-2"
                  >
                    <ChildIcon
                      size={16}
                      className={isChildActive ? "text-white" : "text-white/50"}
                    />
                    <span className="text-sm">{child.label}</span>
                  </Link>
                </SidebarMenuSubButton>
              </SidebarMenuSubItem>
            );
          })}
        </SidebarMenuSub>
      )}
    </SidebarMenuItem>
  );
};

export default App_Sidebar_Item;

// "use client";

// import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
// import { LucideIcon } from "lucide-react";
// import Link from "next/link";
// import { usePathname } from "next/navigation";

// export type MatchType = "exact" | "prefix";

// const App_Sidebar_Item = ({
//   name,
//   link,
//   icon: Icon,
//   match = "prefix",
// }: {
//   name: string;
//   link: string;
//   icon: LucideIcon;
//   match?: MatchType;
// }) => {
//   const pathname = usePathname();
//   const isActive =
//     match === "exact" ? pathname === link : pathname.startsWith(link);

//   return (
//     <SidebarMenuItem>
//       <SidebarMenuButton
//         asChild
//         className={
//           isActive
//             ? "bg-linear-to-r from-primary to-[#A855F7] text-white text-white hover:bg-white/25 hover:text-white rounded-lg font-medium border border-white/20 backdrop-blur-sm"
//             : "text-white/70 hover:bg-[#5B2C6F]/60 hover:text-white rounded-lg border border-transparent"
//         }
//       >
//         <Link href={link} className="flex items-center gap-3 px-3 py-2.5">
//           <Icon
//             size={18}
//             className={isActive ? "text-white" : "text-white/60"}
//           />
//           <span className="text-sm">{name}</span>
//         </Link>
//       </SidebarMenuButton>
//     </SidebarMenuItem>
//   );
// };

// export default App_Sidebar_Item;
