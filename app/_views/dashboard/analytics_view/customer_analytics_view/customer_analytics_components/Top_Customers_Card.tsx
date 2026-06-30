"use client";

import App_Table from "@/components/app_ui/App_Table";
import App_Text from "@/components/app_ui/App_Text";
import { useRouter } from "next/navigation";
import { topCustomersColumns } from "../customer_analytics_data/top-customers-columns";
import { TopCustomer } from "../customer_analytics_types";

const Top_Customers_Card = ({ customers }: { customers: TopCustomer[] }) => {
  const router = useRouter();

  return (
    <div className="bg-white rounded-2xl border border-[#ede8e2] shadow-sm p-4 space-y-2">
      <App_Text variant="cardHeading">Top Customers</App_Text>
      <App_Table
        columns={topCustomersColumns}
        data={customers}
        style="mt-0"
        childRowStyle="hover:bg-[#faf9f7] cursor-pointer"
        onRowClick={(row) => router.push(`/dashboard/customers/${row.id}`)}
      />
      <button
        type="button"
        onClick={() => router.push("/dashboard/customers")}
        className="text-xs text-primary hover:underline flex items-center gap-1"
      >
        View all customers →
      </button>
    </div>
  );
};

export default Top_Customers_Card;
