// components/orders/create/steps/Step_Customer.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import { Search, Plus, Check, Loader2 } from "lucide-react";
import App_Text from "@/components/app_ui/App_Text";
import { SkeletonBox } from "../../../customers_view/customers_components/Customer_Skeleton";
import {
  useOrderCustomers,
  useSearchCustomers,
} from "../../order_hooks/useCreateOrderApi";
import { OrderCustomer } from "../../order_view_types";

type Props = {
  selectedCustomer: OrderCustomer | null;
  onSelect: (customer: OrderCustomer) => void;
};

const CustomerSkeleton = () => (
  <div className="flex items-center gap-3 p-3 rounded-xl border border-[#ede8e2]">
    <SkeletonBox className="w-9 h-9 rounded-full shrink-0" />
    <div className="flex-1 space-y-1.5">
      <SkeletonBox className="h-3 w-28" />
      <SkeletonBox className="h-3 w-36" />
    </div>
  </div>
);

const Step_Customer = ({ selectedCustomer, onSelect }: Props) => {
  const [query, setQuery] = useState("");

  const { data: allCustomers, isLoading: isLoadingAll } = useOrderCustomers();
  const { data: searchResults, isFetching: isSearching } =
    useSearchCustomers(query);

  const customers = query ? (searchResults ?? []) : (allCustomers ?? []);
  const isLoading = query ? isSearching : isLoadingAll;

  return (
    <div className="space-y-5">
      <div>
        <App_Text variant="cardHeading" className="text-base mb-0.5">
          Customer
        </App_Text>
        <App_Text variant="pageSub">
          Search or select an existing customer.
        </App_Text>
      </div>

      {/* Search */}
      <div className="relative">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search customer by name, email or phone..."
          className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2.5 pl-9 bg-white outline-none focus:border-primary transition-colors"
        />
        <Search
          size={14}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
        />
        {isSearching && (
          <Loader2
            size={14}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground animate-spin"
          />
        )}
      </div>

      {/* List */}
      <div className="space-y-1.5">
        <App_Text variant="tableHeader">
          {query ? `Results for "${query}"` : "Select Existing Customer"}
        </App_Text>

        <div className="flex flex-col gap-2 max-h-64 overflow-y-auto pr-1">
          {isLoading && !query ? (
            Array.from({ length: 4 }).map((_, i) => (
              <CustomerSkeleton key={i} />
            ))
          ) : customers.length === 0 ? (
            <App_Text variant="tableCellMuted" className="py-4 text-center">
              No customers found.
            </App_Text>
          ) : (
            customers.map((customer) => {
              const isSelected = selectedCustomer?.id === customer.id;
              return (
                <button
                  key={customer.id}
                  type="button"
                  onClick={() => onSelect(customer)}
                  className={`flex items-center gap-3 p-3 rounded-xl border transition-colors text-left w-full ${
                    isSelected
                      ? "border-primary bg-primary/5"
                      : "border-[#ede8e2] hover:bg-[#faf9f7]"
                  }`}
                >
                  <div className="w-9 h-9 rounded-full overflow-hidden bg-[#f0e8df] shrink-0">
                    <Image
                      src={customer.avatar}
                      alt={customer.name}
                      width={36}
                      height={36}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <App_Text variant="tableCell" className="font-medium">
                      {customer.name}
                    </App_Text>
                    <App_Text variant="tableCellMuted" className="truncate">
                      {customer.email}
                    </App_Text>
                    <App_Text variant="tableCellMuted">
                      {customer.phone}
                    </App_Text>
                  </div>
                  {isSelected && (
                    <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center shrink-0">
                      <Check size={13} className="text-white" />
                    </div>
                  )}
                </button>
              );
            })
          )}
        </div>
      </div>

      <button
        type="button"
        className="flex items-center gap-2 text-xs text-primary hover:underline"
      >
        <Plus size={13} /> Add New Customer
      </button>

      {selectedCustomer && (
        <div className="flex items-center gap-3 p-3 rounded-xl bg-primary/5 border border-primary/20">
          <Check size={14} className="text-primary shrink-0" />
          <App_Text variant="tableCell" className="text-primary font-medium">
            {selectedCustomer.name} selected as customer
          </App_Text>
        </div>
      )}
    </div>
  );
};

export default Step_Customer;
