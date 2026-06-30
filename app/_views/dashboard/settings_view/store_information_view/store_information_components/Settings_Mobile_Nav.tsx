"use client";

import { useRouter, usePathname } from "next/navigation";
import { settingsNavItems } from "../../settings_components/settings_nav";

const Settings_Mobile_Nav = () => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="lg:hidden flex items-center gap-2 overflow-x-auto scrollbar-none pb-2">
      {settingsNavItems.map((item) => {
        const isActive = pathname === item.path;
        return (
          <button
            key={item.key}
            type="button"
            onClick={() => item.built && router.push(item.path)}
            disabled={!item.built}
            className={`flex-shrink-0 text-xs px-3 py-2 rounded-lg whitespace-nowrap transition-colors ${
              isActive
                ? "bg-primary text-white"
                : item.built
                  ? "border border-[#e0dbd4] bg-white text-[#1e1a17]"
                  : "border border-[#ede8e2] bg-[#f5f2ee] text-muted-foreground/50"
            }`}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
};

export default Settings_Mobile_Nav;
