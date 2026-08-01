"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ChevronLeft,
  SlidersHorizontal,
  ArrowLeftRight,
  MoreHorizontal,
} from "lucide-react";
import App_Text from "@/components/app_ui/App_Text";
import App_Button from "@/components/app_ui/App_Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useInventoryDetail } from "../inventory_hooks/useInventoryQueries";
import { Skeleton_Inv_Detail } from "../inventory_components/Inventory_Skeleton";
import { statusStyles } from "../inventory_data/inventory_cols";
import Adjust_Stock_Modal from "../inventory_modals/Adjust_Stock_Modal";
import Restock_Modal from "../inventory_modals/Restock_Modal";
import Transfer_Stock_Modal from "../inventory_modals/Transfer_Stock_Modal";
import Tab_Inv_Locations from "./inventory_detail_components/Tab_Inv_Locations";
import Tab_Inv_Overview from "./inventory_detail_components/Tab_Inv_Overview";
import Tab_Inv_RestockHistory from "./inventory_detail_components/Tab_Inv_RestockHistory";
import Tab_Inv_StockHistory from "./inventory_detail_components/Tab_Inv_StockHistory";
import Tab_Inv_StockMovements from "./inventory_detail_components/Tab_Inv_StockMovement";

const detailTabs = [
  "Overview",
  "Locations",
  "Stock History",
  "Stock Movements",
  "Restock History",
  "Suppliers",
];

const Inventory_Detail_View = () => {
  const params = useParams();
  const id = params.id as string;

  const [activeTab, setActiveTab] = useState("Overview");
  const [showAdjust, setShowAdjust] = useState(false);
  const [showRestock, setShowRestock] = useState(false);
  const [showTransfer, setShowTransfer] = useState(false);
  const [activeImage, setActiveImage] = useState(0);

  const { data: product, isLoading, isError } = useInventoryDetail(id);

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
      <div className="space-y-4">
        {/* Back link */}
        <Link
          href="/dashboard/inventory"
          className="flex items-center gap-1.5 text-xs text-primary hover:underline w-fit"
        >
          <ChevronLeft size={13} /> Back to Inventory
        </Link>

        {isLoading ? (
          <Skeleton_Inv_Detail />
        ) : (
          product && (
            <>
              {/* Header card */}
              <div className="bg-white rounded-2xl border border-[#ede8e2] shadow-sm p-5 space-y-4">
                <div className="flex flex-col sm:flex-row gap-5">
                  {/* Image */}
                  <div className="flex flex-col gap-2 shrink-0">
                    <div className="w-24 h-24 rounded-xl bg-[#f0e8df] overflow-hidden">
                      <Image
                        src={product.images[activeImage] ?? product.image}
                        alt={product.name}
                        width={96}
                        height={96}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex gap-1.5">
                      {product.images.slice(0, 3).map((img, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => setActiveImage(i)}
                          className={`w-7 h-7 rounded-lg overflow-hidden border-2 transition-all ${activeImage === i ? "border-primary" : "border-transparent"}`}
                        >
                          <Image
                            src={img}
                            alt=""
                            width={28}
                            height={28}
                            className="w-full h-full object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0 space-y-2">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <App_Text variant="pageTitle">
                            {product.name}
                          </App_Text>
                          <span
                            className={`text-xs px-2.5 py-1 rounded-full font-medium ${statusStyles[product.status]}`}
                          >
                            {product.status}
                          </span>
                        </div>
                        <App_Text variant="tableCellMuted">
                          SKU: {product.sku} · {product.category}
                        </App_Text>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <App_Button
                          text="Adjust Stock"
                          icon={<SlidersHorizontal size={13} />}
                          type="button"
                          onPress={() => setShowAdjust(true)}
                          btnStyle="text-xs border border-[#e0dbd4] bg-white text-[#1e1a17] hover:bg-[#f5f2ee] rounded-lg px-3 py-2 h-auto"
                        />
                        <App_Button
                          text="Transfer Stock"
                          icon={<ArrowLeftRight size={13} />}
                          type="button"
                          onPress={() => setShowTransfer(true)}
                          btnStyle="text-xs bg-primary text-white hover:bg-primary/90 rounded-lg px-3 py-2 h-auto"
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
                              onClick={() => setShowRestock(true)}
                            >
                              Restock Inventory
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-xs cursor-pointer">
                              Print Barcode Label
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>

                    {/* Stat row */}
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                      {[
                        {
                          label: "Total Stock",
                          value: `${product.totalStock} Across ${product.locations} locations`,
                          color: "",
                        },
                        {
                          label: "Available",
                          value: `${product.available} For sale`,
                          color: "text-[#2e7d52]",
                        },
                        {
                          label: "Reserved",
                          value: `${product.reserved} On hold`,
                          color: "",
                        },
                        {
                          label: "Damaged",
                          value: `${product.damaged} Not sellable`,
                          color: "text-[#c0392b]",
                        },
                        {
                          label: "Inventory Value",
                          value: `R${product.inventoryValue.toLocaleString()}`,
                          color: "text-primary",
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
                  {detailTabs.map((tab, i) => {
                    const count =
                      tab === "Locations" ? product.locations : undefined;
                    return (
                      <button
                        key={tab}
                        type="button"
                        onClick={() => setActiveTab(tab)}
                        className={`flex items-center gap-1.5 px-3 py-3.5 whitespace-nowrap border-b-2 transition-colors ${activeTab === tab ? "border-primary" : "border-transparent"}`}
                      >
                        <App_Text
                          variant="sectionLabel"
                          className={
                            activeTab === tab
                              ? "text-primary font-medium"
                              : "hover:text-[#1e1a17]"
                          }
                        >
                          {tab}
                        </App_Text>
                        {count !== undefined && (
                          <span
                            className={`px-1.5 py-0.5 rounded text-[10px] ${activeTab === tab ? "bg-primary/10 text-primary" : "bg-[#f5f2ee] text-muted-foreground"}`}
                          >
                            {count}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
                <div className="p-4">
                  {activeTab === "Overview" && (
                    <Tab_Inv_Overview
                      product={product}
                      onAdjust={() => setShowAdjust(true)}
                      onRestock={() => setShowRestock(true)}
                      onTransfer={() => setShowTransfer(true)}
                    />
                  )}
                  {activeTab === "Locations" && (
                    <Tab_Inv_Locations productId={id} />
                  )}
                  {activeTab === "Stock History" && (
                    <Tab_Inv_StockHistory productId={id} />
                  )}
                  {activeTab === "Stock Movements" && (
                    <Tab_Inv_StockMovements productId={id} />
                  )}
                  {activeTab === "Restock History" && (
                    <Tab_Inv_RestockHistory productId={id} product={product} />
                  )}
                  {activeTab === "Suppliers" && (
                    <div className="flex items-center justify-center py-16">
                      <App_Text variant="tableCellMuted">
                        Suppliers coming soon.
                      </App_Text>
                    </div>
                  )}
                </div>
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
      {showRestock && product && (
        <Restock_Modal
          product={product}
          onClose={() => setShowRestock(false)}
        />
      )}
      {showTransfer && product && (
        <Transfer_Stock_Modal
          product={product}
          onClose={() => setShowTransfer(false)}
        />
      )}
    </>
  );
};

export default Inventory_Detail_View;
