// app/dashboard/stores/[id]/page.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ChevronLeft,
  Pencil,
  ArrowLeftRight,
  MoreHorizontal,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";
import App_Text from "@/components/app_ui/App_Text";
import App_Button from "@/components/app_ui/App_Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton_Store_Detail } from "../store_components/Store_Skeleton";
import Tab_Store_Managers from "../store_components/Tab_Store_Managers";
import Tab_Store_Overview from "../store_components/Tab_Store_Overview";
import Tab_Store_Products from "../store_components/Tab_Store_Products";
import Tab_Store_Transfers from "../store_components/Tab_Store_Transfers";
import { useStoreDetail } from "../store_hooks/useStoreQueries";
import Add_Store_Modal from "../store_modals/Add_Store_Modal";
import Adjust_Stock_Modal from "../store_modals/Adjust_Stock_Modal";
import Delete_Store_Modal from "../store_modals/Delete_Store_Modal";
import Store_Settings_Modal from "../store_modals/Store_Settings_Modal";
import Transfer_Stock_Modal from "../store_modals/Transfer_Stock_Modal";

const detailTabs = [
  "Overview",
  "Products",
  "Transfers",
  "Stock History",
  "Managers",
  "Settings",
];

const Store_Detail_View = () => {
  const params = useParams();
  const id = params.id as string;

  const [activeTab, setActiveTab] = useState("Overview");
  const [showEdit, setShowEdit] = useState(false);
  const [showTransfer, setShowTransfer] = useState(false);
  const [showAdjust, setShowAdjust] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const { data: store, isLoading, isError } = useStoreDetail(id);

  if (isError)
    return (
      <div className="p-6 flex items-center justify-center">
        <App_Text variant="tableCellMuted" className="text-[#c0392b]">
          Failed to load store. Please try again.
        </App_Text>
      </div>
    );

  return (
    <>
      <div className="space-y-4">
        <Link
          href="/dashboard/stores"
          className="flex items-center gap-1.5 text-xs text-primary hover:underline w-fit"
        >
          <ChevronLeft size={13} /> Back to Stores
        </Link>

        {isLoading ? (
          <Skeleton_Store_Detail />
        ) : (
          store && (
            <>
              {/* Header card */}
              <div className="bg-white rounded-2xl border border-[#ede8e2] shadow-sm p-5 space-y-4">
                <div className="flex flex-col sm:flex-row gap-5">
                  {/* Image */}
                  <div className="w-24 h-24 rounded-xl bg-[#f0e8df] overflow-hidden shrink-0">
                    <Image
                      src={store.image}
                      alt={store.name}
                      width={96}
                      height={96}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0 space-y-1.5">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <App_Text variant="pageTitle">{store.name}</App_Text>
                          <span
                            className={`text-xs px-2.5 py-1 rounded-full font-medium ${store.status === "Active" ? "bg-[#e8fdf0] text-[#157a45]" : "bg-[#fdecea] text-[#a32020]"}`}
                          >
                            {store.status}
                          </span>
                        </div>
                        <App_Text variant="tableCellMuted">
                          Store Code: {store.storeCode} · {store.storeType}
                        </App_Text>
                        <div className="flex flex-wrap gap-3 mt-1.5">
                          <div className="flex items-center gap-1.5">
                            <MapPin
                              size={12}
                              className="text-muted-foreground"
                            />
                            <App_Text variant="tableCellMuted">
                              {store.address}
                            </App_Text>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Phone
                              size={12}
                              className="text-muted-foreground"
                            />
                            <App_Text variant="tableCellMuted">
                              {store.phone}
                            </App_Text>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Mail size={12} className="text-muted-foreground" />
                            <App_Text variant="tableCellMuted">
                              {store.email}
                            </App_Text>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <App_Button
                          text="Edit Store"
                          icon={<Pencil size={13} />}
                          type="button"
                          onPress={() => setShowEdit(true)}
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
                              onClick={() => setShowAdjust(true)}
                            >
                              Adjust Stock
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="text-xs cursor-pointer"
                              onClick={() => setShowSettings(true)}
                            >
                              Store Settings
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              className="text-xs cursor-pointer text-[#c0392b] focus:text-[#c0392b] focus:bg-[#fdecea]"
                              onClick={() => setShowDelete(true)}
                            >
                              Delete Store
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>

                    {/* Performance Summary */}
                    <div className="grid grid-cols-2 sm:grid-cols-7 gap-3 pt-2">
                      {[
                        {
                          label: "Total Stock",
                          value: `${store.totalStock} units`,
                          color: "",
                        },
                        {
                          label: "Available Stock",
                          value: `${store.availableStock} units (${Math.round((store.availableStock / store.totalStock) * 100)}%)`,
                          color: "text-[#2e7d52]",
                        },
                        {
                          label: "Reserved",
                          value: `${store.reserved} units (${Math.round((store.reserved / store.totalStock) * 100)}%)`,
                          color: "",
                        },
                        {
                          label: "Damaged",
                          value: `${store.damaged} units (${Math.round((store.damaged / store.totalStock) * 100)}%)`,
                          color: "text-[#c0392b]",
                        },
                        {
                          label: "Inventory Value",
                          value: `R${store.inventoryValue.toLocaleString()}`,
                          color: "text-primary",
                        },
                        {
                          label: "Low Stock Items",
                          value: store.lowStockItems.toString(),
                          color: "text-[#c87941]",
                        },
                        {
                          label: "Out of Stock",
                          value: store.outOfStockItems.toString(),
                          color: "text-[#c0392b]",
                        },
                      ].map(({ label, value, color }) => (
                        <div
                          key={label}
                          className="bg-[#faf9f7] rounded-xl border border-[#ede8e2] p-3"
                        >
                          <App_Text variant="tableCellMuted">{label}</App_Text>
                          <App_Text
                            variant="tableCell"
                            className={`font-semibold mt-1 text-sm ${color}`}
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
                  {detailTabs.map((tab) => {
                    const count = tab === "Products" ? 156 : undefined;
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
                    <Tab_Store_Overview store={store} />
                  )}
                  {activeTab === "Products" && (
                    <Tab_Store_Products storeId={id} />
                  )}
                  {activeTab === "Transfers" && (
                    <Tab_Store_Transfers storeId={id} />
                  )}
                  {activeTab === "Managers" && (
                    <Tab_Store_Managers storeId={id} />
                  )}
                  {activeTab === "Stock History" && (
                    <div className="flex items-center justify-center py-16">
                      <App_Text variant="tableCellMuted">
                        Stock History coming soon.
                      </App_Text>
                    </div>
                  )}
                  {activeTab === "Settings" && (
                    <div className="flex items-center justify-center py-16 flex-col gap-3">
                      <App_Text variant="tableCellMuted">
                        Manage this store's settings.
                      </App_Text>
                      <App_Button
                        text="Open Store Settings"
                        type="button"
                        onPress={() => setShowSettings(true)}
                        btnStyle="text-xs bg-primary text-white hover:bg-primary/90 rounded-lg px-4 py-2 h-auto"
                      />
                    </div>
                  )}
                </div>
              </div>
            </>
          )
        )}
      </div>

      {showEdit && store && (
        <Add_Store_Modal
          onClose={() => setShowEdit(false)}
          isEdit
          defaultValues={store}
        />
      )}
      {showTransfer && store && (
        <Transfer_Stock_Modal
          storeId={id}
          onClose={() => setShowTransfer(false)}
        />
      )}
      {showAdjust && store && (
        <Adjust_Stock_Modal storeId={id} onClose={() => setShowAdjust(false)} />
      )}
      {showSettings && store && (
        <Store_Settings_Modal
          store={store}
          onClose={() => setShowSettings(false)}
        />
      )}
      {showDelete && store && (
        <Delete_Store_Modal
          store={store}
          onClose={() => setShowDelete(false)}
        />
      )}
    </>
  );
};

export default Store_Detail_View;
