// components/orders/create/steps/Step_Items.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import { Search, Plus, Minus, Trash2, Loader2 } from "lucide-react";
import App_Button from "@/components/app_ui/App_Button";
import App_Text from "@/components/app_ui/App_Text";
import { SkeletonBox } from "../../../customers_view/customers_components/Customer_Skeleton";
import { useSearchProducts } from "../../order_hooks/useCreateOrderApi";
import { CreateOrderItem, OrderProduct } from "../../order_view_types";

type Props = {
  orderItems: CreateOrderItem[];
  onAdd: (product: OrderProduct) => void;
  onRemove: (id: string) => void;
  onUpdateQty: (id: string, qty: number) => void;
  subtotal: number;
  tax: number;
  total: number;
};

const Step_Items = ({
  orderItems,
  onAdd,
  onRemove,
  onUpdateQty,
  subtotal,
  tax,
  total,
}: Props) => {
  const [query, setQuery] = useState("");

  const { data: results, isFetching } = useSearchProducts(query);

  return (
    <div className="space-y-5">
      <div>
        <App_Text variant="cardHeading" className="text-base mb-0.5">
          Order Items
        </App_Text>
        <App_Text variant="pageSub">
          Search and add products to this order.
        </App_Text>
      </div>

      {/* Product search */}
      <div className="space-y-2">
        <div className="relative">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products by name or SKU..."
            className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2.5 pl-9 bg-white outline-none focus:border-primary transition-colors"
          />
          <Search
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
          {isFetching && (
            <Loader2
              size={14}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground animate-spin"
            />
          )}
        </div>

        {/* Search results dropdown */}
        {query && (
          <div className="border border-[#ede8e2] rounded-xl overflow-hidden shadow-sm">
            {isFetching ? (
              <div className="p-3 space-y-2">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <SkeletonBox className="w-9 h-9 rounded-lg shrink-0" />
                    <div className="flex-1 space-y-1.5">
                      <SkeletonBox className="h-3 w-32" />
                      <SkeletonBox className="h-3 w-20" />
                    </div>
                    <SkeletonBox className="h-4 w-16" />
                  </div>
                ))}
              </div>
            ) : results?.length === 0 ? (
              <div className="p-4 text-center">
                <App_Text variant="tableCellMuted">No products found.</App_Text>
              </div>
            ) : (
              results?.map((product, i) => (
                <button
                  key={product.id}
                  type="button"
                  onClick={() => {
                    onAdd(product);
                    setQuery("");
                  }}
                  className={`flex items-center gap-3 p-3 w-full text-left hover:bg-[#faf9f7] transition-colors ${
                    i < (results?.length ?? 0) - 1
                      ? "border-b border-[#f5f2ee]"
                      : ""
                  }`}
                >
                  <div className="w-9 h-9 rounded-lg bg-[#f0e8df] overflow-hidden shrink-0">
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={36}
                      height={36}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <App_Text
                      variant="tableCell"
                      className="font-medium truncate"
                    >
                      {product.name}
                    </App_Text>
                    <App_Text variant="tableCellMuted">
                      {product.sku} · {product.stock} in stock
                    </App_Text>
                  </div>
                  <App_Text
                    variant="tableCell"
                    className="font-semibold shrink-0"
                  >
                    R {product.price.toLocaleString()}
                  </App_Text>
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Plus size={13} className="text-primary" />
                  </div>
                </button>
              ))
            )}
          </div>
        )}
      </div>

      {/* Order items */}
      {orderItems.length > 0 ? (
        <div className="space-y-3">
          <div className="grid grid-cols-[2fr_1fr_1fr_1fr_auto] gap-3 px-2">
            {["Product", "Price", "Quantity", "Total", ""].map((h) => (
              <App_Text key={h} variant="tableHeader">
                {h}
              </App_Text>
            ))}
          </div>

          <div className="flex flex-col gap-2">
            {orderItems.map((item) => (
              <div
                key={item.id}
                className="grid grid-cols-[2fr_1fr_1fr_1fr_auto] gap-3 items-center p-3 bg-[#faf9f7] rounded-xl border border-[#ede8e2]"
              >
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-lg bg-[#f0e8df] overflow-hidden shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={36}
                      height={36}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <App_Text
                      variant="tableCell"
                      className="font-medium truncate"
                    >
                      {item.name}
                    </App_Text>
                    <App_Text variant="tableCellMuted">{item.sku}</App_Text>
                  </div>
                </div>

                <App_Text variant="tableCell">
                  R {item.price.toLocaleString()}
                </App_Text>

                <div className="flex items-center gap-1.5 border border-[#e0dbd4] rounded-lg px-2 py-1 w-fit bg-white">
                  <App_Button
                    text=""
                    icon={<Minus size={12} />}
                    type="button"
                    onPress={() => onUpdateQty(item.id, item.qty - 1)}
                    btnStyle="p-0 h-auto bg-transparent border-0 shadow-none text-muted-foreground hover:text-primary"
                  />
                  <span className="text-xs font-medium w-4 text-center">
                    {item.qty}
                  </span>
                  <App_Button
                    text=""
                    icon={<Plus size={12} />}
                    type="button"
                    onPress={() => onUpdateQty(item.id, item.qty + 1)}
                    btnStyle="p-0 h-auto bg-transparent border-0 shadow-none text-muted-foreground hover:text-primary"
                  />
                </div>

                <App_Text variant="tableCell" className="font-semibold">
                  R {(item.price * item.qty).toLocaleString()}
                </App_Text>

                <App_Button
                  text=""
                  icon={<Trash2 size={14} />}
                  type="button"
                  onPress={() => onRemove(item.id)}
                  btnStyle="p-1.5 h-auto bg-transparent text-muted-foreground hover:text-[#c0392b] hover:bg-[#fdecea] rounded shadow-none border-0"
                />
              </div>
            ))}
          </div>

          {/* Totals */}
          <div className="flex flex-col gap-1.5 pt-3 border-t border-[#ede8e2]">
            {[
              { label: "Items Total", value: subtotal },
              { label: "Tax (7.5%)", value: tax },
            ].map(({ label, value }) => (
              <div
                key={label}
                className="flex items-center justify-between px-2"
              >
                <App_Text variant="tableCellMuted">{label}</App_Text>
                <App_Text variant="tableCell">
                  R {value.toLocaleString()}
                </App_Text>
              </div>
            ))}
            <div className="flex items-center justify-between px-2 pt-2 border-t border-[#ede8e2]">
              <App_Text variant="cardHeading">Total</App_Text>
              <App_Text variant="statValue" className="text-lg text-primary">
                R {total.toLocaleString()}
              </App_Text>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 border-2 border-dashed border-[#ede8e2] rounded-2xl gap-2">
          <App_Text variant="tableCellMuted">No products added yet.</App_Text>
          <App_Text variant="tableCellMuted">
            Search above to add products.
          </App_Text>
        </div>
      )}
    </div>
  );
};

export default Step_Items;
