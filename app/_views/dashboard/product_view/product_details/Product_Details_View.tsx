// app/dashboard/products/[id]/page.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronRight, Pencil, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { productDetail, productTabs } from "./product_detail_data";
import Tab_Overview from "./product_detail_components/Tab_Overview";
import App_Text from "@/components/app_ui/App_Text";
import App_Button from "@/components/app_ui/App_Button";
import Product_Quick_Actions from "./product_detail_components/Product_Quick_Actions";
import Tab_Variants from "./product_detail_components/Tab_Variants";
import Tab_Inventory from "./product_detail_components/Tab_Inventory";
import Tab_Media from "./product_detail_components/Tab_Media";
import Tab_Reviews from "./product_detail_components/Tab_Review";

const THUMBNAIL_VISIBLE = 3;

const Product_Details_View = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("Overview");
  const [activeImage, setActiveImage] = useState(0);
  const [showDelete, setShowDelete] = useState(false);

  const { name, sku, category, status, images, stats } = productDetail;
  const visibleThumbs = images.slice(0, THUMBNAIL_VISIBLE);
  const overflowCount = images.length - THUMBNAIL_VISIBLE;

  const handleDelete = (keepHistory: boolean) => {
    console.log("Delete product, keepHistory:", keepHistory);
    setShowDelete(false);
    router.push("/dashboard/products");
  };

  const renderTab = () => {
    switch (activeTab) {
      case "Overview":
        return <Tab_Overview />;
      case "Variants":
        return <Tab_Variants />;
      case "Inventory":
        return <Tab_Inventory />;
      case "Media":
        return <Tab_Media />;
      case "Reviews":
        return <Tab_Reviews />;
      default:
        // return <Tab_Placeholder label={activeTab} />;
        return <></>;
    }
  };

  return (
    <>
      <div className="space-y-4">
        {/* Breadcrumb */}
        <div className="flex items-center gap-1.5">
          <Link href="/dashboard/products">
            <App_Text
              variant="tableCellMuted"
              className="hover:text-primary cursor-pointer transition-colors"
            >
              Products
            </App_Text>
          </Link>
          <ChevronRight size={13} className="text-muted-foreground" />
          <App_Text variant="tableCellMuted" className="text-[text]">
            {name}
          </App_Text>
        </div>

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3 flex-wrap">
            <App_Text variant="pageTitle">{name}</App_Text>
            <span className="text-xs px-2.5 py-1 rounded-full font-medium bg-[#e8fdf0] text-[#157a45]">
              {status}
            </span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <App_Button
              text="Edit Product"
              icon={<Pencil size={13} />}
              type="button"
              onPress={() =>
                router.push(`/dashboard/products/${productDetail.id}/edit`)
              }
              btnStyle="text-xs border border-[#e0dbd4] bg-white text-[text] hover:bg-[#f5f2ee] rounded-lg px-3 py-2 h-auto"
            />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  type="button"
                  className="p-2 rounded-lg border border-[#e0dbd4] hover:bg-[#f5f2ee] text-muted-foreground transition-colors"
                >
                  <MoreHorizontal size={15} />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-44">
                <DropdownMenuItem className="gap-2 cursor-pointer text-xs">
                  Duplicate Product
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="gap-2 cursor-pointer text-xs text-[#c0392b] focus:text-[#c0392b] focus:bg-[#fdecea]"
                  onClick={() => setShowDelete(true)}
                >
                  Delete Product
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="flex flex-col xl:flex-row gap-6 items-start">
          {/* Main content */}
          <div className="flex-1 min-w-0 space-y-4">
            {/* Image + stats */}
            <div className="bg-white rounded-2xl border border-[#ede8e2] shadow-sm p-4">
              <div className="flex flex-col sm:flex-row gap-4">
                {/* Main image */}
                <div className="w-full sm:w-48 h-48 rounded-xl bg-[#f0e8df] overflow-hidden shrink-0">
                  <Image
                    src={images[activeImage]}
                    alt={name}
                    width={192}
                    height={192}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 min-w-0 space-y-4">
                  {/* Meta */}
                  <div>
                    <App_Text variant="tableCellMuted">
                      SKU: {sku} &nbsp;·&nbsp; Category: {category}
                    </App_Text>
                    <App_Text variant="tableCellMuted" className="mt-1">
                      {productDetail.description}
                    </App_Text>
                  </div>

                  {/* Thumbnails */}
                  <div className="flex items-center gap-2">
                    {visibleThumbs.map((img, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setActiveImage(i)}
                        className={`w-14 h-14 rounded-lg overflow-hidden border-2 transition-all shrink-0 ${
                          activeImage === i
                            ? "border-primary"
                            : "border-transparent hover:border-primary/30"
                        }`}
                      >
                        <Image
                          src={img}
                          alt={`View ${i + 1}`}
                          width={56}
                          height={56}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}

                    {overflowCount > 0 && (
                      <div className="w-14 h-14 rounded-lg bg-[#f0e8df] border-2 border-transparent flex items-center justify-center shrink-0">
                        <App_Text
                          variant="tableCell"
                          className="font-semibold text-[#a0522d]"
                        >
                          +{overflowCount}
                        </App_Text>
                      </div>
                    )}
                  </div>

                  {/* Stats row */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {Object.entries(stats).map(([key, stat]) => (
                      <div
                        key={key}
                        className="bg-[#faf9f7] rounded-xl p-3 border border-[#ede8e2]"
                      >
                        <App_Text variant="tableCellMuted" className="mb-1">
                          {stat.label}
                        </App_Text>
                        <App_Text variant="tableCell" className="font-semibold">
                          {stat.value}
                        </App_Text>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-2xl border border-[#ede8e2] shadow-sm overflow-hidden">
              <div className="flex items-center border-b border-[#ede8e2] overflow-x-auto scrollbar-none px-4">
                {productTabs.map((tab) => (
                  <button
                    key={tab.label}
                    type="button"
                    onClick={() => setActiveTab(tab.label)}
                    className={`flex items-center gap-1.5 px-3 py-3.5 whitespace-nowrap border-b-2 transition-colors ${
                      activeTab === tab.label
                        ? "border-primary"
                        : "border-transparent"
                    }`}
                  >
                    <App_Text
                      variant="sectionLabel"
                      className={
                        activeTab === tab.label
                          ? "text-primary font-medium"
                          : "hover:text-[text]"
                      }
                    >
                      {tab.label}
                    </App_Text>
                    {tab.count !== undefined && (
                      <span
                        className={`px-1.5 py-0.5 rounded text-[10px] ${
                          activeTab === tab.label
                            ? "bg-primary/10 text-primary"
                            : "bg-[#f5f2ee] text-muted-foreground"
                        }`}
                      >
                        {tab.count}
                      </span>
                    )}
                  </button>
                ))}
              </div>

              <div className="p-4">{renderTab()}</div>
            </div>
          </div>

          {/* Quick Actions sidebar */}
          <div className="w-full xl:w-64 shrink-0">
            <Product_Quick_Actions onDelete={() => setShowDelete(true)} />
          </div>
        </div>
      </div>

      {/* Delete modal */}
      {/* {showDelete && (
        <Product_Delete_Modal
          productName={name}
          onClose={() => setShowDelete(false)}
          onConfirm={handleDelete}
        />
      )} */}
    </>
  );
};

export default Product_Details_View;
