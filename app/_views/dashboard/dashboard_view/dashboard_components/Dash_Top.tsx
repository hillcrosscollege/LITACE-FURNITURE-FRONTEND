"use client";

import App_Text from "@/components/app_ui/App_Text";
import { DashboardStats } from "../dash_types";
import { StatCard } from "./Stat_Card";
import { Stat_Skeleton } from "./Dasbbaord_Skeletons";

type Props = { stats?: DashboardStats[]; isLoading: boolean };

const Dash_Top = ({ stats, isLoading }: Props) => (
  <div className="bg-linear-to-b from-[#1F1033] to-[#2E1246] border-white/10 p-5 rounded-2xl mb-6">
    <div className="mb-4">
      <App_Text variant="pageTitle" className="text-white">
        Welcome back, Admin!
      </App_Text>
      <App_Text variant="pageSub" className="text-white/60">
        Here's what's happening in your store today.
      </App_Text>
    </div>
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
      {isLoading || !stats
        ? Array.from({ length: 5 }).map((_, i) => <Stat_Skeleton key={i} />)
        : stats.map((stat) => <StatCard key={stat.title} {...stat} />)}
    </div>
  </div>
);

export default Dash_Top;
