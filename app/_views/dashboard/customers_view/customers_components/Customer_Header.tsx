"use client";
import App_Button from "@/components/app_ui/App_Button";
import App_Input from "@/components/app_ui/App_Input";
import App_Text from "@/components/app_ui/App_Text";
import { Search, SlidersHorizontal, Upload, Plus } from "lucide-react";
import { StatCard } from "../../dashboard_view/dashboard_components/Stat_Card";
import {
  statIcons,
  iconStyles,
  statChanges,
  statDirs,
  statLabels,
} from "../cusomer_data/customer_data";
import { Skeleton_Stat_Card } from "./Customer_Skeleton";
import { useForm } from "react-hook-form";
import { useCustomerContext } from "@/app/contexts/admin/Customer_Context";
import { useRouter } from "next/navigation";

type SearchForm = { search: string };

const Customer_Header = () => {
  const { stats, isLoading } = useCustomerContext();
  const router = useRouter();
  const {
    register,
    formState: { errors },
  } = useForm<SearchForm>();

  const statValues = stats
    ? [
        {
          title: "Total Customers",
          value: stats.totalCustomers.toLocaleString(),
        },
        {
          title: "Active Customers",
          value: stats.activeCustomers.toLocaleString(),
        },
        {
          title: "Blocked Customers",
          value: stats.blockedCustomers.toLocaleString(),
        },
        { title: "New This Month", value: stats.newThisMonth.toLocaleString() },
      ]
    : [];
  return (
    <>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <App_Text variant="pageTitle">Customers</App_Text>
          <App_Text variant="pageSub">
            Manage your customers and their information.
          </App_Text>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
          <div className="hidden md:block">
            <App_Input
              name="search"
              register={register}
              errors={errors}
              placeholder="Search customers..."
              showLabel={false}
              icon1={<Search size={14} className="text-muted-foreground" />}
              containerStyle="w-56"
            />
          </div>
          <div className="flex items-center gap-2">
            <App_Button
              text="Filter"
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
              text="Add Customer"
              icon={<Plus size={13} />}
              type="button"
              onPress={() => router.push("/dashboard/customers/add-customer")}
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
          placeholder="Search by name, email or phone..."
          showLabel={false}
          icon1={<Search size={14} className="text-muted-foreground" />}
          containerStyle="w-full"
        />
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {isLoading
          ? Array.from({ length: 4 }).map((_, i) => (
              <Skeleton_Stat_Card key={i} />
            ))
          : statValues.map((stat, i) => (
              <StatCard
                key={stat.title}
                title={stat.title}
                value={stat.value}
                icon={statIcons[i]}
                iconClassName={iconStyles[i].iconClassName}
                iconWrapperClassName={iconStyles[i].iconWrapperClassName}
                change={statChanges[i]}
                changeDirection={statDirs[i]}
                changeLabel={statLabels[i]}
              />
            ))}
      </div>
    </>
  );
};

export default Customer_Header;
