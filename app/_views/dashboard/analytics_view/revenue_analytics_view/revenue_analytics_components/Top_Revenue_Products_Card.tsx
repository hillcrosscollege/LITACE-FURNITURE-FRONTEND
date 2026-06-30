"use client";

import App_Table from "@/components/app_ui/App_Table";
import App_Text from "@/components/app_ui/App_Text";
import { useRouter } from "next/navigation";
import { topProductsColumns } from "../revenue_analytics_data/top-products-col";
import { TopRevenueProduct } from "../revenue_analytics_types";

const Top_Revenue_Products_Card = ({
  products,
}: {
  products: TopRevenueProduct[];
}) => {
  const router = useRouter();

  return (
    <div className="bg-white rounded-2xl border border-[#ede8e2] shadow-sm p-4 space-y-2">
      <App_Text variant="cardHeading">Top Revenue Products</App_Text>
      <App_Table
        columns={topProductsColumns}
        data={products}
        style="mt-0"
        childRowStyle="hover:bg-[#faf9f7] cursor-pointer"
        onRowClick={(row) =>
          router.push(
            `/dashboard/sales-analytics/revenue-analytics/products/${row.id}`,
          )
        }
      />
      <button
        type="button"
        onClick={() =>
          router.push("/dashboard/sales-analytics/revenue-analytics/products")
        }
        className="text-xs text-primary hover:underline flex items-center gap-1"
      >
        View all products →
      </button>
    </div>
  );
};

export default Top_Revenue_Products_Card;
