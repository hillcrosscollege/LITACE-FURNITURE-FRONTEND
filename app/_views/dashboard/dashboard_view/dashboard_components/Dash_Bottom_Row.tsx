"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import App_Text from "@/components/app_ui/App_Text";
import App_Button from "@/components/app_ui/App_Button";
import { SkeletonBox } from "../../customers_view/customers_components/Customer_Skeleton";
import { TopProduct, LowStockItem } from "../dash_types";
import Dash_Top_Selling from "./Dash_Top_Selling";
import { quickActions } from "../dash_data/dash_data";
import { Table_Skeleton, Stock_Skeleton } from "./Dasbbaord_Skeletons";

type Props = {
  topProducts?: TopProduct[];
  lowStock?: LowStockItem[];
  isLoading: boolean;
};

const Dash_Bottom_Row = ({ topProducts, lowStock, isLoading }: Props) => {
  const router = useRouter();

  if (isLoading)
    return (
      <div className="flex gap-4">
        <Table_Skeleton />
        <Stock_Skeleton />
        <div className="bg-white rounded-2xl border border-[#ede8e2] p-4 shadow-sm w-64">
          <SkeletonBox className="h-4 w-24 mb-3" />
          {Array.from({ length: 4 }).map((_, i) => (
            <SkeletonBox key={i} className="h-14 w-full rounded-lg mb-2" />
          ))}
        </div>
      </div>
    );

  return (
    <div className="flex flex-col lg:flex gap-4">
      {/* Top Selling Products */}
      <Dash_Top_Selling />

      <div className="flex flex-col lg:flex-row gap-4">
        {/* Low Stock Alert */}
        <div className="bg-white rounded-2xl border border-[#ede8e2] p-4 shadow-sm flex-1">
          <div className="flex items-center justify-between mb-3">
            <App_Text variant="cardHeading">Low Stock Alert</App_Text>
            <button
              type="button"
              onClick={() => router.push("/dashboard/inventory")}
              className="text-xs text-primary hover:underline"
            >
              View All
            </button>
          </div>
          <div className="flex flex-col gap-3">
            {lowStock?.map((item) => (
              <div key={item.product} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#f0e8df] shrink-0 overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.product}
                    width={40}
                    height={40}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <App_Text
                    variant="tableCell"
                    className="font-medium truncate"
                  >
                    {item.product}
                  </App_Text>
                  <App_Text variant="tableCellMuted" className="text-[#c0392b]">
                    Stock: {item.stock}
                  </App_Text>
                </div>
                <App_Button
                  text="Restock"
                  type="button"
                  onPress={() => router.push("/dashboard/inventory")}
                  btnStyle="text-xs border border-[#d0c8c0] rounded-lg px-3 py-1.5 h-auto bg-white text-[#555] hover:bg-[#f5f2ee] transition-colors flex-shrink-0"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl border border-[#ede8e2] p-4 shadow-sm flex-1">
          <App_Text variant="cardHeading" className="mb-3">
            Quick Actions
          </App_Text>
          <div className="flex flex-col gap-2">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <button
                  key={action.title}
                  type="button"
                  onClick={() => router.push(action.path)}
                  className="flex items-center gap-3 p-2.5 rounded-lg bg-[#f9f8f6] hover:bg-[#f2ede7] cursor-pointer transition-colors text-left group"
                >
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${action.iconWrapperClassName}`}
                  >
                    <Icon size={16} className={action.iconClassName} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <App_Text
                      variant="tableCell"
                      className="font-medium group-hover:text-primary transition-colors"
                    >
                      {action.title}
                    </App_Text>
                    <App_Text variant="tableCellMuted" className="truncate">
                      {action.description}
                    </App_Text>
                  </div>
                  <ChevronRight
                    size={14}
                    className="text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all shrink-0"
                  />
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dash_Bottom_Row;
