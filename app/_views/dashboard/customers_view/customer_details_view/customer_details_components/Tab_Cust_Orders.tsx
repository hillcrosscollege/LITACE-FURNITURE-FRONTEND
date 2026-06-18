"use client";

import { useForm } from "react-hook-form";
import { Search, SlidersHorizontal } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import App_Button from "@/components/app_ui/App_Button";
import App_Input from "@/components/app_ui/App_Input";
import App_Paginate from "@/components/app_ui/App_Paginate";
import App_Table from "@/components/app_ui/App_Table";
import App_Text from "@/components/app_ui/App_Text";
import { CustomerDetail } from "../../customers_types";
import { customer_order_col } from "../customer_detail_data/Customer_Order";

const Tab_Cust_Orders = ({ customer }: { customer: CustomerDetail }) => {
  const [page, setPage] = useState(1);
  const {
    register,
    formState: { errors },
  } = useForm<{ search: string }>();
  const router = useRouter();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <App_Text variant="cardHeading">Customer Orders</App_Text>
        <div className="flex items-center gap-2">
          <App_Input
            name="search"
            register={register}
            errors={errors}
            placeholder="Search orders..."
            showLabel={false}
            icon1={<Search size={13} className="text-muted-foreground" />}
            containerStyle="w-44"
          />
          <App_Button
            text="Filter"
            icon={<SlidersHorizontal size={13} />}
            type="button"
            btnStyle="text-xs border border-[#e0dbd4] bg-white text-[#1e1a17] hover:bg-[#f5f2ee] rounded-lg px-3 py-2 h-auto"
          />
        </div>
      </div>

      <div className="border border-[#ede8e2] rounded-2xl overflow-hidden">
        <App_Table
          columns={customer_order_col}
          data={customer.orders}
          style="mt-0"
          childRowStyle="hover:bg-[#faf9f7]"
        />
      </div>

      <div className="flex items-center justify-between">
        <App_Text variant="tableCellMuted">
          Showing 1 to {customer.orders.length} of {customer.orders.length}{" "}
          orders
        </App_Text>
        <App_Paginate
          page={page}
          setPage={setPage}
          totalPages={2}
          paginateStyle="mt-0"
        />
      </div>
    </div>
  );
};

export default Tab_Cust_Orders;
