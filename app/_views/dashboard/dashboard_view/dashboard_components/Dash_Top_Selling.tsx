import App_Table from "@/components/app_ui/App_Table";
import App_Text from "@/components/app_ui/App_Text";
import { topProducts, topProductsColumns } from "../dash_data/Top_Selling";
import { useRouter } from "next/navigation";

const Dash_Top_Selling = () => {
  const router = useRouter();
  return (
    <div className="flex-1 bg-white rounded-2xl border border-[#ede8e2] p-4 shadow-sm">
      <div className="flex items-center justify-between mb-2">
        <App_Text variant="cardHeading">Top Selling Products</App_Text>
        <button
          type="button"
          onClick={() =>
            router.push("/dashboard/sales-analytics/product-performance")
          }
          className="text-xs text-primary hover:underline"
        >
          View All
        </button>
      </div>
      <App_Table
        columns={topProductsColumns}
        data={topProducts ?? []}
        style="mt-0"
        childRowStyle="border-b border-[#f5f2ee] last:border-0 hover:bg-[#faf9f7]"
      />
    </div>
  );
};

export default Dash_Top_Selling;
