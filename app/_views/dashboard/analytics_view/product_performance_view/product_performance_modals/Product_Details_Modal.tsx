"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { X } from "lucide-react";
import App_Button from "@/components/app_ui/App_Button";
import App_Text from "@/components/app_ui/App_Text";
import { formatCurrency } from "../../overview_view/overview_data/overview_data";
import { useProductPerfDetail } from "../product_performance_hooks/useProductPerformanceQueries";
import App_Loader from "@/components/app_ui/App_Loader";

type Props = { productId: string; onClose: () => void };

const detailTabs = ["Overview", "Sales History", "Top Variants"];

const Product_Details_Modal = ({ productId, onClose }: Props) => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("Overview");

  const { data: product, isLoading } = useProductPerfDetail(productId);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[85vh] overflow-y-auto">
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#ede8e2] sticky top-0 bg-white z-10">
          <App_Text variant="cardHeading" className="text-base">
            Product Details
          </App_Text>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-[#f5f2ee] text-muted-foreground"
          >
            <X size={16} />
          </button>
        </div>

        {isLoading || !product ? (
          <App_Loader label="Loading product..." />
        ) : (
          <div className="p-5 space-y-4">
            {/* Header */}
            <div className="flex items-center gap-3">
              <div className="w-16 h-16 rounded-xl bg-[#f0e8df] overflow-hidden flex-shrink-0">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={64}
                  height={64}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <App_Text variant="cardHeading" className="text-base">
                  {product.name}
                </App_Text>
                <App_Text variant="tableCellMuted">
                  SKU: {product.sku} · {product.category}
                </App_Text>
              </div>
            </div>

            {/* Stat row */}
            <div className="grid grid-cols-4 gap-2">
              {[
                { label: "Revenue", value: formatCurrency(product.revenue) },
                { label: "Orders", value: product.orders.toString() },
                { label: "Units Sold", value: product.unitsSold.toString() },
                { label: "Profit", value: formatCurrency(product.profit) },
              ].map(({ label, value }) => (
                <div
                  key={label}
                  className="bg-[#faf9f7] rounded-xl border border-[#ede8e2] p-2.5"
                >
                  <App_Text variant="tableCellMuted" className="text-[10px]">
                    {label}
                  </App_Text>
                  <App_Text
                    variant="tableCell"
                    className="font-semibold text-sm mt-0.5"
                  >
                    {value}
                  </App_Text>
                </div>
              ))}
            </div>

            {/* Tabs */}
            <div className="flex items-center gap-1 border-b border-[#ede8e2]">
              {detailTabs.map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 py-2 text-xs border-b-2 transition-colors ${
                    activeTab === tab
                      ? "border-primary text-primary font-medium"
                      : "border-transparent text-muted-foreground hover:text-[text]"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Tab content */}
            {activeTab === "Overview" && (
              <div className="grid grid-cols-3 gap-3">
                {[
                  {
                    label: "Average Price",
                    value: formatCurrency(product.avgPrice),
                  },
                  { label: "Views", value: product.views.toLocaleString() },
                  { label: "Returns", value: product.returns.toString() },
                  {
                    label: "Conversion Rate",
                    value: `${product.conversionRate}%`,
                  },
                  { label: "Status", value: product.status },
                ].map(({ label, value }) => (
                  <div key={label}>
                    <App_Text variant="tableCellMuted">{label}</App_Text>
                    <App_Text
                      variant="tableCell"
                      className={`font-medium ${value === "Active" ? "text-[#157a45]" : ""}`}
                    >
                      {value}
                    </App_Text>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "Sales History" && (
              <div className="overflow-x-auto max-h-56 overflow-y-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-[#ede8e2]">
                      {["Date", "Orders", "Units Sold", "Revenue"].map((h) => (
                        <th key={h} className="text-left py-2 px-1">
                          <App_Text variant="tableHeader">{h}</App_Text>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {product.salesHistory.map((row) => (
                      <tr
                        key={row.date}
                        className="border-b border-[#f5f2ee] last:border-0"
                      >
                        <td className="py-2 px-1">
                          <App_Text variant="tableCell">{row.date}</App_Text>
                        </td>
                        <td className="py-2 px-1">
                          <App_Text variant="tableCell">{row.orders}</App_Text>
                        </td>
                        <td className="py-2 px-1">
                          <App_Text variant="tableCell">
                            {row.unitsSold}
                          </App_Text>
                        </td>
                        <td className="py-2 px-1">
                          <App_Text variant="tableCell" className="font-medium">
                            {formatCurrency(row.revenue)}
                          </App_Text>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === "Top Variants" && (
              <App_Text variant="tableCellMuted" className="py-6 text-center">
                No variant data available for this product.
              </App_Text>
            )}
          </div>
        )}

        <div className="flex justify-end gap-3 px-5 py-4 border-t border-[#ede8e2] sticky bottom-0 bg-white">
          <App_Button
            text="Close"
            type="button"
            onPress={onClose}
            btnStyle="text-xs border border-[#e0dbd4] bg-white text-[text] hover:bg-[#f5f2ee] rounded-lg px-4 py-2 h-auto"
          />
          <App_Button
            text="View Full Report"
            type="button"
            onPress={() =>
              router.push(
                `/dashboard/sales-analytics/revenue-analytics/products/${productId}`,
              )
            }
            btnStyle="text-xs bg-primary text-white hover:bg-primary/90 rounded-lg px-4 py-2 h-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default Product_Details_Modal;
