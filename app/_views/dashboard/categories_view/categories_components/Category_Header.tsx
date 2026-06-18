"use client";
import App_Button from "@/components/app_ui/App_Button";
import App_Input from "@/components/app_ui/App_Input";
import App_Text from "@/components/app_ui/App_Text";
import { Search, SlidersHorizontal, Plus } from "lucide-react";
import { statIcons } from "../../customers_view/cusomer_data/customer_data";
import { Skeleton_Stat_Card } from "../../customers_view/customers_components/Customer_Skeleton";
import { StatCard } from "../../dashboard_view/dashboard_components/Stat_Card";
import { categoryListStats } from "../categories_data/categories_data";
import { useForm } from "react-hook-form";
import { useCategoryContext } from "@/app/contexts/admin/Category_Context";
import Add_Category_Modal from "../categories_modals/Add_Category_Modal";

type SearchForm = { search: string };
const Category_Header = () => {
  const {
    register,
    formState: { errors },
  } = useForm<SearchForm>();
  const { data, isLoading, isError, showAdd, setShowAdd } =
    useCategoryContext();
  return (
    <>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <App_Text variant="pageTitle">Categories</App_Text>
          <App_Text variant="pageSub">
            Organize your products into categories.
          </App_Text>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
          <div className="hidden md:block">
            <App_Input
              name="search"
              register={register}
              errors={errors}
              placeholder="Search categories..."
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
              text="Add Category"
              icon={<Plus size={13} />}
              type="button"
              onPress={() => setShowAdd(true)}
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
          placeholder="Search categories..."
          showLabel={false}
          icon1={<Search size={14} className="text-muted-foreground" />}
          containerStyle="w-full"
        />
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {isLoading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <Skeleton_Stat_Card key={i} />
          ))
        ) : (
          <>
            {categoryListStats.map((stat, i) => (
              <StatCard
                key={stat.title}
                title={stat.title}
                value={stat.value}
                icon={statIcons[i]}
                iconClassName={stat.iconClassName}
                iconWrapperClassName={stat.iconWrapperClassName}
                // subLabel={stat.subLabel}
              />
            ))}
          </>
        )}
      </div>

      {showAdd && <Add_Category_Modal />}
    </>
  );
};

export default Category_Header;
