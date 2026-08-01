"use client";
import App_Button from "@/components/app_ui/App_Button";
import App_Input from "@/components/app_ui/App_Input";
import App_Text from "@/components/app_ui/App_Text";
import App_Double_Text from "@/components/shared/App_Double_Text";
import {
  Search,
  SlidersHorizontal,
  Plus,
  DollarSign,
  Package,
  PackageCheck,
  PackageMinus,
  PackageX,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { StatCard } from "../../dashboard_view/dashboard_components/Stat_Card";
import { productListStats } from "../products_data/product_types";

const statIcons = [Package, PackageCheck, PackageMinus, PackageX, DollarSign];
const Product_Header = ({ register, errors }: any) => {
  const router = useRouter();
  return (
    <div className="bg-linear-to-b from-[#1F1033] to-[#2E1246] border-white/10 p-5 rounded-2xl mb-6 grid gap-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <App_Double_Text
            header={{
              children: "Products",
              variant: "pageTitle",
            }}
            para={{
              children: "Manage your store products, stock and pricing.",
              variant: "pageSub",
            }}
          />
          <App_Text variant="pageTitle" className="text-white">
            Products
          </App_Text>
          <App_Text variant="pageSub" className="text-white">
            Manage your store products, stock and pricing.
          </App_Text>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
          <div className="hidden md:block">
            <App_Input
              name="search"
              register={register}
              errors={errors}
              placeholder="Search products..."
              showLabel={false}
              icon1={<Search size={14} className="text-muted-foreground" />}
              containerStyle="w-56"
            />
          </div>
          <div className="flex items-center gap-2">
            <App_Button
              text="Filters"
              icon={<SlidersHorizontal size={13} />}
              btnStyle="text-xs border border-[#e0dbd4] bg-white text-[text] hover:bg-[#f5f2ee] rounded-lg px-3 py-2 h-auto"
            />
            <App_Button
              text="Add Product"
              icon={<Plus size={13} />}
              btnStyle="text-xs bg-primary text-white hover:bg-primary/90 rounded-lg px-3 py-2 h-auto"
              onPress={() => router.push("/dashboard/products/add")}
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
          placeholder="Search products..."
          showLabel={false}
          icon1={<Search size={14} className="text-muted-foreground" />}
          containerStyle="w-full"
        />
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4">
        {productListStats.map((stat, i) => (
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
      </div>
    </div>
  );
};

export default Product_Header;
