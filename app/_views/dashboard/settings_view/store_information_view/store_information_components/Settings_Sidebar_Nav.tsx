"use client";

import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { settingsNavItems } from "../../settings_components/settings_nav";

const Settings_Sidebar_Nav = () => {
  const pathname = usePathname();

  return (
    <div className="w-56 flex-shrink-0 hidden lg:block">
      <div className="bg-white rounded-2xl border border-[#ede8e2] shadow-sm p-3 sticky top-6">
        <Link
          href="/dashboard/settings"
          className="flex items-center gap-1.5 px-3 py-2 mb-1 text-xs text-muted-foreground hover:text-primary transition-colors"
        >
          <ChevronLeft size={13} /> Settings
        </Link>
        <div className="space-y-0.5">
          {settingsNavItems.map((item) => {
            const isActive = pathname === item.path;
            const Icon = item.icon;
            return (
              <Link
                key={item.key}
                href={item.built ? item.path : "#"}
                className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs transition-colors ${
                  isActive
                    ? "bg-primary/10 text-primary font-medium"
                    : item.built
                      ? "text-[#1e1a17] hover:bg-[#f5f2ee]"
                      : "text-muted-foreground/50 cursor-not-allowed"
                }`}
              >
                <Icon size={14} className="flex-shrink-0" />
                {item.label}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Settings_Sidebar_Nav;
