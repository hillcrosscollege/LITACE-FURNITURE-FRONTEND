"use client";

import App_Table from "@/components/app_ui/App_Table";
import App_Text from "@/components/app_ui/App_Text";
import { useRouter } from "next/navigation";
import { lowPerformingColumns } from "../product_performance_data/low-performing-columns";
import { LowPerformingProduct } from "../product_performance_types";

const Low_Performing_Card = ({
  products,
}: {
  products: LowPerformingProduct[];
}) => {
  const router = useRouter();

  return (
    <div className="bg-white rounded-2xl border border-[#ede8e2] shadow-sm p-4 space-y-2">
      <App_Text variant="cardHeading">Low Performing Products</App_Text>
      <App_Table
        columns={lowPerformingColumns}
        data={products}
        style="mt-0"
        childRowStyle="hover:bg-[#faf9f7]"
      />
      <button
        type="button"
        onClick={() =>
          router.push("/dashboard/sales-analytics/product-performance/low")
        }
        className="text-xs text-primary hover:underline flex items-center gap-1"
      >
        View all low performing products →
      </button>
    </div>
  );
};

export default Low_Performing_Card;
