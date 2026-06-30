"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { ChevronRight, Pencil, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import App_Button from "@/components/app_ui/App_Button";
import App_Text from "@/components/app_ui/App_Text";
import { Skeleton_Inventory_Detail } from "../inventory_components/Inventory_Skeleton";
import { inventoryStatusStyles } from "../inventory_data/inventory_data";
import { useInventoryProduct } from "../inventory_hooks/useInventoryQueries";
import Adjust_Stock_Modal from "../inventory_modals/Adjust_Stock_Modal";
import Print_Barcode_Modal from "../inventory_modals/Print_Barcode_Modal";
import Tab_Inv_Locations from "./inventory_detail_components/Tab_Inv_Locations";
import Tab_Inv_LowStock from "./inventory_detail_components/Tab_Inv_LowStock";
import Tab_Inv_Overview from "./inventory_detail_components/Tab_Inv_Overview";
import Tab_Inv_StockMovement from "./inventory_detail_components/Tab_Inv_StockMovement";

const detailTabs = [
  { label: "Overview" },
  { label: "Stock Movement" },
  { label: "Locations" },
  { label: "Variants", count: 3 },
  { label: "Suppliers" },
  { label: "Purchase History" },
  { label: "Sales" },
  { label: "Activity" },
];

const THUMBNAIL_VISIBLE = 3;

const InventoryDetailPage = () => {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [activeTab, setActiveTab] = useState("Overview");
  const [activeImage, setActiveImage] = useState(0);
  const [showAdjust, setShowAdjust] = useState(false);
  const [showBarcode, setShowBarcode] = useState(false);

  const { data: product, isLoading, isError } = useInventoryProduct(id);

  const visibleThumbs = product?.images.slice(0, THUMBNAIL_VISIBLE) ?? [];
  const overflowCount = (product?.images.length ?? 0) - THUMBNAIL_VISIBLE;

  const renderTab = () => {
    if (!product) return null;
    switch (activeTab) {
      case "Overview":
        return (
          <Tab_Inv_Overview
            product={product}
            onAdjust={() => setShowAdjust(true)}
            onBarcode={() => setShowBarcode(true)}
          />
        );
      case "Stock Movement":
        return <Tab_Inv_StockMovement productId={id} />;
      case "Locations":
        return <Tab_Inv_Locations />;
      case "Low Stock":
        return <Tab_Inv_LowStock />;
      default:
        return (
          <div className="flex items-center justify-center py-20">
            <App_Text variant="tableCellMuted">
              {activeTab} coming soon.
            </App_Text>
          </div>
        );
    }
  };

  if (isError)
    return (
      <div className="p-6 flex items-center justify-center">
        <App_Text variant="tableCellMuted" className="text-[#c0392b]">
          Failed to load product. Please try again.
        </App_Text>
      </div>
    );

  return (
    <>
      <div className="p-4 md:p-6 space-y-4">
        {/* Breadcrumb */}
        <div className="flex items-center gap-1.5">
          <Link href="/dashboard/inventory">
            <App_Text
              variant="tableCellMuted"
              className="hover:text-primary cursor-pointer transition-colors"
            >
              Inventory
            </App_Text>
          </Link>
          <ChevronRight size={13} className="text-muted-foreground" />
          <App_Text variant="tableCellMuted" className="text-[#1e1a17]">
            {isLoading ? "Loading..." : product?.name}
          </App_Text>
        </div>

        {isLoading ? (
          <Skeleton_Inventory_Detail />
        ) : (
          product && (
            <>
              {/* Product header card */}
              <div className="bg-white rounded-2xl border border-[#ede8e2] shadow-sm p-5">
                <div className="flex flex-col sm:flex-row gap-5">
                  {/* Image */}
                  <div className="flex flex-col gap-3 shrink-0">
                    <div className="w-full sm:w-52 h-48 rounded-xl bg-[#f0e8df] overflow-hidden">
                      <Image
                        src={product.images[activeImage] ?? product.image}
                        alt={product.name}
                        width={208}
                        height={192}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {/* Thumbnails */}
                    <div className="flex gap-2">
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
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0 space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <App_Text variant="pageTitle">
                            {product.name}
                          </App_Text>
                          <span
                            className={`text-xs px-2.5 py-1 rounded-full font-medium ${inventoryStatusStyles[product.status]}`}
                          >
                            {product.status}
                          </span>
                        </div>
                        <App_Text variant="tableCellMuted" className="mt-1">
                          SKU: {product.sku} · Category: {product.category} ·
                          Brand: {product.brand}
                        </App_Text>
                        <App_Text
                          variant="statValue"
                          className="text-2xl text-primary mt-2"
                        >
                          R {product.sellingPrice.toLocaleString()}
                        </App_Text>
                        <App_Text variant="tableCellMuted" className="mt-1">
                          {product.description}
                        </App_Text>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2 shrink-0">
                        <App_Button
                          text="Edit Product"
                          icon={<Pencil size={13} />}
                          type="button"
                          onPress={() =>
                            router.push(`/dashboard/products/${id}/edit`)
                          }
                          btnStyle="text-xs border border-[#e0dbd4] bg-white text-[#1e1a17] hover:bg-[#f5f2ee] rounded-lg px-3 py-2 h-auto"
                        />
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <button
                              type="button"
                              className="p-2 rounded-lg border border-[#e0dbd4] hover:bg-[#f5f2ee] text-muted-foreground"
                            >
                              <MoreHorizontal size={15} />
                            </button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-44">
                            <DropdownMenuItem
                              className="text-xs cursor-pointer"
                              onClick={() => setShowAdjust(true)}
                            >
                              Adjust Stock
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="text-xs cursor-pointer"
                              onClick={() => setShowBarcode(true)}
                            >
                              Print Barcode
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-xs cursor-pointer text-[#c0392b] focus:text-[#c0392b] focus:bg-[#fdecea]">
                              Delete Product
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>

                    {/* Stat row */}
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                      {[
                        {
                          label: "Stock",
                          value: `${product.stock} Units`,
                          color: "",
                        },
                        {
                          label: "Reserved",
                          value: `${product.reserved} Units`,
                          color: "",
                        },
                        {
                          label: "Available",
                          value: `${product.available} Units`,
                          color: "text-primary",
                        },
                        {
                          label: "Low Stock Alert",
                          value: `${product.lowStockAlert} Units`,
                          color: "text-[#c87941]",
                        },
                        {
                          label: "Reorder Level",
                          value: `${product.reorderLevel} Units`,
                          color: "",
                        },
                      ].map(({ label, value, color }) => (
                        <div
                          key={label}
                          className="bg-[#faf9f7] rounded-xl border border-[#ede8e2] p-3"
                        >
                          <App_Text variant="tableCellMuted">{label}</App_Text>
                          <App_Text
                            variant="tableCell"
                            className={`font-semibold mt-1 ${color}`}
                          >
                            {value}
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
                  {detailTabs.map((tab) => (
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
                            : "hover:text-[#1e1a17]"
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
            </>
          )
        )}
      </div>

      {showAdjust && product && (
        <Adjust_Stock_Modal
          product={product}
          onClose={() => setShowAdjust(false)}
        />
      )}
      {showBarcode && product && (
        <Print_Barcode_Modal
          product={product}
          onClose={() => setShowBarcode(false)}
        />
      )}
    </>
  );
};

export default InventoryDetailPage;
