"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import App_Table from "@/components/app_ui/App_Table";
import App_Text from "@/components/app_ui/App_Text";
import { createTopPerformingColumns } from "../product_performance_data/top-performing-columns";
import { TopPerformingProduct } from "../product_performance_types";
import Product_Details_Modal from "../product_performance_modals/Product_Details_Modal";

const Top_Performing_Card = ({
  products,
}: {
  products: TopPerformingProduct[];
}) => {
  const router = useRouter();
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const columns = createTopPerformingColumns((id) => setSelectedId(id));

  return (
    <>
      <div className="bg-white rounded-2xl border border-[#ede8e2] shadow-sm p-4 space-y-2">
        <App_Text variant="cardHeading">Top Performing Products</App_Text>
        <App_Table
          columns={columns}
          data={products}
          style="mt-0"
          childRowStyle="hover:bg-[#faf9f7]"
        />
        <button
          type="button"
          onClick={() =>
            router.push("/dashboard/sales-analytics/product-performance/top")
          }
          className="text-xs text-primary hover:underline flex items-center gap-1"
        >
          View all top products →
        </button>
      </div>

      {selectedId && (
        <Product_Details_Modal
          productId={selectedId}
          onClose={() => setSelectedId(null)}
        />
      )}
    </>
  );
};

export default Top_Performing_Card;
