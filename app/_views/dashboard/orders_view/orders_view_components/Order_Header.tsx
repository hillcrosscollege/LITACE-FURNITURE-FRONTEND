"use client";
import App_Button from "@/components/app_ui/App_Button";
import App_Input from "@/components/app_ui/App_Input";
import App_Text from "@/components/app_ui/App_Text";
import {
  Search,
  SlidersHorizontal,
  Upload,
  Plus,
  CheckCircle,
  Clock,
  Loader,
  ShoppingBag,
  Truck,
  XCircle,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { StatCard } from "../../dashboard_view/dashboard_components/Stat_Card";
import { useForm } from "react-hook-form";
import { iconStyles } from "../../customers_view/cusomer_data/customer_data";
import { Skeleton_Order_Stat } from "./Order_Skeleton";
import { useOrder } from "../order_hooks/useOrders";

type SearchForm = { search: string };
const statIcons = [ShoppingBag, Clock, Loader, Truck, CheckCircle, XCircle];

const Order_Header = () => {
  const { stats, isLoading } = useOrder();
  const {
    register,
    formState: { errors },
  } = useForm<SearchForm>();
  const router = useRouter();
  return (
    <>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <App_Text variant="pageTitle">Orders</App_Text>
          <App_Text variant="pageSub">
            Manage and track all customer orders.
          </App_Text>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
          <div className="hidden md:block">
            <App_Input
              name="search"
              register={register}
              errors={errors}
              placeholder="Search orders..."
              showLabel={false}
              icon1={<Search size={14} className="text-muted-foreground" />}
              containerStyle="w-56"
            />
          </div>
          <div className="flex items-center gap-2">
            <App_Button
              text="Filters"
              icon={<SlidersHorizontal size={13} />}
              type="button"
              btnStyle="text-xs border border-[#e0dbd4] bg-white text-[#1e1a17] hover:bg-[#f5f2ee] rounded-lg px-3 py-2 h-auto"
            />
            <App_Button
              text="Export"
              icon={<Upload size={13} />}
              type="button"
              btnStyle="text-xs border border-[#e0dbd4] bg-white text-[#1e1a17] hover:bg-[#f5f2ee] rounded-lg px-3 py-2 h-auto"
            />
            <App_Button
              text="Create Order"
              icon={<Plus size={13} />}
              type="button"
              onPress={() => router.push("/dashboard/orders/create")}
              btnStyle="text-xs bg-primary text-white hover:bg-primary/90 rounded-lg px-3 py-2 h-auto"
            />
          </div>
        </div>
      </div>

      {/* Mobile search */}
      <div className="md:hidden">
        <App_Input
          name="search"
          register={register}
          errors={errors}
          placeholder="Search orders..."
          showLabel={false}
          icon1={<Search size={14} className="text-muted-foreground" />}
          containerStyle="w-full"
        />
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
        {isLoading
          ? Array.from({ length: 6 }).map((_, i) => (
              <Skeleton_Order_Stat key={i} />
            ))
          : stats.map((stat, i) => (
              <StatCard
                key={stat.title}
                title={stat.title}
                value={stat.value}
                icon={statIcons[i]}
                iconClassName={iconStyles[i]?.iconClassName}
                iconWrapperClassName={iconStyles[i]?.iconWrapperClassName}
                change={stat.change}
                changeDirection={stat.changeDirection}
                changeLabel="vs last month"
              />
            ))}
      </div>
    </>
  );
};

export default Order_Header;
