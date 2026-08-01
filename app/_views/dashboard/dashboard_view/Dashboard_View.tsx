"use client";

import Dash_Top from "./dashboard_components/Dash_Top";
import Dash_Section_Two from "./dashboard_components/Dash_Section_Two";
import Dash_Bottom_Row from "./dashboard_components/Dash_Bottom_Row";
import App_Text from "@/components/app_ui/App_Text";
import { useDashboard } from "./dashbaord_hooks/useDashboardQueries";

const Dashboard_View = () => {
  const { data, isLoading, isError } = useDashboard();

  if (isError)
    return (
      <div className="p-6 flex items-center justify-center">
        <App_Text variant="tableCellMuted" className="text-[#c0392b]">
          Failed to load dashboard. Please try again.
        </App_Text>
      </div>
    );

  return (
    <div className="">
      <Dash_Top stats={data?.stats} isLoading={isLoading} />
      <Dash_Section_Two
        salesData={data?.salesData}
        recentOrders={data?.recentOrders}
        isLoading={isLoading}
      />
      <Dash_Bottom_Row
        topProducts={data?.topProducts}
        lowStock={data?.lowStock}
        isLoading={isLoading}
      />
    </div>
  );
};

export default Dashboard_View;
